import { useState } from "react";
import Post from "@/components/Post";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Post as PostType,
  Comment,
  usePublication,
  PublicationId,
  useSession,
  usePublications,
  PublicationType,
} from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import useUpload from "@/lib/useUpload";
import {
  Input,
  Button,
  Space,
  Center,
  Container,
  Group,
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const PostPage = () => {
  // Get the post ID from the URL
  const router = useRouter();
  const { id } = router.query;

  const upload = useUpload();

  const [comment, setComment] = useState<string>("");

  const session = useSession();

  const publication = usePublication({
    forId: id as PublicationId,
  });


  if (publication?.loading) {
    return (
      <>
        <Center>
          <Loader size={28} />
        </Center>
      </>
    );
  }

  if (publication?.error) {
    return (
      <>
        <Center>
          <h1>Post not found</h1>
          <Space h="xl" />
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </Center>
      </>
    );
  }

  return (
    <>
      <Container>
        <Center>
          {!!publication?.data && session?.data && (
            <Post post={publication?.data as PostType | Comment} />
          )}
        </Center>
        <Space h="md" />

        <Space h="md" />
      </Container>
    </>
  );
};

export default PostPage;
