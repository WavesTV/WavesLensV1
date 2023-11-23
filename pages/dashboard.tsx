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
} from "@mantine/core";
import {
  Post as PostType,
  useSession,
  usePublications,
} from "@lens-protocol/react-web";
import styles from "../styles/ProfileCard.module.css";
import Link from "next/link";
import { Stream } from "@/components/Stream";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "@/components/Post";
import { GiWaveCrest } from "react-icons/gi";
import { useRouter } from "next/router";
import { IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ProfileForm from "@/components/ProfileForm";

export default function Dashboard() {
  const { data: session } = useSession();
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const profilePosts = usePublications({
    where: {
      from:
        session && "profile" in session && session?.profile?.id
          ? [session.profile.id]
          : undefined,
    },
  });

  console.log(session);

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
              src={session?.profile?.metadata?.picture}
              className={styles.avatar}
              size={80}
              radius={80}
              mx="auto"
              mt={-30}
            />

            {/* Profile Handle */}
            <Group justify="center">
              {" "}
              <Text size="md" fw={500}>
                {session && "profile" in session
                  ? `@${session.profile?.handle?.localName}`
                  : "No Profile"}
              </Text>
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
              <Text fw={500} size="sm">
                {session.profile?.stats?.followers} Followers
              </Text>
              |
              <Text fw={500} size="sm">
                {session.profile?.stats?.following} Following
              </Text>
            </Group>

            <Space h="md" />
          </Card>

          <Space h="xl" />
          {/* Loading */}
          {profilePosts?.loading && <></>}
          {/* Loaded */}
          {!profilePosts?.loading && profilePosts?.data && (
            <InfiniteScroll
              dataLength={profilePosts?.data?.length || 0}
              next={() => profilePosts?.next()}
              hasMore={profilePosts?.hasMore}
              className="mt-4"
              loader={<></>}
            >
              {// @ts-ignore post type
              profilePosts?.data?.map((post: PostType) => (
                <Post key={post.id} post={post} />
              ))}
            </InfiniteScroll>
          )}
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
