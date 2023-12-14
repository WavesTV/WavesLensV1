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
import classes from "../../styles/Tabs.module.css";
import { useRouter } from "next/router";
import { Player } from "@livepeer/react";
import { RxReload } from "react-icons/rx";
import { RiArrowDropDownFill, RiArrowRightCircleLine } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { MdPlaylistRemove } from "react-icons/md";
import { BsFire } from "react-icons/bs";
import { GiWaveCrest, GiWaveSurfer } from "react-icons/gi";
import { FollowerFeed } from "./FollowerFeed";
import { HighlightFeed } from "./HighlightFeed";
import { HotFeed } from "./HotFeed";
import { BsChatSquareTextFill } from "react-icons/bs";
import { MdVideoCameraBack } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { useState } from "react";

export default function Feed() {
  const router = useRouter();
  const { data: session } = useSession();
  const [checked, setChecked] = useState(false);
  const iconStyle = { width: rem(18), height: rem(18) };
  const [activeTab, setActiveTab] = useState<string | null>("All");

  const theme = createTheme({
    cursorType: "pointer",
  });

  const [handle, setHandle] = useState("");

  const surfProfile = useProfile({
    forHandle: `lens/${handle}`,
  });

  const surfFeed = useFeed({
    where: {
      for: surfProfile?.data?.id,
    },
  });

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
            <Player playbackId="254ernorohx1u6xz" title="type shi" />
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
              <Group justify="space-between">
                <Menu shadow="md" width={277}>
                  <Menu.Target>
                    <Button
                      variant="light"
                      radius="sm"
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
                          surfProfile.loading && (
                            <Loader color="blue" size="xs" />
                          )
                        }
                      />
                    </Paper>
                  </Menu.Dropdown>
                </Menu>

                <MantineProvider theme={theme}>
                  <Checkbox
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                    radius="xl"
                    label={
                      <Text size="xs" fw={444} fs="italic">
                        Highlights
                      </Text>
                    }
                    labelPosition="right"
                  />
                </MantineProvider>
              </Group>
              <Space h="md" />

              {handle.length > 0 && surfFeed ? (
                // Render Surf Feed when 'handle' is not empty and 'surfFeed' is available
                <>
                  <Tabs
                    variant="pills"
                    value={activeTab}
                    onChange={setActiveTab}
                    radius="xl"
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

                    {/* Following Feed content not loading */}
                    {surfFeed.data === undefined &&
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

                    {/* Following Feed content loading */}
                    {surfFeed.loading &&
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

                    <Tabs.Panel value="All">
                      <Space h="md" />

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
                        surfFeed?.data?.map((post: PostType) => (
                          // @ts-ignore
                          <Post key={post.id} post={post.root} />
                        ))}
                      </InfiniteScroll>
                    </Tabs.Panel>

                    <Tabs.Panel value="Text">
                      <Space h="md" />

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
                      {/* Hot feed content */}
                      {!surfFeed.loading && surfFeed && (
                        <InfiniteScroll
                          dataLength={surfFeed?.data?.length || 0}
                          next={() => surfFeed?.next()}
                          hasMore={surfFeed?.hasMore}
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
                          surfFeed?.data
                            ?.filter(
                              (post) =>
                                post.root.metadata?.__typename ===
                                "TextOnlyMetadataV3",
                            )
                            .map((post) => (
                              <Post key={post.id} post={post.root} />
                            ))}
                        </InfiniteScroll>
                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="Video">
                      <Space h="md" />

                      {/* Hot feed content */}
                      {!surfFeed.loading && surfFeed && (
                        <InfiniteScroll
                          dataLength={surfFeed?.data?.length || 0}
                          next={() => surfFeed?.next()}
                          hasMore={surfFeed?.hasMore}
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
                          surfFeed?.data
                            ?.filter(
                              (post) =>
                                post.root.metadata?.__typename ===
                                "VideoMetadataV3",
                            )
                            .map((post) => (
                              <Post key={post.root.id} post={post.root} />
                            ))}
                        </InfiniteScroll>
                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="Audio">
                      <Space h="md" />

                      {/* Hot feed content */}
                      {!surfFeed.loading && surfFeed && (
                        <InfiniteScroll
                          dataLength={surfFeed?.data?.length || 0}
                          next={() => surfFeed?.next()}
                          hasMore={surfFeed?.hasMore}
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
                          surfFeed?.data
                            ?.filter(
                              (post) =>
                                post.root.metadata?.__typename ===
                                "AudioMetadataV3",
                            )
                            .map((post) => (
                              <Post key={post.root.id} post={post.root} />
                            ))}
                        </InfiniteScroll>
                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="Images">
                      <Space h="md" />

                      {/* Hot feed content */}
                      {!surfFeed.loading && surfFeed && (
                        <InfiniteScroll
                          dataLength={surfFeed?.data?.length || 0}
                          next={() => surfFeed?.next()}
                          hasMore={surfFeed?.hasMore}
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
                          surfFeed?.data
                            ?.filter(
                              (post) =>
                                post.root.metadata?.__typename ===
                                "ImageMetadataV3",
                            )
                            .map((post) => (
                              <Post key={post.root.id} post={post.root} />
                            ))}
                        </InfiniteScroll>
                      )}
                    </Tabs.Panel>
                  </Tabs>
                </>
              ) : checked ? (
                <>
                  <HighlightFeed />
                </>
              ) : (
                <>
                  <FollowerFeed />
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
          <HotFeed />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
