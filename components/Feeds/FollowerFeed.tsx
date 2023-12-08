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
import {
  useSession,
  Post as PostType,
  useFeed,
} from "@lens-protocol/react-web";
import { RxReload } from "react-icons/rx";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "@/components/Post";
import { BsChatSquareTextFill } from "react-icons/bs";
import { MdVideoCameraBack } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { useState } from "react";

export function FollowerFeed() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<string | null>("All");
  const iconStyle = { width: rem(18), height: rem(18) };

  const followingFeed = useFeed({
    where: {
      for:
        session && "profile" in session && session?.profile?.id
          ? session.profile.id
          : undefined,
    },
  });

  return (
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

        {/* Following Feed content loading */}
        {followingFeed.loading &&
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
          {!followingFeed.loading && followingFeed && (
            <InfiniteScroll
              dataLength={followingFeed?.data?.length || 0}
              next={() => followingFeed?.next()}
              hasMore={followingFeed?.hasMore}
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
              {session &&
                session.authenticated &&
                followingFeed?.data?.map((post) => (
                  <Post key={post.root.id} post={post.root} />
                ))}
            </InfiniteScroll>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Text">
          <Space h="md" />

          {/* Hot feed content */}
          {!followingFeed.loading && followingFeed && (
            <InfiniteScroll
              dataLength={followingFeed?.data?.length || 0}
              next={() => followingFeed?.next()}
              hasMore={followingFeed?.hasMore}
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
              followingFeed?.data
                ?.filter(
                  (post) =>
                    post.root.metadata?.__typename === "TextOnlyMetadataV3",
                )
                .map((post) => <Post key={post.root.id} post={post.root} />)}
            </InfiniteScroll>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Video">
          <Space h="md" />

          {/* Hot feed content */}
          {!followingFeed.loading && followingFeed && (
            <InfiniteScroll
              dataLength={followingFeed?.data?.length || 0}
              next={() => followingFeed?.next()}
              hasMore={followingFeed?.hasMore}
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
              followingFeed?.data
                ?.filter(
                  (post) =>
                    post.root.metadata?.__typename === "VideoMetadataV3",
                )
                .map((post) => <Post key={post.root.id} post={post.root} />)}
            </InfiniteScroll>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Audio">
          <Space h="md" />

          {/* Hot feed content */}
          {!followingFeed.loading && followingFeed && (
            <InfiniteScroll
              dataLength={followingFeed?.data?.length || 0}
              next={() => followingFeed?.next()}
              hasMore={followingFeed?.hasMore}
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
              followingFeed?.data
                ?.filter(
                  (post) =>
                    post.root.metadata?.__typename === "AudioMetadataV3",
                )
                .map((post) => <Post key={post.root.id} post={post.root} />)}
            </InfiniteScroll>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Images">
          <Space h="md" />

          {/* Hot feed content */}
          {!followingFeed.loading && followingFeed && (
            <InfiniteScroll
              dataLength={followingFeed?.data?.length || 0}
              next={() => followingFeed?.next()}
              hasMore={followingFeed?.hasMore}
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
              followingFeed?.data
                ?.filter(
                  (post) =>
                    post.root.metadata?.__typename === "ImageMetadataV3",
                )
                .map((post) => <Post key={post.root.id} post={post.root} />)}
            </InfiniteScroll>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
