import type { NextPage } from "next";
import {
  useSession,
  useExplorePublications,
  Post as PostType,
  useFeed,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType,
  useFeedHighlights,
} from "@lens-protocol/react-web";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "@/components/Post";
import { useState } from "react";
import { BsFire } from "react-icons/bs";
import { GiWaveCrest } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import {
  Container,
  Space,
  Tabs,
  rem,
  Text,
  Loader,
  Group,
  Center,
  Button,
  MantineProvider,
  Paper,
  createTheme,
  Checkbox,
  UnstyledButton,
  Avatar,
} from "@mantine/core";
import classes from "../styles/Tabs.module.css";
import { useRouter } from "next/router";
import { Player } from "@livepeer/react";

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
    orderBy: ExplorePublicationsOrderByType.TopCollectedOpenAction,
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
                <Avatar radius="xl" size="lg" />
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

              {checked ? (
                <>
                  {highlightsFeed.loading && (
                    <Group justify="center">
                      <Loader color="blue" />
                    </Group>
                  )}

                  {!highlightsFeed.loading && highlightsFeed && (
                    <InfiniteScroll
                      dataLength={highlightsFeed?.data?.length || 0}
                      next={() => highlightsFeed.next()}
                      hasMore={highlightsFeed.hasMore}
                      loader={
                        <>
                          <Group justify="center">
                            <Loader color="blue" />
                          </Group>
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
                  {followingFeed.loading && (
                    <Group justify="center">
                      <Loader color="blue" />
                    </Group>
                  )}

                  {!followingFeed.loading && followingFeed && (
                    <InfiniteScroll
                      dataLength={followingFeed?.data?.length || 0}
                      next={() => followingFeed.next()}
                      hasMore={followingFeed.hasMore}
                      loader={
                        <>
                          <Group justify="center">
                            <Loader color="blue" />
                          </Group>
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

          {/* Hot feed loading */}
          {hotFeed.loading && (
            <Group justify="center">
              <Loader color="blue" />
            </Group>
          )}

          {/* Hot feed has loaded */}
          {!hotFeed.loading && hotFeed && (
            <InfiniteScroll
              dataLength={hotFeed?.data?.length || 0}
              next={() => hotFeed?.next()}
              hasMore={hotFeed?.hasMore}
              loader={
                <>
                  <Group justify="center">
                    <Loader color="blue" />
                  </Group>
                </>
              }
              endMessage={<Space h={100} />}
            >
              {
                // @ts-ignore post type
                hotFeed.data.map((post: PostType) => (
                  <Post key={post.id} post={post} />
                ))
              }
            </InfiniteScroll>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
