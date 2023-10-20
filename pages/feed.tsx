import type { NextPage } from "next";
import {
  PublicationTypes,
  useActiveProfile,
  useExplorePublications,
  Post as PostType,
  PublicationSortCriteria,
  useFeed,
  FeedEventItemType,
  useActiveWallet
} from "@lens-protocol/react-web";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "../components/ui/skeleton";
import Post from "@/components/Post";
import { useState } from "react";
import { BsFire } from "react-icons/bs";
import { GiWaveCrest } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { Container, Space, Tabs, rem, Text, Loader, Group, Center } from "@mantine/core";
import classes from "../styles/Tabs.module.css";
import SignInWithLensButton from "@/components/SignInWithLensButton";
import Link from "next/link";
import Login from "./login";

const Feed: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const activeProfile = useActiveProfile();
 const walletInfo = useActiveWallet();

  const publicFeed = useExplorePublications({
    limit: 25,
    publicationTypes: [PublicationTypes.Post],
    sortCriteria: PublicationSortCriteria.TopCollected,
  });

  console.log(publicFeed.data)
  const personalizedFeed = useFeed({
    // @ts-ignore: TODO, non-signed in state
    profileId: activeProfile?.data?.id,
    limit: 25,
    restrictEventTypesTo: [FeedEventItemType.Post],
  });

  return (
    <>
      <Tabs variant="unstyled" defaultValue="first" classNames={classes}>
    
      <Tabs.List grow>
        <Tabs.Tab
        value="first"
         leftSection={<BsFire style={{ width: rem(16), height: rem(16) }} />}
        >
          
            <Text fz="sm">Hot</Text>
        </Tabs.Tab>
        <Tabs.Tab
        value="second"
         leftSection={<GiWaveCrest style={{ width: rem(16), height: rem(16) }} />}
        >
     
            <Text fz="sm">Waves</Text>
        </Tabs.Tab>
        <Tabs.Tab
        value="third"
        leftSection={<FaUsers style={{ width: rem(16), height: rem(16) }} />}
        >
          
            <Text fz="sm">Following</Text>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="first"> <Space h="xl"/>

      

    {/* Public feed loading */}
            {
              publicFeed?.loading &&
              <Group justify="center">
              <Loader color="blue" />
              </Group>
              }

            {/* Public feed has loaded */}
            {!publicFeed?.loading && publicFeed?.data && (
              <InfiniteScroll
                dataLength={publicFeed?.data?.length || 0}
                next={() => publicFeed?.next()}
                hasMore={publicFeed?.hasMore}
                loader={
                  <>
                   
          <Loader color="blue" />
                    
                  </>
                }
                endMessage={
                   <Space h={100}/>
                }
              >
                {
                  // @ts-ignore post type
                  publicFeed?.data?.map((post: PostType) => (
                    <Post
                      key={post.id}
                      post={post}
                      activeProfile={activeProfile.data!}
                    />
                  ))}
              </InfiniteScroll>
            )}</Tabs.Panel>
    <Tabs.Panel value="second"><Space h="xl"/> <Center><Text>Coming Soon</Text></Center><Space h={100}/></Tabs.Panel>
    <Tabs.Panel value="third"> 
    <Space h="xl"/>   {/* Public feed loading */}

      {/* Wallet connected, but no Lens profile */}
           {walletInfo?.data && !activeProfile?.data &&
             (
                 <></>
              )}

            {personalizedFeed?.loading &&
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton
                  className="h-[88px] animate-pulse bg-muted mt-3 w-full"
                  key={i}
                />
              ))}

            {/* Public feed has loaded */}
            {!personalizedFeed?.loading && personalizedFeed?.data && (
              <InfiniteScroll
                dataLength={personalizedFeed?.data?.length || 0}
                next={() => personalizedFeed?.next()}
                hasMore={personalizedFeed?.hasMore}
                loader={
                  <>
                    
                     
              
         
                  
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
    </Tabs>
    
    
    </>
  );
};

export default Feed;
