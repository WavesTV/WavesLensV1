import type { NextPage } from "next";
import {
  PublicationTypes,
  useActiveProfile,
  useExplorePublications,
  Post as PostType,
  PublicationSortCriteria,
  useFeed,
  FeedEventItemType,
  useActiveWallet,
  appId
} from "@lens-protocol/react-web";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "@/components/Post";
import { useState } from "react";
import { BsFire } from "react-icons/bs";
import { GiWaveCrest } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { Container, Space, Tabs, rem, Text, Loader, Group, Center, Button, ActionIcon, Avatar, Paper } from "@mantine/core";
import classes from "../styles/Tabs.module.css";
import { useRouter } from "next/router";
import { Player } from '@livepeer/react';

const Feed: NextPage = () => {
  const router = useRouter();
  const activeProfile = useActiveProfile();
  const walletInfo = useActiveWallet();

  const hotFeed = useExplorePublications({
    limit: 25,
    publicationTypes: [PublicationTypes.Post],
    sortCriteria: PublicationSortCriteria.TopCommented,
    sources: [appId('hey')], 
  });

  const wavesFeed = useExplorePublications({
    sources: [appId('waves')], 
    limit: 25,
    publicationTypes: [PublicationTypes.Post],
    sortCriteria: PublicationSortCriteria.Latest,
    
  });
  
  const personalizedFeed = useFeed({
    // @ts-ignore: TODO, non-signed in state
    profileId: activeProfile?.data?.id,
    limit: 25,
    restrictEventTypesTo: [FeedEventItemType.Post],
  });
console.log(personalizedFeed.data)
  return (
    <>
      <Tabs variant="unstyled" defaultValue="first" classNames={classes}>
    
      <Tabs.List grow>
        <Tabs.Tab
        value="first"
         leftSection={<GiWaveCrest style={{ width: rem(16), height: rem(16) }} />}
        >
          
            <Text fz="sm">Waves</Text>
        </Tabs.Tab>
        
        <Tabs.Tab
        value="second"
        leftSection={<FaUsers style={{ width: rem(16), height: rem(16) }} />}
        >
          
            <Text fz="sm">Following</Text>
        </Tabs.Tab>

          <Tabs.Tab
          value="third"
          leftSection={<BsFire style={{ width: rem(16), height: rem(16) }} />}
        >
          
            <Text fz="sm">Hot</Text>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first"> <Space h="xl"/>

      

    {/* Public feed loading */}
            {
              wavesFeed?.loading &&
              <Group justify="center">
              <Loader color="blue" />
              </Group>
              }

            {/* Public feed has loaded */}
            {!wavesFeed?.loading && wavesFeed?.data && (
              <>
               <Paper
              m="md"
              shadow="lg"
              radius="md"
              p="xl"
              withBorder
            >
              <Center>
                <ActionIcon
                  onClick={() => router.push('/profile/titannode.lens')} 
                  variant="transparent"
                >
                  <Avatar
                    radius="xl"
                    size="lg"
                   src="https://ik.imagekit.io/lens/media-snapshot/4a06ebbbd900102ba392ff8f63f4b1562ccf999a865ebc7bf8b26efdfcb14532.png"
                  />
                  <Space w="xs" />
                  <Text fw={600} size="sm">
                    Titan Node
                  </Text>
                </ActionIcon>
              </Center>
              <Space h="xl" />
              <Player
             style={{ width: '100%' }}
                playbackId="4f33lcebx1uac9tb"
                title="Titan Node Stream"
                
              />
            </Paper>

              <InfiniteScroll
                dataLength={wavesFeed?.data?.length || 0}
                next={() => wavesFeed?.next()}
                hasMore={wavesFeed?.hasMore}
                loader={
                  <>
                   
          <Group justify="center">
              <Loader color="blue" />
              </Group>
                    
                  </>
                }
                endMessage={
                   <Space h={100}/>
                }
              >
                {
                  // @ts-ignore post type
                  wavesFeed?.data?.map((post: PostType) => (
                    <Post
                      key={post.id}
                      post={post}
                      activeProfile={activeProfile.data!}
                    />
                  ))}
              </InfiniteScroll>
              </>
            )}</Tabs.Panel>
    
    <Tabs.Panel value="second"> 
    <Space h="xl"/>   
    {/* Public feed loading */}

      {/* Wallet connected, but no Lens profile */}
           {!walletInfo?.data && !activeProfile?.data &&
             (
                 <>
                 <Center>
                  <Button onClick={() => router.push('/login')}>Sign In To View</Button>
                 </Center>
                 
                 </>
              )}

            {personalizedFeed?.loading &&
            
                <Group justify="center">
              <Loader color="blue" />
              </Group>
              }

            {/* Public feed has loaded */}
            {!personalizedFeed?.loading && personalizedFeed?.data && (
              <InfiniteScroll
                dataLength={personalizedFeed?.data?.length || 0}
                next={() => personalizedFeed?.next()}
                hasMore={personalizedFeed?.hasMore}
                loader={
                  <>                   
                <Group justify="center">
              <Loader color="blue" />
              </Group> 
                  </>
                }
                endMessage={
                  <Space h={100}/>
                }
              >
                {activeProfile.data &&
                  personalizedFeed?.data?.map((post) => (
                    <Post
                      key={post.root.id}
                      post={post.root}
                      activeProfile={activeProfile.data!}
                    />
                  ))}
              </InfiniteScroll>
            )}<Space h={100}/>
        </Tabs.Panel>

        <Tabs.Panel value="third">
          <Space h="xl"/>

      

    {/* Public feed loading */}
            {
              hotFeed?.loading &&
              <Group justify="center">
              <Loader color="blue" />
              </Group>
              }

            {/* Public feed has loaded */}
            {!hotFeed?.loading && hotFeed?.data && (
              <InfiniteScroll
                dataLength={hotFeed?.data?.length || 0}
                next={() => hotFeed?.next()}
                hasMore={hotFeed?.hasMore}
                loader={
                  <>
                   
          <Group justify="center">
              <Loader color="blue" />
              </Group>
                    
                  </>
                }
                endMessage={
                   <Space h={100}/>
                }
              >
                {
                  // @ts-ignore post type
                  hotFeed?.data?.map((post: PostType) => (
                    <Post
                      key={post.id}
                      post={post}
                      activeProfile={activeProfile.data!}
                    />
                  ))}
              </InfiniteScroll>
            )}            
        </Tabs.Panel>
    </Tabs>
    
    
    </>
  );
};

export default Feed;
