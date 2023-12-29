import {
  Notification,
  ActedNotification,
  CommentNotification,
  FollowNotification,
  MentionNotification,
  MirrorNotification,
  QuoteNotification,
  ReactionNotification,
} from "@lens-protocol/react-web";
import { ReactNode } from "react";
import {
  Space,
  Tabs,
  rem,
  Text,
  Loader,
  Group,
  Center,
  Button,
  HoverCard,
  Avatar,
  Paper,
  UnstyledButton,
} from "@mantine/core";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TfiComments } from "react-icons/tfi";
import { useRouter } from "next/router";
import formatDate from "@/lib/formatDate";
import { IconHeartFilled, IconHeartBroken } from "@tabler/icons-react";
import { FaHeartCirclePlus } from "react-icons/fa6";
import classes from "./../styles/RecommendedWaves.module.css";
import Post from "@/components/Post";
import { PiUsersThreeFill } from "react-icons/pi";

function NotificationItemWrapper({ children }: { children: ReactNode }) {
  return <article>{children}</article>;
}

function NewActedNotification({
  notification,
}: {
  notification: ActedNotification;
}) {
  return (
    <NotificationItemWrapper>
      <Paper shadow="xl" radius="md" withBorder p="lg">
        Publication {notification.publication.id} acted by{" "}
        {notification.actions.map((action) => action.by.handle).join(", ")}
      </Paper>
    </NotificationItemWrapper>
  );
}

export function NewCommentNotification({
  notification,
}: {
  notification: CommentNotification;
}) {
  const router = useRouter();
  return (
    <NotificationItemWrapper>
      <Center>
        <UnstyledButton
          onClick={() =>
            router.push(`/post/${notification.comment.commentOn.id}`)
          }
        >
          <Paper shadow="xl" radius="md" withBorder p="lg">
            <Group justify="right">
              <Text c="dimmed" size="xs" fw={500}>
                {formatDate(notification.comment.createdAt)} ago
              </Text>
            </Group>

            <Group preventGrowOverflow={false} wrap="nowrap">
              <Avatar
                size={46}
                radius="md"
                // @ts-ignore
                src={notification.comment.by.metadata?.picture?.optimized?.uri || "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"}
              />
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {notification.comment.by.metadata?.displayName ??
                    notification.comment.by.handle?.localName}
                </Text>

                <Text c="dimmed" size="xs">
                  @
                  {notification.comment.by.handle?.localName ??
                    notification.comment.by.id}
                </Text>
              </div>

              <Group>
                <TfiComments size="1.5rem" />
                <Text fw={500} size="sm">
                  Commented
                </Text>

                <Text size="md" fs="italic">
                  {/* @ts-ignore */}
                  {notification.comment.metadata.content}
                </Text>

                <Text fw={500} size="sm">
                  On
                </Text>

                <Text size="md" fs="italic">
                  {/* @ts-ignore */}
                  {notification.comment.commentOn?.metadata.content}
                </Text>
              </Group>
            </Group>
          </Paper>
        </UnstyledButton>
      </Center>
      <Space h="sm" />
    </NotificationItemWrapper>
  );
}

function NewReactionNotification({
  notification,
}: {
  notification: ReactionNotification;
}) {
  const router = useRouter();
  return (
    <NotificationItemWrapper>
      {notification.reactions.map((reaction, index) => (
        <>
          <div key={index}>
            <Center>
              <Paper shadow="xl" radius="md" withBorder p="lg">
                <Group justify="right">
                  <Text c="dimmed" size="xs" fw={500}>
                    {formatDate(reaction.reactions[0].reactedAt)} ago
                  </Text>
                </Group>

                <Group justify="center">
                  <UnstyledButton
                    onClick={() =>
                      router.push(
                        `/wave/${reaction.profile.handle?.localName}`,
                      )
                    }
                  >
                    <Group>
                      <Avatar
                        size={46}
                        radius="md"
                        // @ts-ignore
                        src={reaction.profile.metadata?.picture?.optimized?.uri || "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"}
                      />

                      <div style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                          {reaction.profile.metadata?.displayName ??
                            reaction.profile.handle?.localName}
                        </Text>

                        <Text c="dimmed" size="xs">
                          {`@${reaction.profile.handle?.localName}`}
                        </Text>
                      </div>
                    </Group>
                  </UnstyledButton>

                  <Space w="xl" />

                  {reaction.reactions[0].reaction === "UPVOTE" && (
                    <>
                      <IconHeartFilled size="1.5rem" />
                      <Text fw={500} size="sm">
                        Liked
                      </Text>
                    </>
                  )}

                  {reaction.reactions[0].reaction === "DOWNVOTE" && (
                    <>
                      <IconHeartBroken size="1.5rem" />
                      <Text fw={500} size="sm">
                        Dislike
                      </Text>
                    </>
                  )}
                </Group>
                <Space h="md" />
                <Post
                  key={notification.publication.id}
                  post={notification.publication}
                />
              </Paper>
            </Center>
          </div>
          <Space h="sm" />
        </>
      ))}
     
    </NotificationItemWrapper>
  );
}

