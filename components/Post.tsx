import React, { useMemo, useState } from "react";
import formatDate from "@/lib/formatDate";
import Link from "next/link";
import {
  useCreateMirror,
  useReactionToggle,
  Post,
  Comment,
  PublicationReactionType,
  useSession,
  hasReacted,
  publicationId,
  Quote,
  Mirror,
  CollectState,
} from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import {
  Paper,
  ActionIcon,
  Group,
  Tooltip,
  Avatar,
  Space,
  UnstyledButton,
  Text,
  Spoiler,
  Image,
  Center,
  Button,
} from "@mantine/core";
import {
  IconCheck,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconMessageShare,
  IconScriptMinus,
  IconScriptPlus,
  IconStack3,
  IconX,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { GiMirrorMirror } from "react-icons/gi";
import { Player } from "@livepeer/react";

type Props = {
  post: Post | Comment | Quote | Mirror;
};

function isMirrorPost(post: Post | Comment | Quote | Mirror): post is Mirror {
  return post.__typename === "Mirror" && "mirrorOn" in post;
}

export default function Post({ post }: Props) {
  const router = useRouter();
  const { execute: react, loading, error } = useReactionToggle();
  const { data: session } = useSession();

  // Either use the post, or if it has been decrypted, use the decrypted post
  const postToUse = useMemo(() => {
    return post;
  }, [post]);

  //handling reposts
  const isMirror = isMirrorPost(post);
  const postContent = isMirror ? post.mirrorOn : post;

  const { execute: mirror } = useCreateMirror();
  async function handleMirror() {
    if (!session) return;
    await mirror({
      mirrorOn: postToUse.id, // the publication ID to mirror
    });
  }

  const hasReaction = useMemo(() => {
    if (session?.authenticated && postToUse && "canUpvote" in postToUse) {
      return hasReacted({
        publication: postToUse as Post,
        reaction: PublicationReactionType.Upvote,
      });
    }
    return false;
  }, [session, postToUse]);

  async function handleReaction() {
    if (!react) return;

    if (!hasReaction) {
      await react({
        publication: postToUse as Post,
        reaction: PublicationReactionType.Upvote,
      });

      setUserUpvotedReacted(true);
    } else {
      await react({
        publication: postToUse as Post,
        reaction: PublicationReactionType.Downvote,
      });
    }
  }
  // State to track if the user has reacted to the post
  const [userUpvoted, setUserUpvotedReacted] = useState(false);

  const replaceURLs = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const atSymbolRegex = /(\S*@+\S*)/g;

    return text
      .replace(
        urlRegex,
        (url: string) => `<a href="${url}" target="_blank">${url}</a>`,
      )
      .replace(atSymbolRegex, (match: string) => ` ${match} `);
  };

  return (
    <>
      <Paper shadow="xl" radius="md" p="xs" withBorder>
        <Space h="xs" />
        <div>
          {isMirror && (
            <Button
              variant="transparent"
              leftSection={<GiMirrorMirror size={13} />}
              component={Link}
              href={`/profile/${postToUse.by?.handle?.localName}`}
            >
              <Text c="dimmed" size="xs">
                {postToUse.by.handle?.localName} mirrored
              </Text>
            </Button>
          )}
          {postToUse.__typename === "Comment" && (
            <Button
              variant="transparent"
              leftSection={<IconMessageCircle size={13} />}
              component={Link}
              href={`/profile/${postToUse.by?.handle?.localName}`}
            >
              <Text c="dimmed" size="xs">
                {postToUse.by.handle?.localName} Commented
              </Text>
            </Button>
          )}
          <Group justify="right">
            <Text c="dimmed" size="xs" fw={500} mr={10}>
              {formatDate(postToUse.createdAt)} ago
            </Text>
          </Group>
        </div>

        <UnstyledButton
          component={Link}
          href={`/profile/${postContent.by?.handle?.localName}`}
        >
          <Group justify="center">
            <Avatar
              // @ts-ignore
              src={
                postContent?.by?.metadata?.picture?.optimized?.uri ||
                "/user.png"
              }
              alt={`${postContent.by?.handle?.localName}'s profile picture`}
              size="lg"
            />

            <Text fw={500}>{postContent.by?.handle?.localName}</Text>
          </Group>
        </UnstyledButton>

        <Space h="xl" />

        <Center>
          <Spoiler
            maxHeight={222}
            showLabel={
              <>
                <Space h="xs" />
                <Tooltip label="Show More">
                  <IconScriptPlus />
                </Tooltip>
              </>
            }
            hideLabel={
              <>
                <Space h="xs" />
                <Tooltip label="Show Less">
                  <IconScriptMinus />
                </Tooltip>
              </>
            }
          >
            <div
              style={{
                maxWidth: "100%", // Adjust this value to control the maximum width
                margin: "0 auto", // Center the content horizontally if needed
              }}
            >
              {/* Post content */}
              <Text
                size="md"
                style={{
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{
                  __html: postContent?.metadata?.content
                    ? replaceURLs(
                        postContent.metadata.content.replace(/\n/g, "<br> "),
                      )
                    : "",
                }}
              />
            </div>
          </Spoiler>
        </Center>
        <Space h="md" />

        {postContent.metadata?.asset?.image && (
          <Center>
            <Image
              src={postContent?.metadata?.asset?.image?.optimized?.uri}
              radius="md"
              h="555"
              w="auto"
              fit="contain"
              alt={`${postToUse.by?.handle?.localName}'s Post Image`}
            />
          </Center>
        )}

        {postContent?.metadata?.asset?.video && (
          <Center>
            <Player src={postContent?.metadata?.asset?.video?.optimized?.uri} />
          </Center>
        )}

        {postContent?.metadata?.embed && (
          <Center>
            <Player src={postToUse?.quoteOn?.metadata?.embed} />
          </Center>
        )}

        {post.__typename === "Quote" && (
          <Paper shadow="xl" radius="md" p="xs" withBorder>
            <Group justify="right">
              <Text c="dimmed" size="xs" fw={500} mr={10}>
                {formatDate(postToUse.quoteOn.createdAt)} ago
              </Text>
            </Group>

            <UnstyledButton
              component={Link}
              href={`/profile/${postToUse.quoteOn.by?.handle?.localName}`}
            >
              <Group justify="center">
                <Avatar
                  // @ts-ignore
                  src={
                    postToUse.quoteOn.by.metadata?.picture?.optimized?.uri ||
                    "/user.png"
                  }
                  alt={`${postToUse.quoteOn.by?.handle?.localName}'s profile picture`}
                  size="lg"
                />

                <Text fw={500}>{postToUse.quoteOn.by?.handle?.localName}</Text>
              </Group>
            </UnstyledButton>

            <Space h="xl" />

            <Center>
              <Spoiler
                maxHeight={222}
                showLabel={
                  <>
                    <Space h="xs" />
                    <Tooltip label="Show More">
                      <IconScriptPlus />
                    </Tooltip>
                  </>
                }
                hideLabel={
                  <>
                    <Space h="xs" />
                    <Tooltip label="Show Less">
                      <IconScriptMinus />
                    </Tooltip>
                  </>
                }
              >
                <div
                  style={{
                    maxWidth: "100%", // Adjust this value to control the maximum width
                    margin: "0 auto", // Center the content horizontally if needed
                  }}
                >
                  {/* Post content */}
                  <Text
                    size="md"
                    style={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      textAlign: "center",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: postToUse?.quoteOn?.metadata?.content
                        ? replaceURLs(
                            postToUse.quoteOn.metadata.content.replace(
                              /\n/g,
                              "<br> ",
                            ),
                          )
                        : "",
                    }}
                  />
                </div>
              </Spoiler>
            </Center>
            <Space h="md" />
            {postToUse.quoteOn.metadata?.asset?.image && (
              <Center>
                <Image
                  src={
                    postToUse?.quoteOn?.metadata?.asset?.image?.optimized?.uri
                  }
                  radius="md"
                  h="555"
                  w="auto"
                  fit="contain"
                  alt={`${postToUse?.quoteOn?.by?.handle?.localName}'s Post Image`}
                />
              </Center>
            )}

            {postToUse?.quoteOn?.metadata?.asset?.video && (
              <Center>
                <Player
                  src={
                    postToUse.quoteOn?.metadata?.asset?.video?.optimized?.uri
                  }
                />
              </Center>
            )}

            {postToUse?.quoteOn?.metadata?.embed && (
              <Center>
                <Player src={postToUse?.quoteOn?.metadata?.embed} />
              </Center>
            )}
          </Paper>
        )}

        <Space h="xl" />

        {/* Post metadata */}
        <Group justify="center" style={{ whiteSpace: "nowrap" }}>
          {/* Comments - Take user to the post */}
          <Tooltip position="bottom" label="Comment">
            <ActionIcon
              variant="subtle"
              radius="md"
              size={36}
              onClick={(e) => {
                router.push(`/post/${postToUse?.id}`);
                e.stopPropagation();
              }}
            >
              <IconMessageCircle size={18} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Text size="xs" c="dimmed">
            {postContent?.stats?.comments}
          </Text>

          {/* Mirrors */}
          <Tooltip position="bottom" label="Mirror">
            <ActionIcon
              variant="subtle"
              radius="md"
              size={36}
              onClick={async (e) => {
                try {
                  e.stopPropagation();
                  if (session) {
                    handleMirror();

                    notifications.show({
                      title: "Post mirrored",
                      icon: <IconCheck size="1.1rem" />,
                      color: "green",
                      message: `Successfully mirrored ${
                        postToUse.by?.handle?.localName || "anon"
                      }'s post.`,
                    });
                  } else {
                    // Handle the case when activeProfile.data is falsy (button disabled)
                    notifications.show({
                      title: "Error",
                      icon: <IconX size="1.1rem" />,
                      color: "red",
                      message: `Login to mirror this post!`,
                    });
                  }
                } catch (error) {
                  console.error(error);
                  notifications.show({
                    title: "Error",
                    icon: <IconX size="1.1rem" />,
                    color: "red",
                    message: `Something Happened: ${error}`,
                  });
                }
              }}
            >
              <GiMirrorMirror size={18} />
            </ActionIcon>
          </Tooltip>
          <Text size="xs" c="dimmed">
            {postContent?.stats?.mirrors}
          </Text>

          {/* Hearts */}
          <Tooltip position="bottom" label="Heart">
            <ActionIcon
              variant="subtle"
              radius="md"
              size={36}
              onClick={(e) => {
                e.stopPropagation();
                try {
                  if (!session?.authenticated) {
                    notifications.show({
                      title: "Error",
                      icon: <IconX size="1.1rem" />,
                      color: "red",
                      message: `Login to like this post!`,
                    });
                    return; // Return early to prevent further execution
                  }

                  handleReaction();
                  notifications.show({
                    title: "Liked!",
                    icon: <IconHeartFilled size="1.1rem" />,
                    color: "blue",
                    message: `You Liked ${
                      postToUse.by?.handle?.localName || "Anon"
                    }'s post. Keep it going!`,
                  });
                } catch (error) {
                  notifications.show({
                    title: "Error",
                    icon: <IconX size="1.1rem" />,
                    color: "red",
                    message: `Something Happened! ${error}`,
                  });
                  console.error(error);
                }
              }}
            >
              {userUpvoted || hasReaction ? (
                <IconHeartFilled size={18} stroke={1.5} />
              ) : (
                <IconHeart size={18} stroke={1.5} />
              )}
            </ActionIcon>
          </Tooltip>
          <Text size="xs" c="dimmed">
            {postContent?.stats?.upvotes}
          </Text>
          <Tooltip position="bottom" label="Collect">
            <ActionIcon
              variant="subtle"
              radius="md"
              size={36}
              onClick={async (e) => {
                e.stopPropagation();
                try {
                  if (!session) {
                    notifications.show({
                      title: "Error",
                      icon: <IconX size="1.1rem" />,
                      color: "red",
                      message: `Login to collect this post!`,
                    });
                    return; // Return early to prevent further execution
                  }

                  switch (postToUse.collectPolicy.state) {
                    case CollectState.COLLECT_TIME_EXPIRED:
                      notifications.show({
                        title: "Error: Post cannot be collected!",
                        icon: <IconX size="1.1rem" />,
                        color: "red",
                        message: `The collection time has expired for this post.`,
                      });

                    case CollectState.COLLECT_LIMIT_REACHED:
                      notifications.show({
                        title: "Error: Post cannot be collected!",
                        icon: <IconX size="1.1rem" />,
                        color: "red",
                        message: `The collection limit has been reached for this post.`,
                      });

                    case CollectState.NOT_A_FOLLOWER:
                      notifications.show({
                        title: "Error: Post cannot be collected!",
                        icon: <IconX size="1.1rem" />,
                        color: "red",
                        message: `You need to follow ${post.profile.name} to collect this post.`,
                      });

                    case CollectState.CANNOT_BE_COLLECTED:
                      notifications.show({
                        title: "Error: Post cannot be collected!",
                        icon: <IconX size="1.1rem" />,
                        color: "red",
                        message: `The creator of this post has disabled collections.`,
                      });

                    case CollectState.CAN_BE_COLLECTED:
                      try {
                        const result = await collect?.execute();

                        if (result?.isFailure()) {
                          throw new Error(result.error.message);
                        }
                        notifications.show({
                          title: "Success!",
                          icon: <IconCheck size="1.1rem" />,
                          color: "green",
                          message: `You have collected ${
                            postToUse.by?.handle?.localName || "Anon"
                          }'s post`,
                        });
                      } catch (error) {
                        console.error(error);
                        // TODO: Handle "InsufficientFundsError"
                        notifications.show({
                          title: "Error: Post cannot be collected!",
                          icon: <IconX size="1.1rem" />,
                          color: "red",
                          message: `Something went wrong collecting this post. Please try again later.`,
                        });
                      }
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <IconStack3 size={18} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Text size="xs" c="dimmed">
            {postContent?.stats?.collects}
          </Text>
        </Group>
        <Space h="lg" />
      </Paper>
      <Space h="md" />
    </>
  );
}
