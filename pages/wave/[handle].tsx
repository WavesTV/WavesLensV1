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
  Skeleton,
  Image,
  Container,
  Paper,
  CopyButton,
  Tooltip,
  Tabs,
  rem,
  UnstyledButton,
  Modal,
} from "@mantine/core";
import styles from "../../styles/ProfileCard.module.css";
import { Player } from "@livepeer/react";
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconScreenShare,
  IconExclamationMark,
} from "@tabler/icons-react";
import { BsChatSquareTextFill } from "react-icons/bs";
import { MdVideoCameraBack } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ViewFollowing } from "@/components/ViewFollowing";
import { ViewFollowers } from "@/components/ViewFollowers";

const ProfilePage = () => {
  const iconStyle = { width: rem(18), height: rem(18) };
  const [activeTab, setActiveTab] = useState<string | null>("All");
  const router = useRouter();
  const { handle } = router.query;
  const session = useSession();
  const [openedFollowing, { open: openFollowing, close: closeFollowing }] =
    useDisclosure(false);
  const [openedFollowers, { open: openFollowers, close: closeFollowers }] =
    useDisclosure(false);

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
      <Modal
        opened={openedFollowing}
        onClose={closeFollowing}
        title={
          <Text fw={555}>
            {profile?.data?.metadata?.displayName ||
              profile?.data?.handle?.localName}
            &apos;s Following
          </Text>
        }
        centered
      >
        <ViewFollowing profileId={profileId} closeFollowing={closeFollowing} />
      </Modal>

      <Modal
        opened={openedFollowers}
        onClose={closeFollowers}
        title={
          <Text fw={555}>
            {profile?.data?.metadata?.displayName ||
              profile?.data?.handle?.localName}
            &apos;s Followers
          </Text>
        }
        centered
      >
        <ViewFollowers profileId={profileId} closeFollowers={closeFollowers} />
      </Modal>

     
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

        <Group justify="space-between">
          <>
          </>

          <Avatar
            alt={`${profile?.data?.handle?.localName}'s profile picture`}
            // @ts-ignore, image is there
            src={
              profile?.data?.metadata?.picture &&
              "optimized" in profile?.data?.metadata?.picture
                ? profile?.data?.metadata?.picture.optimized?.uri
                : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
            }
            className={styles.avatar}
            size={80}
            radius={80}
            mx="auto"
            mt={-30}
          />

          
          </Group>

          {/* Profile Name */}
          <Group justify="center" className={styles.profileName}>
            <Text fw={500}>{profile?.data?.metadata?.displayName}</Text>
          </Group>

          {/* Profile Handle */}
          <Group justify="center">@{profile?.data?.handle?.localName}</Group>

          <Space h="xl" />

          {"wavestv" === profile?.data?.handle?.localName && (
            <Paper>
              <Player playbackId="ca57j651up688am0" title="pp poopoo" />
            </Paper>
          )}
          <Space h="xs" />
<Group justify="right">
              <CopyButton
                value={`https://waves-lensv1.vercel.app/profile/${profile?.data?.handle?.localName}`}
                timeout={2000}
              >
                {({ copied, copy }) => (
                  <Tooltip label={copied ? (`${
                            profile?.data?.metadata?.displayName ||
                            profile?.data?.handle?.localName
                          }'s Wave Copied`):(`Share ${
                            profile?.data?.metadata?.displayName ||
                            profile?.data?.handle?.localName
                          }'s Wave`)}>
                  <Button
                    radius="sm"
                size="compact-md"
                    color={copied ? "teal" : "blue"}
                    onClick={copy}
                  >
                    {copied ? (
                      <>
                       
                          <IconCheck size={16} />
                      
                      </>
                    ) : (
                      <>
                        
                          <IconScreenShare size={16} />
                      
                      </>
                    )}
                  </Button>
                    </Tooltip>
                )}
              </CopyButton>
            </Group>
        
            <Space h="xs" />
            {profile?.data?.metadata?.bio && (
              <>
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
          </>
)}

  
          <Group justify="center">
            <UnstyledButton onClick={openFollowers}>
              <Text fw={500} fz="sm">
                {profile?.data?.stats.followers}
                {" Followers"}
              </Text>
            </UnstyledButton>
            |
            <UnstyledButton onClick={openFollowing}>
              <Text fw={500} fz="sm">
                {profile?.data?.stats.following}
                {" Following"}
              </Text>
            </UnstyledButton>
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
     
      <Space h="xl" />
<Container>
      <Tabs
        variant="pills"
        value={activeTab}
        onChange={setActiveTab}
        radius="xl"
        defaultValue="All"
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
              
        {/* Loading */}
        {profilePosts?.loading &&
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
          {!profilePosts?.loading && profilePosts?.data && (
            <InfiniteScroll
              dataLength={profilePosts?.data?.length || 0}
              next={() => profilePosts?.next()}
              hasMore={profilePosts?.hasMore}
              className="mt-4"
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
            >
              {// @ts-ignore post type
              profilePosts?.data?.map((post: PostType) => (
                <Post key={post.id} post={post} />
              ))}
            </InfiniteScroll>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Text">
          <Space h="md" />

          {/* Hot feed content */}
          {!profilePosts.loading && profilePosts && (
            <InfiniteScroll
              dataLength={profilePosts?.data?.length || 0}
              next={() => profilePosts?.next()}
              hasMore={profilePosts?.hasMore}
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
              profilePosts?.data
                ?.filter((post) => {
                  // Check if the post is a Mirror, and if so, access metadata accordingly
                  if (post.__typename === "Mirror" && post.mirrorOn) {
                    return (
                      post.mirrorOn.metadata?.__typename ===
                      "TextOnlyMetadataV3"
                    );
                  } else {
                    // @ts-ignore
                    return post.metadata?.__typename === "TextOnlyMetadataV3";
                  }
                })
                .map((post) => <Post key={post.id} post={post} />)}
            </InfiniteScroll>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Video">
          <Space h="md" />

          {/* Hot feed content */}
          {!profilePosts.loading && profilePosts && (
            <InfiniteScroll
              dataLength={profilePosts?.data?.length || 0}
              next={() => profilePosts?.next()}
              hasMore={profilePosts?.hasMore}
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
              profilePosts?.data
                ?.filter((post) => {
                  // Check if the post is a Mirror, and if so, access metadata accordingly
                  if (post.__typename === "Mirror" && post.mirrorOn) {
                    return (
                      post.mirrorOn.metadata?.__typename === "VideoMetadataV3"
                    );
                  } else {
                    // @ts-ignore
                    return post.metadata?.__typename === "VideoMetadataV3";
                  }
                })
                .map((post) => <Post key={post.id} post={post} />)}
            </InfiniteScroll>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Audio">
          <Space h="md" />

          {/* Hot feed content */}
          {!profilePosts.loading && profilePosts && (
            <InfiniteScroll
              dataLength={profilePosts?.data?.length || 0}
              next={() => profilePosts?.next()}
              hasMore={profilePosts?.hasMore}
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
              profilePosts?.data
                ?.filter((post) => {
                  // Check if the post is a Mirror, and if so, access metadata accordingly
                  if (post.__typename === "Mirror" && post.mirrorOn) {
                    return (
                      post.mirrorOn.metadata?.__typename === "AudioMetadataV3"
                    );
                  } else {
                    // @ts-ignore
                    return post.metadata?.__typename === "AudioMetadataV3";
                  }
                })
                .map((post) => <Post key={post.id} post={post} />)}
            </InfiniteScroll>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="Images">
          <Space h="md" />

          {/* Hot feed content */}
          {!profilePosts.loading && profilePosts && (
            <InfiniteScroll
              dataLength={profilePosts?.data?.length || 0}
              next={() => profilePosts?.next()}
              hasMore={profilePosts?.hasMore}
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
              profilePosts?.data
                ?.filter((post) => {
                  // Check if the post is a Mirror, and if so, access metadata accordingly
                  if (post.__typename === "Mirror" && post.mirrorOn) {
                    return (
                      post.mirrorOn.metadata?.__typename === "ImageMetadataV3"
                    );
                  } else {
                    // @ts-ignore
                    return post.metadata?.__typename === "ImageMetadataV3";
                  }
                })
                .map((post) => <Post key={post.id} post={post} />)}
            </InfiniteScroll>
          )}
        </Tabs.Panel>
      </Tabs>
      </Container>
    </>
  );
};

export default ProfilePage;
