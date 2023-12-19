import {
  useProfile,
  useProfileFollowing,
  ProfileId,
} from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Group,
  Avatar,
  Text,
  UnstyledButton,
  Skeleton,
  Space,
} from "@mantine/core";
import classes from "../styles/RecommendedWaves.module.css";

interface ViewFollowingProps {
  profileId: any; 
  closeFollowing: () => void; 
}

export function ViewFollowing({
  profileId,
  closeFollowing,
}: ViewFollowingProps) {
  const following = useProfileFollowing({ for: profileId });

  const router = useRouter();
  return (
    <>
      {following?.loading && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <>
              <Group>
                <Skeleton height={50} circle mb="xl" />

                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </Text>

                  <Text c="dimmed" size="xs">
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </Text>
                </div>
              </Group>
            </>
          ))}
        </>
      )}

      {!following?.loading && following?.data && (
        <InfiniteScroll
          dataLength={following?.data?.length || 0}
          next={() => following?.next()}
          hasMore={following?.hasMore}
          className="mt-4"
          loader={
            <>
              <Group>
                <Skeleton height={50} circle mb="xl" />

                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </Text>

                  <Text c="dimmed" size="xs">
                    <Skeleton height={8} mt={6} width="70%" radius="xl" />
                  </Text>
                </div>
              </Group>
            </>
          }
        >
          {following?.data?.map((user, key) => (
            <div
              className="flex flex-row items-center justify-between w-full my-2"
              key={key}
            >
              <UnstyledButton
                onClick={() => {
                  router.push(`/profile/${user.handle?.localName}`);
                  closeFollowing();
                }}
                className={classes.user}
              >
                <Group>
                  <Avatar
                    alt={`${user.handle?.localName}'s profile picture`}
                    // @ts-ignore, image is there
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
            </div>
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
