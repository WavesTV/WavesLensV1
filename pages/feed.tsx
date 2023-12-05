import {
  useSession,
  useExplorePublications,
  Post as PostType,
  useFeed,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType,
  useFeedHighlights,
  useProfile,
} from "@lens-protocol/react-web";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "@/components/Post";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import {
  Container,
  Loader,
  Space,
  Tabs,
  rem,
  Text,
  ActionIcon,
  Group,
  Center,
  Button,
  MantineProvider,
  Paper,
  createTheme,
  Checkbox,
  UnstyledButton,
  Avatar,
  Skeleton,
  Menu,
  TextInput,
} from "@mantine/core";
import classes from "../styles/Tabs.module.css";
import { useRouter } from "next/router";
import { Player } from "@livepeer/react";
import { RxReload } from "react-icons/rx";
import { RiArrowDropDownFill, RiArrowRightCircleLine } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { MdPlaylistRemove } from "react-icons/md";
import { BsFire } from "react-icons/bs";
import { GiWaveCrest, GiWaveSurfer } from "react-icons/gi";

export default function Feed() {
  const router = useRouter();
  const { data: session } = useSession();
  const [checked, setChecked] = useState(false);

  const theme = createTheme({
    cursorType: "pointer",
  });

  const hotFeed = useExplorePublications({
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    },
    orderBy: ExplorePublicationsOrderByType.TopCommented,
    limit: LimitType.TwentyFive,
  });

  const followingFeed = useFeed({
    where: {
      for:
        session && "profile" in session && session?.profile?.id
          ? session.profile.id
          : undefined,
    },
  });

  const highlightsFeed = useFeedHighlights({
    where: {
      for:
        session && "profile" in session && session?.profile?.id
          ? session.profile.id
          : undefined,
    },
    limit: LimitType.TwentyFive,
  });

  const [handle, setHandle] = useState("");

  const surfProfile = useProfile({
    forHandle: `lens/${handle}`,
  });

  const profileId = surfProfile?.data?.id;
  console.log(surfProfile);
  const surfFeed = useFeed({
    where: {
      for: profileId,
    },
  });
  console.log(surfFeed);
  return (
    <>
      <Tabs variant="unstyled" defaultValue="first" classNames={classes}>
        <Tabs.List grow>
          <Tabs.Tab
            value="first"
            leftSection={
              <GiWaveCrest style={{ width: rem(16), height: rem(16) }} />
            }
          >
            <Text fz="sm">Waves</Text>
          </Tabs.Tab>

          <Tabs.Tab
            value="second"
            leftSection={
              <FaUsers style={{ width: rem(16), height: rem(16) }} />
            }
          >
            <Text fz="sm">Following</Text>
          </Tabs.Tab>

          <Tabs.Tab
            value="third"
            leftSection={<BsFire style={{ width: rem(16), height: rem(16) }} />}
          >
            <Text fz="sm">Hot</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first">
          <Space h="xl" />
          <Paper m="md" shadow="lg" radius="md" withBorder>
            <Space h="sm" />
            <Center>
              <UnstyledButton onClick={() => router.push("/profile/wavestv")}>
                <Avatar
                  src="https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                  radius="xl"
                  size="lg"
                />
                <Space w="xs" />
                <Text fw={600} size="sm">
                  WavesTV
                </Text>
              </UnstyledButton>
            </Center>
            <Space h="md" />
            <Player playbackId="d986yofqyztqce4h" title="type shi" />
            <Space h="sm" />
          </Paper>
          <Space h="xl" />
        </Tabs.Panel>

        <Tabs.Panel value="second">
          <Space h="xl" />

          {/* No Wallet, No Lens profile connected */}
          {!session?.authenticated && (
            <>
              <Container size="30rem" px={0}>
                <Paper shadow="xl" p="lg" withBorder>
                  <Center>
                    <Text size="md" fw={400}>
                      Sign In to your Lens profile to view your Following feed.
                    </Text>
                  </Center>
                  <Space h="md" />
                  <Center>
                    <Button
                      fullWidth
                      leftSection={<GiWaveCrest size="1rem" />}
                      variant="gradient"
                      gradient={{ from: "cyan", to: "indigo" }}
                      onClick={() => router.push("/login")}
                    >
                      Sign In
                    </Button>
                  </Center>
                </Paper>
              </Container>
            </>
          )}

          {/* Wallet Connected with Lens Profile */}
          {session?.authenticated && session.type === "WITH_PROFILE" && (
            <>
              <Group justify="left">
                <MantineProvider theme={theme}>
                  <Checkbox
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                    radius="xl"
                    label={
                      <Text size="xs" fw={444} fs="italic">
                        Feed Highlights
                      </Text>
                    }
                    labelPosition="right"
                  />
                </MantineProvider>
              </Group>

              <Space h="md" />

              {followingFeed.data === undefined &&
                session?.type === "WITH_PROFILE" && (
                  <>
                    <Center>
                      <ActionIcon
                        variant="light"
                        size="lg"
                        radius="xl"
                        onClick={() => window.location.reload()}
                      >
                        <RxReload size="1.4rem" />
                      </ActionIcon>
                    </Center>
                    <Space h="md" />
                  </>
                )}

              {checked ? (
                <>
                  {highlightsFeed.loading &&
                    Array.from({ length: 10 }).map((_, i) => (
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
                          <Skeleton height={8} mt={6} width="70%" radius="xl" />
                          <Space h="md" />
                        </Paper>
                        <Space h="md" />
                      </>
                    ))}

                  {!highlightsFeed.loading && highlightsFeed && (
                    <InfiniteScroll
                      dataLength={highlightsFeed?.data?.length || 0}
                      next={() => highlightsFeed.next()}
                      hasMore={highlightsFeed.hasMore}
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
                      {session &&
                        session.authenticated &&
                        highlightsFeed?.data?.map((post) => (
                          <Post key={post.id} post={post} />
                        ))}
                    </InfiniteScroll>
                  )}
                </>
              ) : (
                <>
                  {followingFeed.loading &&
                    Array.from({ length: 10 }).map((_, i) => (
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
                          <Skeleton height={8} mt={6} width="70%" radius="xl" />
                          <Space h="md" />
                        </Paper>
                        <Space h="md" />
                      </>
                    ))}

                  {!followingFeed.loading && followingFeed && (
                    <InfiniteScroll
                      dataLength={followingFeed?.data?.length || 0}
                      next={() => followingFeed.next()}
                      hasMore={followingFeed.hasMore}
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
                      {session &&
                        session.authenticated &&
                        followingFeed?.data?.map((post) => (
                          <Post key={post.root.id} post={post.root} />
                        ))}
                    </InfiniteScroll>
                  )}
                </>
              )}
            </>
          )}

          {session?.authenticated && session.type !== "WITH_PROFILE" && (
            <Container size="30rem" px={0}>
              <Paper shadow="xl" p="lg" withBorder>
                <Center>
                  <Text size="md" fw={400}>
                    You must have a Active Lens Profile.
                  </Text>
                </Center>
                <Space h="md" />
                <Center>
                  <Button
                    fullWidth
                    variant="default"
                    onClick={() => router.push("/login")}
                  >
                    Sign In
                  </Button>
                </Center>
              </Paper>
            </Container>
          )}

          <Space h={100} />
        </Tabs.Panel>

        <Tabs.Panel value="third">
          <Space h="xl" />
          <Menu shadow="md" width={277}>
            <Menu.Target>
              <Button
                variant="light"
                radius="xl"
                size="xs"
                leftSection={<GiWaveSurfer size="1.2rem" />}
                rightSection={<RiArrowDropDownFill size="1.4rem" />}
              >
                Feed Surf
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Space w="xl" />
              <Paper p="sm">
                <TextInput
                  variant="filled"
                  size="sm"
                  radius="xl"
                  label="Dive into a User's Feed"
                  placeholder="Search any Lens Handle!"
                  error={
                    handle.length > 0 &&
                    surfProfile?.error &&
                    "No Profile Found"
                  }
                  onChange={(e) => setHandle(e.target.value)}
                  rightSection={
                    surfProfile.loading && <Loader color="blue" size="xs" />
                  }
                />
              </Paper>
            </Menu.Dropdown>
          </Menu>
          <Space h="md" />

          {/* Hot feed loading */}
          {hotFeed.loading &&
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

          {/* surfFeed loading */}
          {!surfFeed.error &&
            surfFeed.loading &&
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

          {handle.length > 0 &&
          surfFeed &&
          !surfFeed.loading &&
          !surfFeed.error ? (
            <>
              <Group justify="right">
                <ActionIcon
                  onClick={() => {
                    setHandle("");
                  }}
                  variant="light"
                  size="sm"
                  color="red"
                  radius="lg"
                >
                  <MdPlaylistRemove size="1.2rem" />
                </ActionIcon>
              </Group>
              <Space h="xs" />
              <InfiniteScroll
                // @ts-ignore
                dataLength={surfFeed?.data?.length || 0}
                // @ts-ignore
                next={() => surfFeed?.data?.next()}
                // @ts-ignore
                hasMore={surfFeed?.data?.hasMore}
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
                          <Skeleton height={8} mt={6} width="70%" radius="xl" />
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
                surfFeed?.data?.map((post: PostType) => (
                  // @ts-ignore
                  <Post key={post.id} post={post.root} />
                ))}
              </InfiniteScroll>
            </>
          ) : (
            <InfiniteScroll
              dataLength={hotFeed?.data?.length || 0}
              next={() => hotFeed?.next()}
              hasMore={hotFeed?.hasMore}
              loader={
                <>
                  {Array.from({ length: 10 }).map((_, i) => (
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
                </>
              }
              endMessage={<Space h={100} />}
            >
              {// @ts-ignore post type
              hotFeed?.data?.map((post: PostType) => (
                <Post key={post.id} post={post} />
              ))}
            </InfiniteScroll>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
