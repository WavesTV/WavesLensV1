import type { NextPage } from "next";
import { SessionType, useSession } from "@lens-protocol/react-web";
import Feed from "@/components/Feeds/Feed";
import {
  Avatar,
  Paper,
  Text,
  Button,
  Textarea,
  Space,
  Group,
  Container,
  Skeleton,
  Center,
} from "@mantine/core";
import Link from "next/link";
import { GiWaveSurfer } from "react-icons/gi";
import { Create } from "@/components/create";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Container size={560} p={0}>
        {session?.authenticated && session?.type === "WITH_PROFILE" ? (
          <>
            <Paper shadow="xl" withBorder p="sm">
              <Create />
            </Paper>
          </>
        ) : (
          <>
            <Center>
              <Text
                fz={66}
                fw={900}
                fs="italic"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 176 }}
              >
                Waves
              </Text>
            </Center>

            <Center>
              <Text fw={700} size="md">
                Twitch Meets Twitter
              </Text>
            </Center>

            <Space h="xl" />
            <Group grow>
              <Button
                component={Link}
                size="md"
                href="/login"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
                leftSection={<GiWaveSurfer size={23} />}
              >
                Sign Up
              </Button>
            </Group>
            <Space h="xl" />

            <Paper shadow="xl" withBorder p="xl">
              <Group>
                <Avatar
                  src={
                    "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                  }
                  size="lg"
                />

                <Text c="dimmed" fw={500} size="lg">
                  Anon
                </Text>
              </Group>
              <Space h="md" />
              <Textarea
                id="content"
                variant="filled"
                size="md"
                radius="md"
                placeholder="You must have a valid Lens Profile NFT to post!"
              />

              <Space h="md" />

              <Group justify="apart">
                <Button
                  disabled
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 205 }}
                >
                  Create
                </Button>
              </Group>
            </Paper>
          </>
        )}
      </Container>
      <Space h="xl" />
      <Container>
        <Feed />
      </Container>
      <Space h={50} />
    </>
  );
};

export default Home;
