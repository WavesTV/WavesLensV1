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
  ExplorePublicationsOrderByType,
  Post as PostType,
  useExplorePublications,
  LimitType,
  ExplorePublicationType,
} from "@lens-protocol/react-web";
import { RxReload } from "react-icons/rx";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "@/components/Post";
import { BsChatSquareTextFill } from "react-icons/bs";
import { MdVideoCameraBack } from "react-icons/md";
import { MdAudiotrack } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { useState } from "react";

export function HotFeed() {
  const iconStyle = { width: rem(18), height: rem(18) };
  const [activeTab, setActiveTab] = useState<string | null>("All");

  const hotFeed = useExplorePublications({
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    },
    orderBy: ExplorePublicationsOrderByType.LensCurated,
    limit: LimitType.TwentyFive,
  });
  return (
    <Tabs variant="pills" value={activeTab} onChange={setActiveTab} radius="xl">
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

        <Tabs.Tab value="Images" leftSection={<FaImage style={iconStyle} />} />
      </Tabs.List>

      <Tabs.Panel value="All">
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

        {/* Hot feed content */}
        {!hotFeed.loading && hotFeed && (
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

      <Tabs.Panel value="Text">
        <Space h="md" />

        {/* Hot feed content */}
        {!hotFeed.loading && hotFeed && (
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
            hotFeed?.data
              ?.filter(
                (post) => post.metadata?.__typename === "TextOnlyMetadataV3",
              )
              .map((post) => <Post key={post.id} post={post} />)}
          </InfiniteScroll>
        )}
      </Tabs.Panel>

      <Tabs.Panel value="Video">
        <Space h="md" />

        {/* Hot feed content */}
        {!hotFeed.loading && hotFeed && (
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
            hotFeed?.data
              ?.filter(
                (post) => post.metadata?.__typename === "VideoMetadataV3",
              )
              .map((post) => <Post key={post.id} post={post} />)}
          </InfiniteScroll>
        )}
      </Tabs.Panel>

      <Tabs.Panel value="Audio">
        <Space h="md" />

        {/* Hot feed content */}
        {!hotFeed.loading && hotFeed && (
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
            hotFeed?.data
              ?.filter(
                (post) => post.metadata?.__typename === "AudioMetadataV3",
              )
              .map((post) => <Post key={post.id} post={post} />)}
          </InfiniteScroll>
        )}
      </Tabs.Panel>

      <Tabs.Panel value="Images">
        <Space h="md" />

        {/* Hot feed content */}
        {!hotFeed.loading && hotFeed && (
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
            hotFeed?.data
              ?.filter(
                (post) => post.metadata?.__typename === "ImageMetadataV3",
              )
              .map((post) => <Post key={post.id} post={post} />)}
          </InfiniteScroll>
        )}
      </Tabs.Panel>
    </Tabs>
  );
}
