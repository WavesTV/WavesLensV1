import type { NextPage } from "next";
import {
  SessionType,
  useSession,
  useExplorePublications,
  Post as PostType,
  useFeed,
  FeedEventItemType,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  appId,
  LimitType,
  ProfileId,
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
  ActionIcon,
  Avatar,
  Paper,
  UnstyledButton,
} from "@mantine/core";
import classes from "../styles/Tabs.module.css";
import { useRouter } from "next/router";
import { Player } from "@livepeer/react";

export default function Feed() {
  const router = useRouter();
  const { data: session } = useSession();

  const hotFeed = useExplorePublications({
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    },
    orderBy: ExplorePublicationsOrderByType.TopMirrored,
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
          <Text ta="center" c="dimmed" fw={700}>
            Coming Soon
          </Text>
          <Space h="xl" />
        </Tabs.Panel>

        <Tabs.Panel value="second">
          <Space h="xl" />
          {/* Public feed loading */}

          {/* Wallet connected, but no Lens profile */}
          {!session?.authenticated && (
            <>
              <Center>
                <Button onClick={() => router.push("/login")}>
                  Sign In To View
                </Button>
              </Center>
            </>
          )}

          {followingFeed.loading && (
            <Group justify="center">
              <Loader color="blue" />
            </Group>
          )}

          {/* Public feed has loaded */}
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

          {/* Public feed has loaded */}
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
