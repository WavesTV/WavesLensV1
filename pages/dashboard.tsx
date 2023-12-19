import {
  Space,
  Center,
  Text,
  Paper,
  Divider,
  Image,
  Group,
  Avatar,
  Card,
  Button,
  Container,
  Modal,
  ActionIcon,
  Skeleton,
  Tabs,
  rem,
  UnstyledButton,
} from "@mantine/core";
import {
  Post as PostType,
  useSession,
  usePublications,
} from "@lens-protocol/react-web";
import styles from "../styles/ProfileCard.module.css";
import { Stream } from "@/components/Stream";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "@/components/Post";
import { GiWaveCrest } from "react-icons/gi";
import { useRouter } from "next/router";
import { IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ProfileForm from "@/components/ProfileForm";
import { BsChatSquareTextFill } from "react-icons/bs";
import { MdVideoCameraBack } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { useState } from "react";
import { ViewFollowing } from "@/components/ViewFollowing";
import { ViewFollowers } from "@/components/ViewFollowers";

export default function Dashboard() {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const iconStyle = { width: rem(18), height: rem(18) };
  const [activeTab, setActiveTab] = useState<string | null>("All");
  const [openedFollowing, { open: openFollowing, close: closeFollowing }] =
    useDisclosure(false);
  const [openedFollowers, { open: openFollowers, close: closeFollowers }] =
    useDisclosure(false);

  const profilePosts = usePublications({
    where: {
      from:
        session && "profile" in session && session?.profile?.id
          ? [session.profile.id]
          : undefined,
    },
  });



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
      {session?.authenticated && session.type === "WITH_PROFILE" && (
        <>
          <Modal
            opened={openedFollowing}
            onClose={closeFollowing}
            title={
              <Text fw={555}>
                {
                  // @ts-ignore
                  session.profile?.metadata?.displayName ||
                    // @ts-ignore
                    session.profile?.handle?.localName
                }
                &apos;s Following
              </Text>
            }
            centered
          >
            <ViewFollowing
              profileId={
                // @ts-ignore
                session?.profile?.id
              }
              closeFollowing={closeFollowing}
            />
          </Modal>

          <Modal
            opened={openedFollowers}
            onClose={closeFollowers}
            title={
              <Text fw={555}>
                {
                  // @ts-ignore
                  session.profile?.metadata?.displayName ||
                    // @ts-ignore
                    session.profile?.handle?.localName
                }
                &apos;s Followers
              </Text>
            }
            centered
          >
            <ViewFollowers
              profileId={
                // @ts-ignore
                session.profile.id
              }
              closeFollowers={closeFollowers}
            />
          </Modal>
        </>
      )}

      <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
              Stream Dashboard
            </Text>
          </>
        }
        labelPosition="center"
      />

      <Space h="lg" />

      {session?.authenticated && session.type === "WITH_PROFILE" ? (
        <>
          {/* Modal content */}
          <Modal opened={opened} onClose={close} centered>
            <ProfileForm Profile={session?.profile} />
          </Modal>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              {/* @ts-ignore */}
              <Image
                // @ts-ignore
                src={session?.profile?.metadata?.coverPicture}
                height={200}
                fallbackSrc="https://www.hdwallpaper.nu/wp-content/uploads/2015/07/Ocean-wave-stock-image_WEB.jpg"
                alt="cover picture"
              />
            </Card.Section>

            <Avatar
              // @ts-ignore
              src={
                session?.profile?.metadata?.picture ||
                "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
              }
              className={styles.avatar}
              size={80}
              radius={80}
              mx="auto"
              mt={-30}
            />

            {/* Profile Name */}
            <Group justify="center" className={styles.profileName}>
              <Text fw={500}>
                {session.profile?.metadata?.displayName ||
                  session.profile?.handle?.localName}
              </Text>
            </Group>

            {/* Profile Handle */}
            <Group justify="center">
              @{session.profile?.handle?.localName}
            </Group>

            <Group justify="right">
              <ActionIcon
                onClick={open}
                variant="light"
                radius="md"
                aria-label="Settings"
              >
                <IconSettings size="1.3rem" />
              </ActionIcon>
            </Group>

            <Space h="xl" />
            <Stream />
            <Space h="xl" />
            <Paper shadow="sm" p="lg" radius="md" withBorder>
              <Text
                fz="sm"
                style={{
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                }}
                dangerouslySetInnerHTML={{
                  __html: session?.profile?.metadata?.bio
                    ? replaceURLs(
                        session?.profile?.metadata?.bio.replace(/\n/g, "<br> "),
                      )
                    : "",
                }}
              />
            </Paper>
            <Space h="xl" />

            <Group justify="center">
              <UnstyledButton onClick={openFollowers}>
                <Text fw={500} size="sm">
                  {session.profile?.stats?.followers} Followers
                </Text>
              </UnstyledButton>
              |
              <UnstyledButton onClick={openFollowing}>
                <Text fw={500} size="sm">
                  {session.profile?.stats?.following} Following
                </Text>
              </UnstyledButton>
            </Group>

            <Space h="md" />
          </Card>

          <Space h="xl" />
          <Tabs
            variant="pills"
            value={activeTab}
            onChange={setActiveTab}
            radius="xl"
            defaultValue="All"
          >
            <Tabs.List justify="center">
              <Tabs.Tab value="All">All</Tabs.Tab>
              <Tabs.Tab
                value="Text"
                leftSection={<BsChatSquareTextFill style={iconStyle} />}
              />
              <Tabs.Tab
                value="Video"
                leftSection={<MdVideoCameraBack style={iconStyle} />}
              />

              <Tabs.Tab
                value="Images"
                leftSection={<FaImage style={iconStyle} />}
              />
            </Tabs.List>

            <Space h="md" />

            {/* Loading */}
            {profilePosts?.loading &&
              Array.from({ length: 10 }).map((_, i) => (
                <>
                  <Paper p="xs" shadow="xl" radius="md" withBorder key={i}>
                    <Space h="md" />
                    <Center>
                      <Skeleton height={50} circle mb="xl" />
                    </Center>
                    <Skeleton height={8} radius="xl" />
                    <Skeleton height={8} mt={6} radius="xl" />
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                    <Space h="md" />
                  </Paper>
                  <Space h="md" />
                </>
              ))}

            <Tabs.Panel value="All">
              <Space h="md" />

              {/* Hot feed content */}
              {!profilePosts?.loading && profilePosts?.data && (
                <InfiniteScroll
                  dataLength={profilePosts?.data?.length || 0}
                  next={() => profilePosts?.next()}
                  hasMore={profilePosts?.hasMore}
                  className="mt-4"
                  loader={
                    <>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <>
                          <Paper
                            p="xs"
                            shadow="xl"
                            radius="md"
                            withBorder
                            key={i}
                          >
                            <Space h="md" />
                            <Center>
                              <Skeleton height={50} circle mb="xl" />
                            </Center>
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton
                              height={8}
                              mt={6}
                              width="70%"
                              radius="xl"
                            />
                            <Space h="md" />
                          </Paper>
                          <Space h="md" />
                        </>
                      ))}
                    </>
                  }
                >
                  {// @ts-ignore post type
                  profilePosts?.data?.map((post: PostType) => (
                    <Post key={post.id} post={post} />
                  ))}
                </InfiniteScroll>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="Text">
              <Space h="md" />

              {/* Hot feed content */}
              {!profilePosts.loading && profilePosts && (
                <InfiniteScroll
                  dataLength={profilePosts?.data?.length || 0}
                  next={() => profilePosts?.next()}
                  hasMore={profilePosts?.hasMore}
                  loader={
                    <>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <>
                          <Paper
                            p="xs"
                            shadow="xl"
                            radius="md"
                            withBorder
                            key={i}
                          >
                            <Space h="md" />
                            <Center>
                              <Skeleton height={50} circle mb="xl" />
                            </Center>
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton
                              height={8}
                              mt={6}
                              width="70%"
                              radius="xl"
                            />
                            <Space h="md" />
                          </Paper>
                          <Space h="md" />
                        </>
                      ))}
                    </>
                  }
                  endMessage={<Space h={100} />}
                >
                  {// @ts-ignore post type
                  profilePosts?.data
                    ?.filter((post) => {
                      // Check if the post is a Mirror, and if so, access metadata accordingly
                      if (post.__typename === "Mirror" && post.mirrorOn) {
                        return (
                          post.mirrorOn.metadata?.__typename ===
                          "TextOnlyMetadataV3"
                        );
                      } else {
                        return (
                          // @ts-ignore
                          post.metadata?.__typename === "TextOnlyMetadataV3"
                        );
                      }
                    })
                    .map((post) => <Post key={post.id} post={post} />)}
                </InfiniteScroll>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="Video">
              <Space h="md" />

              {/* Hot feed content */}
              {!profilePosts.loading && profilePosts && (
                <InfiniteScroll
                  dataLength={profilePosts?.data?.length || 0}
                  next={() => profilePosts?.next()}
                  hasMore={profilePosts?.hasMore}
                  loader={
                    <>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <>
                          <Paper
                            p="xs"
                            shadow="xl"
                            radius="md"
                            withBorder
                            key={i}
                          >
                            <Space h="md" />
                            <Center>
                              <Skeleton height={50} circle mb="xl" />
                            </Center>
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton
                              height={8}
                              mt={6}
                              width="70%"
                              radius="xl"
                            />
                            <Space h="md" />
                          </Paper>
                          <Space h="md" />
                        </>
                      ))}
                    </>
                  }
                  endMessage={<Space h={100} />}
                >
                  {// @ts-ignore post type
                  profilePosts?.data
                    ?.filter((post) => {
                      // Check if the post is a Mirror, and if so, access metadata accordingly
                      if (post.__typename === "Mirror" && post.mirrorOn) {
                        return (
                          post.mirrorOn.metadata?.__typename ===
                          "VideoMetadataV3"
                        );
                      } else {
                        // @ts-ignore
                        return post.metadata?.__typename === "VideoMetadataV3";
                      }
                    })
                    .map((post) => <Post key={post.id} post={post} />)}
                </InfiniteScroll>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="Audio">
              <Space h="md" />

              {/* Hot feed content */}
              {!profilePosts.loading && profilePosts && (
                <InfiniteScroll
                  dataLength={profilePosts?.data?.length || 0}
                  next={() => profilePosts?.next()}
                  hasMore={profilePosts?.hasMore}
                  loader={
                    <>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <>
                          <Paper
                            p="xs"
                            shadow="xl"
                            radius="md"
                            withBorder
                            key={i}
                          >
                            <Space h="md" />
                            <Center>
                              <Skeleton height={50} circle mb="xl" />
                            </Center>
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton
                              height={8}
                              mt={6}
                              width="70%"
                              radius="xl"
                            />
                            <Space h="md" />
                          </Paper>
                          <Space h="md" />
                        </>
                      ))}
                    </>
                  }
                  endMessage={<Space h={100} />}
                >
                  {// @ts-ignore post type
                  profilePosts?.data
                    ?.filter((post) => {
                      // Check if the post is a Mirror, and if so, access metadata accordingly
                      if (post.__typename === "Mirror" && post.mirrorOn) {
                        return (
                          post.mirrorOn.metadata?.__typename ===
                          "AudioMetadataV3"
                        );
                      } else {
                        // @ts-ignore
                        return post.metadata?.__typename === "AudioMetadataV3";
                      }
                    })
                    .map((post) => <Post key={post.id} post={post} />)}
                </InfiniteScroll>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="Images">
              <Space h="md" />

              {/* Hot feed content */}
              {!profilePosts.loading && profilePosts && (
                <InfiniteScroll
                  dataLength={profilePosts?.data?.length || 0}
                  next={() => profilePosts?.next()}
                  hasMore={profilePosts?.hasMore}
                  loader={
                    <>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <>
                          <Paper
                            p="xs"
                            shadow="xl"
                            radius="md"
                            withBorder
                            key={i}
                          >
                            <Space h="md" />
                            <Center>
                              <Skeleton height={50} circle mb="xl" />
                            </Center>
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton
                              height={8}
                              mt={6}
                              width="70%"
                              radius="xl"
                            />
                            <Space h="md" />
                          </Paper>
                          <Space h="md" />
                        </>
                      ))}
                    </>
                  }
                  endMessage={<Space h={100} />}
                >
                  {// @ts-ignore post type
                  profilePosts?.data
                    ?.filter((post) => {
                      // Check if the post is a Mirror, and if so, access metadata accordingly
                      if (post.__typename === "Mirror" && post.mirrorOn) {
                        return (
                          post.mirrorOn.metadata?.__typename ===
                          "ImageMetadataV3"
                        );
                      } else {
                        // @ts-ignore
                        return post.metadata?.__typename === "ImageMetadataV3";
                      }
                    })
                    .map((post) => <Post key={post.id} post={post} />)}
                </InfiniteScroll>
              )}
            </Tabs.Panel>
          </Tabs>
        </>
      ) : (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              height={200}
              fallbackSrc="https://www.hdwallpaper.nu/wp-content/uploads/2015/07/Ocean-wave-stock-image_WEB.jpg"
              alt="default cover photo"
            />
          </Card.Section>

          <Avatar
            className={styles.avatar}
            src={
              "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
            }
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
          />

          <Group justify="center" className={styles.profileName}>
            <Text fw={500}>@Anon</Text>
          </Group>

          <Space h="md" />

          <Group justify="center">
            <Text fw={500} fz="sm">
              0 {" Followers"}
            </Text>
            |
            <Text fw={500} fz="sm">
              0 {" Following"}
            </Text>
          </Group>

          <Space h="md" />
          <Container>
            <Center>
              <Text size="md" fw={400}>
                Sign In to view your Dashboard.
              </Text>
            </Center>
            <Space h="md" />
          </Container>
          <Button
            fullWidth
            leftSection={<GiWaveCrest size="1rem" />}
            variant="gradient"
            gradient={{ from: "cyan", to: "indigo" }}
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button>
        </Card>
      )}
    </>
  );
}
