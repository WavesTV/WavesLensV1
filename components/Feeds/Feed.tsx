import {
  useSession,
  Post as PostType,
  useFeed,
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
  Center,
  Button,
  Paper,
  UnstyledButton,
  Avatar,
} from "@mantine/core";
import classes from "../../styles/Tabs.module.css";
import { useRouter } from "next/router";
import { Player } from "@livepeer/react";
import { BsFire } from "react-icons/bs";
import { GiWaveCrest, GiWaveSurfer } from "react-icons/gi";
import { FollowerFeed } from "./FollowerFeed";

import { HotFeed } from "./HotFeed";
import { NewFeed } from "./NewFeed";

import { useState } from "react";
import { PiClockCountdownFill } from "react-icons/pi";

export default function Feed() {
  const router = useRouter();
  const { data: session } = useSession();

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
            {session?.authenticated && session.type === "WITH_PROFILE" && (
          <Tabs.Tab
            value="second"
            leftSection={
              <FaUsers style={{ width: rem(16), height: rem(16) }} />
            }
          >
            <Text fz="sm">Following</Text>
          </Tabs.Tab>
            )}

          <Tabs.Tab
            value="third"
            leftSection={<BsFire style={{ width: rem(16), height: rem(16) }} />}
          >
            <Text fz="sm">Hot</Text>
          </Tabs.Tab>

           <Tabs.Tab
            value="fourth"
            leftSection={<PiClockCountdownFill style={{ width: rem(18), height: rem(18) }} />}
          >
            <Text fz="sm">New</Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first">
          <Space h="xl" />
          <Paper m="md" shadow="lg" radius="md" withBorder>
            <Space h="sm" />
            <Center>
              <UnstyledButton onClick={() => router.push("/wave/wavestv")}>
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
            <Player playbackId="ca57j651up688am0" title="type shi" />
            <Space h="sm" />
          </Paper>
          <Space h="xl" />
        </Tabs.Panel>

        <Tabs.Panel value="second">
          <Space h="xl" />

          {/* Wallet Connected with Lens Profile */}
          {session?.authenticated && session.type === "WITH_PROFILE" && (
           
                <>
                {/* @ts-ignore */}
                  <FollowerFeed />
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

        <Tabs.Panel value="fourth">
          <Space h="xl" />
          <NewFeed />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
