import {
  ProfileId,
  useDismissRecommendedProfiles,
  useRecommendedProfiles,
  useSession,
  LimitType
} from '@lens-protocol/react-web';
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
  Paper,
  UnstyledButton,
  Avatar,
  Skeleton,
  HoverCard
} from "@mantine/core";
import classes from "../styles/RecommendedWaves.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRouter } from "next/router";

export function RecommendedWaves({ profileId }: { profileId: ProfileId }) {
const { data: session } = useSession();
const { data, loading, error } = useRecommendedProfiles({ for: 
    // @ts-ignore
    session?.profile?.id,
    limit: LimitType.Ten });

const { execute: dismiss, loading: dismissing } = useDismissRecommendedProfiles();
 const router = useRouter();
    
    return(
        <>
        {loading && 
           Array.from({ length: 5 }).map((_, i) => (
                        <>
                          <UnstyledButton
                
                className={classes.user}
              >
                          <Group>
                  <Skeleton height={38} circle />

                  <div style={{ flex: 1 }}>
                   <Skeleton height={8} mt={6} radius="xl" width="50%" />
                            <Skeleton
                              height={8}
                              mt={6}
                              width="30%"
                              radius="xl"
                            />
                  </div>

                 
                </Group>
                    </UnstyledButton>       
                       
                        
                        </>
        ))}

    {data && data.length > 0 && (
        <>
      
 {data.slice(0, 5).map((user: any) => (
     <HoverCard
     key={user?.id}
          width={320}
          shadow="md"
          withArrow
          
        >
          
              <Group >
                 <UnstyledButton
                   onClick={() => router.push(`/wave/${user.handle?.localName}`)}
                className={classes.user}
              >
                
                <Group>
                    <HoverCard.Target>
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
</HoverCard.Target>
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {user.metadata?.displayName || user.handle?.localName}
                    </Text>

                    <Text c="dimmed" size="xs">
                      @{user.handle?.localName}
                    </Text>
                  </div>

                  <Group justify="right">
                <ActionIcon onClick={(event) => {
    event.stopPropagation();
    dismiss({ profileIds: [user.id] });
  }}  disabled={loading} loading={loading} size="sm" variant="default" >
      <IconX size=".88rem"/>
    </ActionIcon>
                </Group>
                </Group>
                 
              </UnstyledButton>
              
              </Group>
             

               <HoverCard.Dropdown>
              <Group>
                <Avatar
                  // @ts-ignore
                  src={
                    user.metadata?.picture &&
                    "optimized" in user.metadata?.picture
                      ? user.metadata.picture.optimized?.uri
                      : "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                  }
                  alt={`${user.handle?.localName}'s profile picture`}
                  size="lg"
                />

                <div style={{ flex: 1 }}>
                  <Text size="md" fw={500}>
                    {user.metadata.displayName ||
                      user.handle?.localName}
                  </Text>

                  <Text c="dimmed" size="sm">
                    @{user.handle?.localName}
                  </Text>
                </div>
              </Group>
              <Space h="md" />
              <Text lineClamp={3} fw={200}>
                {
                  // @ts-ignore
                  user.metadata?.bio || null
                }
              </Text>
              <Space h="md" />
              <Group justify="center">
                <Text fw={500} size="sm">
                  {
                    // @ts-ignore
                    user.stats.followers || "0"
                  }{" "}
                  Followers
                </Text>
                |
                <Text fw={500} size="sm">
                  {
                    // @ts-ignore
                    user.stats.following || "0"
                  }{" "}
                  Following
                </Text>
              </Group>
            </HoverCard.Dropdown>
          
        </HoverCard>
            ))}
 
        </>
    )}
        </>
    )
}