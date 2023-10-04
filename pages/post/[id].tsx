import { useState } from "react";
import Post from "@/components/Post";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Post as PostType,
  Comment,
  usePublication,
  PublicationId,
  useComments,
  useActiveProfile,
  useCreateComment,
  ContentFocus,
  ReferencePolicyType,
  CollectPolicyType,
} from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import useUpload from "@/lib/useUpload";
import { Input, Button, Space, Center, Container, Group, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";



const PostPage = () => {
  // Get the post ID from the URL
  const router = useRouter();
  const { id } = router.query;

  const upload = useUpload();

  const [comment, setComment] = useState<string>("");

  const activeProfile = useActiveProfile();

  const publication = usePublication({
    publicationId: id as PublicationId,
  });

  const comments = useComments({
    // @ts-ignore: TODO, it could be not found.
    commentsOf: publication?.data?.id,
  });

  const createComment = useCreateComment({
    // @ts-ignore: TODO, publisher may not be signed in
    publisher: activeProfile?.data,
    upload: (data: unknown) => upload(data),
  });

    if (!activeProfile || activeProfile.data === null) {
    return (
      <>

        <Center>
          <Button onClick={() => router.push("/login")}>
            Login to view post
          </Button>
        </Center>
      </>
    );
  }
  if (publication?.loading) {
    return (
      <>
       
        <section className="w-full container flex max-w-[720px] flex-col items-center gap-4 text-center h-screen">
          <Skeleton className="h-[120px] animate-pulse bg-muted mt-3 w-full" />
          <Skeleton className="h-[64px] animate-pulse bg-muted mt-3 w-full" />
        </section>
      </>
    );
  }

  if (publication?.error) {
    return (
      <>

        <Center>
          <h1>
           Post not found
          </h1>
        <Space h="xl"/>

          <Button onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </Center>
      </>
    );
  }

  return (
    <>
    

      <Container>
        <Center>
        {!!publication?.data && activeProfile.data && (
          <Post
            post={publication?.data as PostType | Comment}
            className={cn("h-auto")}
            activeProfile={activeProfile?.data}
          />
        )}
        </Center>
        <Space h="md"/>
        <Center>
          
          <Input
          variant="filled" radius="xl"
            type="text"
            placeholder="Enter your comment"
            className="border-0 h-full m-0 w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            
            onClick={async () => {
              try {
                if (!publication?.data) return;

                const result = await createComment?.execute({
                  contentFocus: ContentFocus.TEXT_ONLY,
                  publicationId: publication.data.id,
                  locale: "en",
                  content: comment,
                  collect: {
                    type: CollectPolicyType.NO_COLLECT,
                  },
                  reference: {
                    type: ReferencePolicyType.ANYONE,
                  },
                });

                if (result?.isFailure()) {
                  throw new Error("Failed to create comment");
                }

                setComment("");
                notifications.show({
      title: "Success",
      icon: <IconCheck size="1.1rem" />,
      color: "green",
      message: "Comment created.",
    });
                
              } catch (error) {
                notifications.show({
      title: "Error",
      icon: <IconX size="1.1rem" />,
      color: "red",
      message: `Something went wrong creating your comment. Please try again.`,
    });
               
              }
            }}
          >
            Comment
          </Button>
        </Center>


        {!publication?.loading &&
          publication?.data &&
          !comments?.loading &&
          comments?.data && (
            <>
              <InfiniteScroll
                dataLength={comments?.data?.length || 0}
                next={() => comments?.next()}
                hasMore={comments?.hasMore}
                loader={
                  <>
                    
                         <Group justify="center">
              <Loader size="sm" />
            </Group>
                   
                  </>
                }
              >
                {activeProfile.data &&
                  activeProfile.data !== null &&
                  comments?.data?.map((post: PostType | Comment) => (
                    <Post
                      key={post.id}
                      post={post}
                      activeProfile={activeProfile?.data!}
                    />
                  ))}
              </InfiniteScroll>
            </>
          )}
      </Container>
    </>
  );
};

export default PostPage;
