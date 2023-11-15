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

export default function Dashboard() {
  const { data: session } = useSession();

  const profilePosts = usePublications({
    where: {
      from: [session?.profile?.id],
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

      {session?.authenticated ? (
        <>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              {/* @ts-ignore */}
              <Image
                // @ts-ignore

                height={200}
                fallbackSrc="https://www.hdwallpaper.nu/wp-content/uploads/2015/07/Ocean-wave-stock-image_WEB.jpg"
              />
            </Card.Section>

            <Avatar
              // @ts-ignore

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

            <Space h="xl" />
            <Stream />
            <Space h="xl" />

            <Group justify="center">
              <Text fw={500} size="sm">
                {session &&
                  "profile" in session &&
                  session.profile?.stats?.followers}{" "}
                Followers
              </Text>
              |
              <Text fw={500} size="sm">
                {session &&
                  "profile" in session &&
                  session.profile?.stats?.following}{" "}
                Following
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
            {/* @ts-ignore */}
            <Image
              // @ts-ignore

              height={200}
              fallbackSrc="https://www.hdwallpaper.nu/wp-content/uploads/2015/07/Ocean-wave-stock-image_WEB.jpg"
              alt="default cover photo"
            />
          </Card.Section>

          <Avatar
            // @ts-ignore
            className={styles.avatar}
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
          />
          {/* Profile Name */}
          <Group justify="center" className={styles.profileName}>
            <Text fw={500}>@Anon</Text>
          </Group>

          <Space h="md" />

          <Group justify="center">
            <Text fw={500} fz="sm">
              1 {" Followers"}
            </Text>
            |
            <Text fw={500} fz="sm">
              1 {" Following"}
            </Text>
          </Group>

          <Space h="md" />
          <Container size="md">
            <Button component={Link} href="/login">
              Sign In to Stream
            </Button>
          </Container>
        </Card>
      )}
    </>
  );
}
