import Post from "@/components/Post";
import {
  Post as PostType,
  useProfile,
  ProfileId,
  useSession,
  usePublications,
  useFollow,
  useUnfollow,
  profileId,
} from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import FollowButton from "@/components/FollowButton";
import {
  Center,
  Space,
  Button,
  Card,
  Group,
  Avatar,
  Text,
  Loader,
  Image,
  Container,
  Paper,
  CopyButton,
  Tooltip,
} from "@mantine/core";
import styles from "../../styles/ProfileCard.module.css";
import { Player } from "@livepeer/react";
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconScreenShare,
  IconExclamationMark,
} from "@tabler/icons-react";

const ProfilePage = () => {
  // Get the post ID from the URL
  const router = useRouter();
  const { handle } = router.query;

  const session = useSession();

  const profile = useProfile({
    forHandle: `lens/${handle}`,
  });

  const profileId = profile?.data?.id;

  const profilePosts = usePublications({
    where: {
      from: profileId ? [profileId] : undefined,
    },
  });

  if (profile?.error) {
    return (
      <>
        <Container>
          <Paper shadow="xl" radius="md" withBorder p="xl">
            <Center>
              <h1>Profile not found</h1>
              <Space h="lg" />
            </Center>
            <Center>
              <Button onClick={() => router.push("/")}>Back Home</Button>
            </Center>
          </Paper>
        </Container>
      </>
    );
  }

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
      <Container>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            {/* @ts-ignore */}
            <Image
              // @ts-ignore
              alt={`${profile?.data?.handle?.localName}'s cover photo`}
              // @ts-ignore, image is there
              src={profile?.data?.metadata?.coverPicture?.optimized?.uri}
              height={200}
              fallbackSrc="https://www.hdwallpaper.nu/wp-content/uploads/2015/07/Ocean-wave-stock-image_WEB.jpg"
            />
          </Card.Section>

          <Avatar
            alt={`${profile?.data?.handle?.localName}'s profile picture`}
            // @ts-ignore, image is there
            src={
              profile?.data?.metadata?.picture &&
              "optimized" in profile?.data?.metadata?.picture
                ? profile?.data?.metadata?.picture.optimized?.uri
                : "/user.png"
            }
            className={styles.avatar}
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
          />

          {/* Profile Name */}
          <Group justify="center" className={styles.profileName}>
            <Text fw={500}>{profile?.data?.metadata?.displayName}</Text>
          </Group>

          {/* Profile Handle */}
          <Group justify="center">@{profile?.data?.handle?.localName}</Group>

          <Space h="xl" />
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Group justify="right">
              <CopyButton
                value={`https://waves-lensv1.vercel.app/profile/${profile?.data?.handle?.localName}`}
                timeout={2000}
              >
                {({ copied, copy }) => (
                  <Button
                    size="xs"
                    color={copied ? "teal" : "blue"}
                    onClick={copy}
                  >
                    {copied ? (
                      <>
                        <Tooltip label="Copied Wave">
                          <IconCheck size={16} />
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip
                          label={`Share ${
                            profile?.data?.metadata?.displayName ||
                            profile?.data?.handle?.localName
                          }'s Wave`}
                        >
                          <IconScreenShare size={16} />
                        </Tooltip>
                      </>
                    )}
                  </Button>
                )}
              </CopyButton>
            </Group>
            <Space h="" />
            <Text
              fz="sm"
              style={{
                maxWidth: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  profile &&
                  profile.data &&
                  profile.data.metadata &&
                  profile.data.metadata.bio
                    ? replaceURLs(
                        profile.data.metadata.bio.replace(/\n/g, "<br> "),
                      )
                    : "",
              }}
            />
          </Paper>
          <Space h="xl" />
          <Group justify="center">
            <Text fw={500} fz="sm">
              {profile?.data?.stats.followers}
              {" Followers"}
            </Text>
            |
            <Text fw={500} fz="sm">
              {profile?.data?.stats.following}
              {" Following"}
            </Text>
          </Group>

          <Space h="md" />
          {profile && profile.data && (
            <Button
              fullWidth
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              onClick={() =>
                notifications.show({
                  title: "Lens V2 Upgrade",
                  icon: <IconExclamationMark size="1.1rem" />,
                  color: "blue",
                  message:
                    "Waves is upgrading to Lens v2. This will work soon... hopefully. ",
                })
              }
            >
              Follow
            </Button>
          )}
        </Card>
      </Container>
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
  );
};

export default ProfilePage;
