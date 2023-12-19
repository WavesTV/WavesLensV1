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
  Quote,
  Mirror,
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
  Container,
  Spoiler,
  Image,
  Center,
  Button,
  HoverCard,
  Box,
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
import { IconExclamationMark } from "@tabler/icons-react";

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
        (url: any) => `<a href="${url}" target="_blank">${url}</a>`,
      )
      .replace(atSymbolRegex, (match: any) => ` ${match} `);
  };

  return (
    <>
      <Paper p="xs" shadow="xl" radius="md" withBorder>
        <Space h="sm" />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Group ml={10} justify="left">
            <Text c="dimmed" size="xs" fw={500}>
              {formatDate(postToUse.createdAt)} ago
            </Text>
          </Group>

          <Group justify="right">
            {isMirror && (
              <Button
                variant="transparent"
                leftSection={<GiMirrorMirror size={13} />}
                component={Link}
                href={`/wave/${postToUse.by?.handle?.localName}`}
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
                href={`/post/${postToUse.commentOn?.id}`}
              >
                <Text c="dimmed" size="xs">
                  {postToUse.by.handle?.localName} Commented
                </Text>
              </Button>
            )}
          </Group>
        </div>

        <Space h="xl" />
        <HoverCard
          width={320}
          shadow="md"
          withArrow
          openDelay={200}
          closeDelay={400}
        >
          
    
      {/* HoverCard should only trigger when hovering over the Avatar and Text */}
      <Group justify="center" style={{ display: 'flex', alignItems: 'center' }}>
        <HoverCard.Target>
  <UnstyledButton
    component={Link}
    href={`/wave/${postContent.by?.handle?.localName}`}
     style={{ display: 'flex', alignItems: 'center' }}
  >
        <Avatar
          // @ts-ignore
          src={
            postContent?.by?.metadata?.picture &&
            "optimized" in postContent?.by?.metadata?.picture
              ? postContent.by.metadata.picture.optimized?.uri
              : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
          }
          alt={`${postContent.by?.handle?.localName}'s profile picture`}
          size="lg"
        />
        <Space w="xs"/>
        <Text fw={500}>
          {postContent.by?.metadata?.displayName ||
            postContent.by?.handle?.localName}
        </Text>
         </UnstyledButton>
</HoverCard.Target>
      </Group>
    
 


         
            <HoverCard.Dropdown>
              <Group>
                <Avatar
                  // @ts-ignore
                  src={
                    postContent?.by?.metadata?.picture &&
                    "optimized" in postContent?.by?.metadata?.picture
                      ? postContent.by.metadata.picture.optimized?.uri
                      : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                  }
                  alt={`${postContent.by?.handle?.localName}'s profile picture`}
                  size="lg"
                />

                <div style={{ flex: 1 }}>
                  <Text size="md" fw={500}>
                    {postContent.by?.metadata?.displayName ||
                      postContent.by?.handle?.localName}
                  </Text>

                  <Text c="dimmed" size="sm">
                    @{postContent.by?.handle?.localName}
                  </Text>
                </div>
              </Group>
              <Space h="md" />
              <Text lineClamp={3} fw={200}>
                {
                  // @ts-ignore
                  postContent.by.metadata?.bio || null
                }
              </Text>
              <Space h="md" />
              <Group justify="center">
                <Text fw={500} size="sm">
                  {
                    // @ts-ignore
                    postContent.by.stats.followers || "0"
                  }{" "}
                  Followers
                </Text>
                |
                <Text fw={500} size="sm">
                  {
                    // @ts-ignore
                    postContent.by.stats.following || "0"
                  }{" "}
                  Following
                </Text>
              </Group>
            </HoverCard.Dropdown>
          
        </HoverCard>

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
              {/* Post content */}
              <Text
                size="md"
                style={{
                  maxWidth: "100%",
                  textAlign: "center",
                  wordWrap: "break-word",
                }}
                
                dangerouslySetInnerHTML={{
                  __html:
                    // @ts-ignore
                    postContent?.metadata?.content
                      ? replaceURLs(
                          // @ts-ignore
                          postContent.metadata.content.replace(/\n/g, "<br> "),
                        )
                      : "",
                }}
              />
          </Spoiler>
        </Center>
        <Space h="md" />

        {
          // @ts-ignore
          postContent.metadata?.asset?.image && (
            <Center>
              <Image
                // @ts-ignore
                src={postContent?.metadata?.asset?.image?.optimized?.uri}
                radius="xs"
                
                style={{
                  width: "100%", // Width is 100% of the container
                  maxWidth: "100%", // Ensures the image doesn't scale beyond its original size
                  maxHeight: "1000px",
                }}
                alt={`${postToUse.by?.handle?.localName}'s Post Image`}
              />
            </Center>
          )
        }

        {
          // @ts-ignore
          postContent?.metadata?.asset?.video && (
            <Center>
              <Player
                // @ts-ignore
                src={postContent?.metadata?.asset?.video?.optimized?.uri}
              />
            </Center>
          )
        }

        {
          // @ts-ignore
          postContent?.metadata?.asset?.audio && (
            <Center>
              <iframe
                // @ts-ignore
                src={"postContent?.metadata?.asset?.audio?.optimized?.uri"}
              />
            </Center>
          )
        }

        {
          // @ts-ignore
          postContent?.metadata?.embed && (
            <Center>
              <Player
                // @ts-ignore
                src={postContent?.metadata?.embed}
              />
            </Center>
          )
        }

        {post.__typename === "Quote" && (
          <Paper shadow="xl" radius="md" p="xs" withBorder>
            <Group justify="right">
              <Text c="dimmed" size="xs" fw={500} mr={10}>
                {
                  // @ts-ignore
                  formatDate(postToUse.quoteOn.createdAt)
                }{" "}
                ago
              </Text>
            </Group>

            <UnstyledButton
              component={Link}
              // @ts-ignore
              href={`/wave/${postToUse.quoteOn.by?.handle?.localName}`}
            >
              <Group justify="center">
                <Avatar
                  src={
                    // @ts-ignore
                    postToUse?.by?.metadata?.picture?.optimized?.uri ||
                    "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                  }
                  alt={
                    // @ts-ignore
                    `${postToUse.quoteOn.by?.handle?.localName}'s profile picture`
                  }
                  size="lg"
                />

                <Text fw={500}>
                  {
                    // @ts-ignore
                    postToUse.quoteOn.by?.handle?.localName
                  }
                </Text>
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
                      __html:
                        // @ts-ignore
                        postToUse?.quoteOn?.metadata?.content
                          ? replaceURLs(
                              // @ts-ignore
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
            {
              // @ts-ignore
              postToUse.quoteOn.metadata?.asset?.image && (
                <Center>
                  <Image
                    src={
                      // @ts-ignore
                      postToUse?.quoteOn?.metadata?.asset?.image?.optimized?.uri
                    }
                    radius="xs"
                    style={{
                      width: "100%", // Width is 100% of the container
                      height: "auto", // Height is auto to maintain aspect ratio
                      maxWidth: "100%", // Ensures the image doesn't scale beyond its original size
                    }}
                    alt={
                      // @ts-ignore
                      `${postToUse?.quoteOn?.by?.handle?.localName}'s Post Image`
                    }
                  />
                </Center>
              )
            }

            {
              // @ts-ignore
              postToUse?.quoteOn?.metadata?.asset?.video && (
                <Center>
                  <Player
                    src={
                      // @ts-ignore
                      postToUse.quoteOn?.metadata?.asset?.video?.optimized?.uri
                    }
                  />
                </Center>
              )
            }

            {
              // @ts-ignore
              postToUse?.quoteOn?.metadata?.embed && (
                <Center>
                  <Player // @ts-ignore
                    src={postToUse?.quoteOn?.metadata?.embed}
                  />
                </Center>
              )
            }
          </Paper>
        )}

        <Space h="xl" />

        {/* Post metadata */}
        <Container fluid>
          <Group justify="center">
            {/* Comments - Take user to the post */}
            <Tooltip position="bottom" label="Comment">
              <ActionIcon
                variant="subtle"
                radius="md"
                size={36}
                onClick={(e: any) => {
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
                onClick={async (e: any) => {
                  try {
                    e.stopPropagation();
                    if (session) {
                      notifications.show({
                        title: "Lens V2 Upgrade",
                        icon: <IconExclamationMark size="1.1rem" />,
                        color: "blue",
                        message:
                          "Waves is upgrading to Lens v2. This will work soon... hopefully. ",
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
                onClick={(e: any) => {
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
              <ActionIcon variant="subtle" radius="md" size={36}>
                <IconStack3 size={18} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
            <Text size="xs" c="dimmed">
              {postContent?.stats?.collects}
            </Text>
          </Group>
        </Container>
        <Space h="lg" />
      </Paper>
      <Space h="md" />
    </>
  );
}
