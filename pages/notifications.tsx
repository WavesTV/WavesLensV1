import {
  Space,
  Center,
  Text,
  Paper,
  Divider,
  Container,
  Button,
  Loader,
  Group,
  Tabs,
  rem,
  ActionIcon,
} from "@mantine/core";
import {
  useSession,
  useNotifications,
  CommentNotification,
} from "@lens-protocol/react-web";
import InfiniteScroll from "react-infinite-scroll-component";
import { NotificationTypes } from "@/components/NotificationType";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import { TfiComments } from "react-icons/tfi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import {
  IconCheck,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconMessageShare,
  IconScriptMinus,
  IconScriptPlus,
  IconStack3,
  IconAt,
} from "@tabler/icons-react";
import { GiWaveCrest } from "react-icons/gi";
import { RxReload } from "react-icons/rx";

export default function Notifications() {
  const session = useSession();
  const router = useRouter();
  const allNotifications = useNotifications();
 
  const iconStyle = { width: rem(18), height: rem(18) };
  const [activeTab, setActiveTab] = useState<string | null>("All");

  if (
    allNotifications.data === undefined &&
    session?.data?.type === "WITH_PROFILE"
  ) {
    return (
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
        <Text ta="center" size="md" fw={333} fs="italic">
          Please Refresh
        </Text>
        <Space h="md" />
      </>
    );
  }

  return (
    <>
      <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
              Notifications
            </Text>
          </>
        }
        labelPosition="center"
      />

      <Space h="lg" />
      <Container>
        {session?.data?.type === "WITH_PROFILE" ? (
          <>
            <Tabs
              variant="pills"
              radius="xl"
              value={activeTab}
              onChange={setActiveTab}
            >
              <Tabs.List justify="center">
                <Tabs.Tab
                  value="All"
                  leftSection={<MdNotificationsNone style={iconStyle} />}
                >
                  All
                </Tabs.Tab>
                <Tabs.Tab
                  value="Follows"
                  leftSection={<AiOutlineUsergroupAdd style={iconStyle} />}
                ></Tabs.Tab>
                <Tabs.Tab
                  value="Mentions"
                  leftSection={<IconAt style={iconStyle} />}
                ></Tabs.Tab>
                <Tabs.Tab
                  value="Reactions"
                  leftSection={<IconHeart style={iconStyle} />}
                ></Tabs.Tab>
                <Tabs.Tab
                  value="Comments"
                  leftSection={<IconMessageCircle style={iconStyle} />}
                ></Tabs.Tab>
                <Tabs.Tab
                  value="Quotes"
                  leftSection={<TfiComments style={iconStyle} />}
                ></Tabs.Tab>
              </Tabs.List>

              <Space h="md" />

              <Tabs.Panel value="All">
                {allNotifications.loading && (
                  <Group justify="center">
                    <Loader color="blue" />
                  </Group>
                )}

                {!allNotifications.loading && allNotifications && (
                  <InfiniteScroll
                    dataLength={allNotifications?.data?.length || 0}
                    next={() => allNotifications.next()}
                    hasMore={allNotifications.hasMore}
                    loader={
                      <>
                        <Group justify="center">
                          <Loader color="blue" />
                        </Group>
                      </>
                    }
                    endMessage={<Space h={100} />}
                  >
                    <div>
                      {allNotifications?.data?.map((item) => (
                        <NotificationTypes key={item.id} notification={item} />
                      ))}
                    </div>
                  </InfiniteScroll>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="Follows">
                {allNotifications.loading && (
                  <Group justify="center">
                    <Loader color="blue" />
                  </Group>
                )}

                {!allNotifications.loading && allNotifications && (
                  <InfiniteScroll
                    dataLength={allNotifications?.data?.length || 0}
                    next={() => allNotifications.next()}
                    hasMore={allNotifications.hasMore}
                    loader={
                      <>
                        <Group justify="center">
                          <Loader color="blue" />
                        </Group>
                      </>
                    }
                    endMessage={<Space h={100} />}
                  >
                    <div>
                      {allNotifications?.data
                        ?.filter(
                          (item) => item.__typename === "FollowNotification",
                        )
                        .map((item) => (
                          <NotificationTypes
                            key={item.id}
                            notification={item}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="Mentions">
                {allNotifications.loading && (
                  <Group justify="center">
                    <Loader color="blue" />
                  </Group>
                )}

                {!allNotifications.loading && allNotifications && (
                  <InfiniteScroll
                    dataLength={allNotifications?.data?.length || 0}
                    next={() => allNotifications.next()}
                    hasMore={allNotifications.hasMore}
                    loader={
                      <>
                        <Group justify="center">
                          <Loader color="blue" />
                        </Group>
                      </>
                    }
                    endMessage={<Space h={100} />}
                  >
                    <div>
                      {allNotifications?.data
                        ?.filter(
                          (item) => item.__typename === "MentionNotification",
                        )
                        .map((item) => (
                          <NotificationTypes
                            key={item.id}
                            notification={item}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="Reactions">
                {allNotifications.loading && (
                  <Group justify="center">
                    <Loader color="blue" />
                  </Group>
                )}

                {!allNotifications.loading && allNotifications && (
                  <InfiniteScroll
                    dataLength={allNotifications?.data?.length || 0}
                    next={() => allNotifications.next()}
                    hasMore={allNotifications.hasMore}
                    loader={
                      <>
                        <Group justify="center">
                          <Loader color="blue" />
                        </Group>
                      </>
                    }
                    endMessage={<Space h={100} />}
                  >
                    <div>
                      {allNotifications?.data
                        ?.filter(
                          (item) => item.__typename === "ReactionNotification",
                        )
                        .map((item) => (
                          <NotificationTypes
                            key={item.id}
                            notification={item}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="Comments">
                {allNotifications.loading && (
                  <Group justify="center">
                    <Loader color="blue" />
                  </Group>
                )}

                {!allNotifications.loading && allNotifications && (
                  <InfiniteScroll
                    dataLength={allNotifications?.data?.length || 0}
                    next={() => allNotifications.next()}
                    hasMore={allNotifications.hasMore}
                    loader={
                      <>
                        <Group justify="center">
                          <Loader color="blue" />
                        </Group>
                      </>
                    }
                    endMessage={<Space h={100} />}
                  >
                    <div>
                      {allNotifications?.data
                        ?.filter(
                          (item) => item.__typename === "CommentNotification",
                        )
                        .map((item) => (
                          <NotificationTypes
                            key={item.id}
                            notification={item}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="Quotes">
                {allNotifications.loading && (
                  <Group justify="center">
                    <Loader color="blue" />
                  </Group>
                )}

                {!allNotifications.loading && allNotifications && (
                  <InfiniteScroll
                    dataLength={allNotifications?.data?.length || 0}
                    next={() => allNotifications.next()}
                    hasMore={allNotifications.hasMore}
                    loader={
                      <>
                        <Group justify="center">
                          <Loader color="blue" />
                        </Group>
                      </>
                    }
                    endMessage={<Space h={100} />}
                  >
                    <div>
                      {allNotifications?.data
                        ?.filter(
                          (item) => item.__typename === "QuoteNotification",
                        )
                        .map((item) => (
                          <NotificationTypes
                            key={item.id}
                            notification={item}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                )}
              </Tabs.Panel>
            </Tabs>
          </>
        ) : (
          <>
            <Container size="30rem" px={0}>
              <Paper shadow="xl" p="lg" withBorder>
                <Center>
                  <Text size="md" fw={400}>
                    Sign In to view your Notifications.
                  </Text>
                </Center>
                <Space h="md" />

                <Button
                  fullWidth
                  leftSection={<GiWaveCrest size="1rem" />}
                  variant="gradient"
                  gradient={{ from: "cyan", to: "indigo" }}
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Button>
              </Paper>
            </Container>
          </>
        )}
      </Container>
    </>
  );
}