function NewFollowNotification({
  notification,
}: {
  notification: FollowNotification;
}) {
  const router = useRouter();

  return (
    <NotificationItemWrapper>
      <Center>
<Paper shadow="xl" radius="md" withBorder p="lg">
        <Group justify="center"> 
      <Text fw={500} size="md">Followed You</Text>
      <PiUsersThreeFill  size="1.5rem" />
        </Group>

    <Space h="xs"/>

       <Group mr={11}>
       <Avatar.Group>
       
            {notification.followers.slice(0, 7).map((profile) => (
              <>
       
          <HoverCard
          width={320}
          shadow="md"
          withArrow
          openDelay={200}
          closeDelay={400}
          zIndex={99999999}
        >  
  <HoverCard.Target >
  <UnstyledButton
    onClick={() =>
       router.push(`/wave/${profile.handle?.localName}`)
    }
  >
              <div key={profile.id}>
                <Avatar 
                  src={// @ts-ignore
                    profile.metadata?.picture?.optimized?.uri || 
                    "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"} 
                  />
                </div>
      </UnstyledButton>
      </HoverCard.Target>
                
      <HoverCard.Dropdown >
              <Group>
                <Avatar
                  // @ts-ignore
                   src={// @ts-ignore
                    profile.metadata?.picture?.optimized?.uri || 
                    "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"} 
                  alt={`${profile.handle?.localName}'s profile picture`}
                  size="lg"
                />

                <div style={{ flex: 1 }}>
                  <Text size="md" fw={500}>
                    {profile.metadata?.displayName ||
                      profile.handle?.localName}
                  </Text>

                  <Text c="dimmed" size="sm">
                    @{profile.handle?.localName}
                  </Text>
                </div>
              </Group>
              <Space h="md" />
              <Text lineClamp={3} fw={200}>
                {
                  // @ts-ignore
                  profile.metadata?.bio || null
                }
              </Text>
               <Space h="md" />
              <Group justify="center">
                <Text fw={500} size="sm">
                  {
                    // @ts-ignore
                    profile.stats.followers || "0"
                  }{" "}
                  Followers
                </Text>
                |
                <Text fw={500} size="sm">
                  {
                    // @ts-ignore
                    profile.stats.following || "0"
                  }{" "}
                  Following
                </Text>
              </Group>
              
            </HoverCard.Dropdown>
        </HoverCard>    
     
      </>
                ))}

                {notification.followers.length > 7 && (
                <Avatar>+{notification.followers.length - 7}</Avatar>
              )}
            
          </Avatar.Group>
          </Group>
    </Paper>
    </Center>
    <Space h="sm" />
    </NotificationItemWrapper>
  );
}

function NewMentionNotification({
  notification,
}: {
  notification: MentionNotification;
}) {
  return (
    <NotificationItemWrapper>
      <Paper shadow="xl" radius="md" withBorder p="lg">
        Mentioned &quot;{notification.publication.id}&quot; by{" "}
        {notification.publication.by.handle?.localName ??
          notification.publication.by.id}
      </Paper>
      <Space h="sm" />
    </NotificationItemWrapper>
  );
}

function NewMirrorNotification({
  notification,
}: {
  notification: MirrorNotification;
}) {
  return (
    <NotificationItemWrapper>
      <p>New mirror on {notification.publication.id}</p>
      <Space h="sm" />
    </NotificationItemWrapper>
  );
}

function NewQuoteNotification({
  notification,
}: {
  notification: QuoteNotification;
}) {
  return (
    <NotificationItemWrapper>
      <p>New quote {notification.quote.id}</p>
      <Space h="sm" />
    </NotificationItemWrapper>
  );
}

type NotificationItemProps = {
  notification: Notification;
};

export function NotificationTypes({ notification }: NotificationItemProps) {
  switch (notification.__typename) {
    case "ActedNotification":
      return <NewActedNotification notification={notification} />;
    case "CommentNotification":
      return <NewCommentNotification notification={notification} />;
    case "FollowNotification":
      return <NewFollowNotification notification={notification} />;
    case "MentionNotification":
      return <NewMentionNotification notification={notification} />;
    case "MirrorNotification":
      return <NewMirrorNotification notification={notification} />;
    case "QuoteNotification":
      return <NewQuoteNotification notification={notification} />;
    case "ReactionNotification":
      return <NewReactionNotification notification={notification} />;
  }
}
