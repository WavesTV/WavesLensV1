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
  Grid,
  Skeleton,
  Menu,
  TextInput,
} from "@mantine/core";
import {
  useSession,
  Post as PostType,
  useFeed,
  useProfile,
  useSearchProfiles,
  LimitType,
  profileId,
  ProfileId
} from "@lens-protocol/react-web";
import { IconCheck, IconX } from "@tabler/icons-react";
import { RxReload } from "react-icons/rx";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "@/components/Post";
import { BsChatSquareTextFill } from "react-icons/bs";
import { MdVideoCameraBack } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { useState } from "react";
import { HighlightFeed } from "./HighlightFeed";
import { GiWaveCrest, GiWaveSurfer } from "react-icons/gi";
import { RiArrowDropDownFill } from "react-icons/ri";
import classes from "../../styles/RecommendedWaves.module.css";
import { MdSurfing } from "react-icons/md";

type SearchResultsProps = {
  query: string;
};



export function FollowerFeed({ query }: SearchResultsProps) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<string | null>("All");
  const iconStyle = { width: rem(18), height: rem(18) };
  const [checked, setChecked] = useState(false);
  const [surfFeedUser, setSurfFeedUser] = useState<ProfileId | undefined>(undefined);



  const [opened, setOpened] = useState(false);

  const theme = createTheme({
    cursorType: "pointer",
  });

  const followingFeed = useFeed({
    where: {
      for:
        session && "profile" in session && session?.profile?.id
          ? session.profile.id
          : undefined,
    },
  });

  const [handle, setHandle] = useState("");

  const { data, error, loading } = useSearchProfiles({ query: handle,
    limit: LimitType.Ten });

  const surfFeed = useFeed({
    where: {
      for: surfFeedUser,
    },
  });



  return (
    <>
     <Group justify="space-between">
                <Menu opened={opened} onChange={setOpened} shadow="md" width={277}>
                  <Menu.Target>
                    <Button
                      variant="light"
                      radius="sm"
                      size="xs"
                      leftSection={<GiWaveSurfer size="1.2rem" />}
                      rightSection={<RiArrowDropDownFill size="1.4rem" />}
                    >
                      Feed Surf
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Space w="xl" />
                    <Paper p="sm">
                      <TextInput
                       variant="filled"
                        radius="md"
                        placeholder="Search user to surf their feed!"
                        value={handle}
                        error={data && data.length === 0 && handle.length > 0 &&  ("No Profile Found")}
                        onChange={(e) => setHandle(e.target.value)}
                        leftSection={<MdSurfing size="1rem" />}
                        rightSection={
          loading ? (
            <Loader size={19} />
          ) : (
            handle.length > 0 && (
              <ActionIcon
                size={32}
                radius="md"
                color="red"
                variant="light"
                onClick={() => {
                 
                  setSurfFeedUser(undefined);
                             setHandle("");
                }
                }
              >
                <IconX size="1.1rem" />
              </ActionIcon>
            )
          )
        }
        
        rightSectionWidth={42}
                      />

                      <Space h="xs"/>
    
    <Grid grow gutter="xs">
      <Grid.Col span={4}><Button onClick={() => {setSurfFeedUser("0x05" as ProfileId)}} fullWidth size="compact-md" variant="light"><Text size="xs">Stani</Text></Button></Grid.Col>
      <Grid.Col span={4}><Button onClick={() => {setSurfFeedUser("0x01b2e3" as ProfileId)}} fullWidth size="compact-md" variant="light"><Text size="xs">Orna</Text></Button></Grid.Col>
      <Grid.Col span={4}><Button onClick={() => {setSurfFeedUser("0x01aca9" as ProfileId)}} fullWidth size="compact-md" variant="light"><Text size="xs">Krassenstein</Text></Button></Grid.Col>

    </Grid>
                    </Paper>

                       {data && data.length > 0 && handle.length > 0 && (
        <>
        {data.map((user: any) => (
              <Group key={user?.id}>
                 <UnstyledButton
                onClick={() => {
                  setSurfFeedUser(user?.id);
                  
                  setOpened(false);
                }}
                className={classes.user}
              >
                <Group>
                  <Avatar
                    alt={`${user.handle?.localName}'s profile picture`}
                    // @ts-ignore
                    src={
                      user.metadata?.picture &&
                      "optimized" in user.metadata?.picture
                        ? user.metadata?.picture.optimized?.uri
                        : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                    }
                    radius="xl"
                  />

                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {user.metadata?.displayName || user.handle?.localName}
                    </Text>

                    <Text c="dimmed" size="xs">
                      @{user.handle?.localName}
                    </Text>
                  </div>
                </Group>
              </UnstyledButton>
              </Group>
            ))}
     </>
     )}
                  </Menu.Dropdown>
                </Menu>

                <MantineProvider theme={theme}>
                  <Checkbox
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                    radius="xl"
                    label={
                      <Text size="xs" fw={444} fs="italic">
                        Follow Highlights
                      </Text>
                    }
                    labelPosition="right"
                  />
                </MantineProvider>
              </Group>
              <Space h="md" />

              {surfFeedUser && surfFeed ? (
                // Render Surf Feed when 'handle' is not empty and 'surfFeed' is available
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


                    {/* Following Feed content loading */}
                    {surfFeed.loading &&
                      Array.from({ length: 10 }).map((_, i) => (
                        <>
                          <Paper
                            p="xs"
                            shadow="xl"
                            radius="md"
                            withBorder
                            key={i}
                          >
                            <Space h="md" />
                            <Center>
                              <Skeleton height={50} circle mb="xl" />
                            </Center>
                            <Skeleton height={8} radius="xl" />
                            <Skeleton height={8} mt={6} radius="xl" />
                            <Skeleton
                              height={8}
                              mt={6}
                              width="70%"
                              radius="xl"
                            />
                            <Space h="md" />
                          </Paper>
                          <Space h="md" />
                        </>
                      ))}

                    <Tabs.Panel value="All">
                      <Space h="md" />
  <Group justify="right">
                        <ActionIcon
                          onClick={() => {
                            setSurfFeedUser(undefined);
                             setHandle("");
                          }}
                          variant="light"
                        
                          color="red"
                          radius="md"
                        >
                          <IconX size="1.2rem" />
                        </ActionIcon>
                      </Group>
                      <Space h="xs" />
                      
                      <InfiniteScroll
                        // @ts-ignore
                        dataLength={surfFeed?.data?.length || 0}
                        // @ts-ignore
                        next={() => surfFeed?.data?.next()}
                        // @ts-ignore
                        hasMore={surfFeed?.data?.hasMore}
                        loader={
                          <>
                            {Array.from({ length: 10 }).map((_, i) => (
                              <>
                                <Paper
                                  p="xs"
                                  shadow="xl"
                                  radius="md"
                                  withBorder
                                  key={i}
                                >
                                  <Space h="md" />
                                  <Center>
                                    <Skeleton height={50} circle mb="xl" />
                                  </Center>
                                  <Skeleton height={8} radius="xl" />
                                  <Skeleton height={8} mt={6} radius="xl" />
                                  <Skeleton
                                    height={8}
                                    mt={6}
                                    width="70%"
                                    radius="xl"
                                  />
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
                        surfFeed?.data?.map((post: PostType) => (
                          // @ts-ignore
                          <Post key={post.id} post={post.root} />
                        ))}
                      </InfiniteScroll>
                    </Tabs.Panel>

                    <Tabs.Panel value="Text">
                      <Space h="md" />

                      <Group justify="right">
                        <ActionIcon
                          onClick={() => {
                            setSurfFeedUser(undefined);
                             setHandle("");
                          }}
                          variant="light"
                    
                          color="red"
                          radius="md"
                        >
                          <IconX size="1.2rem" />
                        </ActionIcon>
                      </Group>
                      <Space h="xs" />
                      {/* Hot feed content */}
                      {!surfFeed.loading && surfFeed && (
                        <InfiniteScroll
                          dataLength={surfFeed?.data?.length || 0}
                          next={() => surfFeed?.next()}
                          hasMore={surfFeed?.hasMore}
                          loader={
                            <>
                              {Array.from({ length: 10 }).map((_, i) => (
                                <>
                                  <Paper
                                    p="xs"
                                    shadow="xl"
                                    radius="md"
                                    withBorder
                                    key={i}
                                  >
                                    <Space h="md" />
                                    <Center>
                                      <Skeleton height={50} circle mb="xl" />
                                    </Center>
                                    <Skeleton height={8} radius="xl" />
                                    <Skeleton height={8} mt={6} radius="xl" />
                                    <Skeleton
                                      height={8}
                                      mt={6}
                                      width="70%"
                                      radius="xl"
                                    />
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
                          surfFeed?.data
                            ?.filter(
                              (post) =>
                                post.root.metadata?.__typename ===
                                "TextOnlyMetadataV3",
                            )
                            .map((post) => (
                              <Post key={post.id} post={post.root} />
                            ))}
                        </InfiniteScroll>
                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="Video">
                      <Space h="md" />
<Group justify="right">
                        <ActionIcon
                          onClick={() => {
                          setSurfFeedUser(undefined);
                             setHandle("");
                          }}
                          variant="light"
                          
                          color="red"
                          radius="md"
                        >
                          <IconX size="1.2rem" />
                        </ActionIcon>
                      </Group>
                      <Space h="xs" />
                      {/* Hot feed content */}
                      {!surfFeed.loading && surfFeed && (
                        <InfiniteScroll
                          dataLength={surfFeed?.data?.length || 0}
                          next={() => surfFeed?.next()}
                          hasMore={surfFeed?.hasMore}
                          loader={
                            <>
                              {Array.from({ length: 10 }).map((_, i) => (
                                <>
                                  <Paper
                                    p="xs"
                                    shadow="xl"
                                    radius="md"
                                    withBorder
                                    key={i}
                                  >
                                    <Space h="md" />
                                    <Center>
                                      <Skeleton height={50} circle mb="xl" />
                                    </Center>
                                    <Skeleton height={8} radius="xl" />
                                    <Skeleton height={8} mt={6} radius="xl" />
                                    <Skeleton
                                      height={8}
                                      mt={6}
                                      width="70%"
                                      radius="xl"
                                    />
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
                          surfFeed?.data
                            ?.filter(
                              (post) =>
                                post.root.metadata?.__typename ===
                                "VideoMetadataV3",
                            )
                            .map((post) => (
                              <Post key={post.root.id} post={post.root} />
                            ))}
                        </InfiniteScroll>
                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="Audio">
                      <Space h="md" />
<Group justify="right">
                        <ActionIcon
                          onClick={() => {
                           setSurfFeedUser(undefined);
                             setHandle("");
                          }}
                          variant="light"
                          
                          color="red"
                          radius="md"
                        >
                          <IconX size="1.2rem" />
                        </ActionIcon>
                      </Group>
                      <Space h="xs" />
                      {/* Hot feed content */}
                      {!surfFeed.loading && surfFeed && (
                        <InfiniteScroll
                          dataLength={surfFeed?.data?.length || 0}
                          next={() => surfFeed?.next()}
                          hasMore={surfFeed?.hasMore}
                          loader={
                            <>
                              {Array.from({ length: 10 }).map((_, i) => (
                                <>
                                  <Paper
                                    p="xs"
                                    shadow="xl"
                                    radius="md"
                                    withBorder
                                    key={i}
                                  >
                                    <Space h="md" />
                                    <Center>
                                      <Skeleton height={50} circle mb="xl" />
                                    </Center>
                                    <Skeleton height={8} radius="xl" />
                                    <Skeleton height={8} mt={6} radius="xl" />
                                    <Skeleton
                                      height={8}
                                      mt={6}
                                      width="70%"
                                      radius="xl"
                                    />
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
                          surfFeed?.data
                            ?.filter(
                              (post) =>
                                post.root.metadata?.__typename ===
                                "AudioMetadataV3",
                            )
                            .map((post) => (
                              <Post key={post.root.id} post={post.root} />
                            ))}
                        </InfiniteScroll>
                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="Images">
                      <Space h="md" />
<Group justify="right">
                        <ActionIcon
                          onClick={() => {
                            setSurfFeedUser(undefined);
                             setHandle("");
                          }}
                          variant="light"
                         
                          color="red"
                          radius="md"
                        >
                          <IconX size="1.2rem" />
                        </ActionIcon>
                      </Group>
                      <Space h="xs" />
                      {/* Hot feed content */}
                      {!surfFeed.loading && surfFeed && (
                        <InfiniteScroll
                          dataLength={surfFeed?.data?.length || 0}
                          next={() => surfFeed?.next()}
                          hasMore={surfFeed?.hasMore}
                          loader={
                            <>
                              {Array.from({ length: 10 }).map((_, i) => (
                                <>
                                  <Paper
                                    p="xs"
                                    shadow="xl"
                                    radius="md"
                                    withBorder
                                    key={i}
                                  >
                                    <Space h="md" />
                                    <Center>
                                      <Skeleton height={50} circle mb="xl" />
                                    </Center>
                                    <Skeleton height={8} radius="xl" />
                                    <Skeleton height={8} mt={6} radius="xl" />
                                    <Skeleton
                                      height={8}
                                      mt={6}
                                      width="70%"
                                      radius="xl"
                                    />
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
                          surfFeed?.data
                            ?.filter(
                              (post) =>
                                post.root.metadata?.__typename ===
                                "ImageMetadataV3",
                            )
                            .map((post) => (
                              <Post key={post.root.id} post={post.root} />
                            ))}
                        </InfiniteScroll>
                      )}
                    </Tabs.Panel>
                  </Tabs>
                </>
              ) : checked ? (
                <>
                  <HighlightFeed />
                </>
              ) : (
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
          !followingFeed.loading && (
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
       )}
           
    </>
  );
}
