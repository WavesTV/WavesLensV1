import { useState } from "react";
import Post from "@/components/Post";
import {
  Post as PostType,
  Comment,
  usePublication,
  PublicationId,
  useSession,
  usePublications,
  useCreateComment,
} from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import useUpload from "@/lib/useUpload";
import {
  Text,
  Button,
  Space,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Textarea,
  Avatar,
} from "@mantine/core";
import { textOnly } from "@lens-protocol/metadata";
import { IconCheck, IconExclamationMark, IconX } from "@tabler/icons-react";
import { useSDK } from "@thirdweb-dev/react";
import { notifications } from "@mantine/notifications";

const PostPage = () => {
  const session = useSession();

  // Get the post ID from the URL
  const router = useRouter();
  const { id } = router.query;

  const upload = useUpload();
  const sdk = useSDK();
  const [comment, setComment] = useState<string>("");
  const createComment = useCreateComment();

  async function handleCreateComment() {
    // @ts-ignore
    if (!sdk || session?.data?.type !== "WITH_PROFILE") {
      notifications.show({
        title: "You must be logged in to Comment!",
        icon: <IconX size="1.1rem" />,
        color: "red",
        message: `You need an active Lens Profile to Comment.`,
      });
      return;
    }

    let result;

    try {
      const metadata = textOnly({ content: comment });

      const uri = await upload(metadata);

      const result = await createComment.execute({
        metadata: uri,
        commentOn: id as PublicationId,
      });

      if (result.isFailure()) {
        switch (result.error.name) {
          case "BroadcastingError":
            notifications.show({
              title: "Error creating post.",
              icon: <IconX size="1.1rem" />,
              color: "red",
              message: `There was an error broadcasting the transaction. ${result.error.name}.`,
            });
            break;

          case "PendingSigningRequestError":
            notifications.show({
              title: "Error creating post.",
              icon: <IconExclamationMark size="1.1rem" />,
              color: "red",
              message: `There is a pending signing request in your wallet.  Approve it or discard it and try again. ${result.error.name}.`,
            });

            break;

          case "WalletConnectionError":
            notifications.show({
              title: "Error creating post.",
              icon: <IconX size="1.1rem" />,
              color: "red",
              message: `Error connecting to your Wallet. ${result.error.name}.`,
            });
            break;

          case "UserRejectedError":
            // the user decided to not sign, usually this is silently ignored by UIs
            break;
        }
        return;
      }

      // this might take a while, depends on the type of tx (on-chain or Momoka)
      // and the congestion of the network
      const completion = await result.value.waitForCompletion();

      if (completion.isFailure()) {
        notifications.show({
          title: "Error creating post.",
          icon: <IconX size="1.1rem" />,
          color: "red",
          message: `There was an processing the transaction. ${completion.error.message}.`,
        });
        return;
      }

      notifications.show({
        title: "Success",
        icon: <IconCheck size="1.1rem" />,
        color: "Green",
        message: "Your Post has been successfully indexed!",
      });
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error creating post.",
        icon: <IconX size="1.1rem" />,
        color: "red",
        message: "Something went wrong creating your post. Please try again.",
      });
    }
  }

  const publication = usePublication({
    forId: id as PublicationId,
  });

  const comments = usePublications({
    where: {
      commentOn: {
        id: id as PublicationId,
      },
    },
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
          <Text>Post not found</Text>
        </Center>
        <Space h="xl" />
        <Center>
          <Button onClick={() => router.push("/")}>Back to your Feed</Button>
        </Center>
      </>
    );
  }

  if (comments?.loading) {
    return (
      <>
        <Center>
          <Loader size={28} />
        </Center>
      </>
    );
  }

  if (comments?.error) {
    return (
      <>
        <Center>
          <Text>Error Loading Comments</Text>
        </Center>
      </>
    );
  }

  return (
    <>
      <Center>
        <Container>
          {!!publication?.data && session?.data && (
            <Post post={publication?.data as PostType | Comment} />
          )}
        </Container>
      </Center>

      <Space h="md" />
      <Container>
        <Group justify="left">
          <Avatar
            // @ts-ignore
            src={session?.profile?.metadata?.picture || "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"}
            size="lg"
            radius="xl"
          />

          <Text fw={500} size="lg">
            {
              // @ts-ignore
              session?.data?.profile?.handle?.localName || "Anon"
            }
          </Text>
        </Group>
        <Space h="md" />
        <Textarea
          id="content"
          variant="filled"
          size="md"
          radius="md"
          placeholder="Comment..."
          onChange={(e) => setComment(e.target.value)}
        />

        <Space h="md" />

        <Group justify="right">
          <Button
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 205 }}
            onClick={() => {
              handleCreateComment(); // Trigger the createpost function
            }}
          >
            Create
          </Button>
        </Group>
      </Container>
      <Space h="md" />

      <InfiniteScroll
        dataLength={comments?.data?.length || 0}
        next={() => comments.next()}
        hasMore={comments.hasMore}
        loader={
          <>
            <Group justify="center">
              <Loader color="blue" />
            </Group>
          </>
        }
        endMessage={<Space h={100} />}
      >
        {!!comments?.data &&
          comments?.data?.length > 0 &&
          comments?.data?.map((post) => <Post key={post.id} post={post} />)}
      </InfiniteScroll>
    </>
  );
};

export default PostPage;
