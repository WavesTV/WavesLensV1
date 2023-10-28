
import Post from "@/components/Post";
import {
  Post as PostType,
  useProfile,
  ProfileId,
  useActiveProfile,
  usePublications,
  PublicationTypes,
} from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import FollowButton from "@/components/FollowButton";
import { Center, Space, Button, Card, Group, Avatar, Text, Loader, Image, Container, Paper,ActionIcon  } from "@mantine/core";
import styles from "../../styles/ProfileCard.module.css";
import { Player } from '@livepeer/react';

const ProfilePage = () => {
  // Get the post ID from the URL
  const router = useRouter();
  const { handle } = router.query;

 

  const activeProfile = useActiveProfile();

  const profile = useProfile({
    handle: handle as string,
  });

  const publications = usePublications({
    profileId: profile?.data?.id as ProfileId,
    limit: 25,
    publicationTypes: [PublicationTypes.Post],
    observerId: activeProfile?.data?.id as ProfileId,
  });

  if (profile?.error) {
    return (
     <>
      <Container>
 <Paper shadow="xl" radius="md" withBorder p="xl">
        <Center>
          <h1>
            Profile not found
          </h1>
          <Space h="lg"/>
          </Center>
          <Center>
          <Button onClick={() => router.push("/")}>
            Back Home
          </Button>
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
      .replace(urlRegex, (url: string) => `<a href="${url}" target="_blank">${url}</a>`)
      .replace(atSymbolRegex, (match: string) => ` ${match} `);
  };

  return (
    <>
    <Container size="responsive">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
       <Card.Section>
        {/* @ts-ignore */}
          <Image
           // @ts-ignore
                       alt={`${profile?.data?.handle}'s cover photo`}
            // @ts-ignore, image is there
            src={profile?.data?.coverPicture?.original?.url}
            height={200}
            fallbackSrc="https://www.hdwallpaper.nu/wp-content/uploads/2015/07/Ocean-wave-stock-image_WEB.jpg"
          />
        </Card.Section>
        
        
    
          <Avatar
              alt={`${profile?.data?.handle}'s profile picture`}
            // @ts-ignore, image is there
            src={profile?.data?.picture?.original?.url || "/user.png"}
            className={styles.avatar}
            size={80}
        radius={80}
        mx="auto"
        mt={-30}
          />
      


        {/* Profile Name */}
        <Group justify="center" className={styles.profileName}>
          <Text fw={500}>{profile?.data?.name}</Text>
        </Group>

        {/* Profile Handle */}
        <Group justify="center">
          @{profile?.data?.handle}
        </Group>
    
      <Space h="xl"/>
      {"titannode.lens" === profile?.data?.handle ? (
  <Paper>
    <Space h="xl" />
    <Player playbackId="4f33lcebx1uac9tb" title="Titan Node Stream" />
  </Paper>
) : null}
<Space h="xl"/>
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
              profile && profile.data && profile.data.bio 
                  ? replaceURLs(profile.data.bio.replace(/\n/g, "<br> "))
                  : "",
            }}
          />
          </Paper>
      <Space h="xl"/>
      <Group justify="center">

      
      <Text fw={500} fz="sm">
          {profile?.data?.stats.totalFollowers}{" Followers"}
        </Text>
       |
          <Text fw={500} fz="sm">
           {profile?.data?.stats.totalFollowing}{" Following"}
        </Text>
        </Group>

        <Space h="md"/>
        {profile.data && activeProfile.data && (
              <FollowButton
                followee={profile.data}
                follower={activeProfile.data}
              />
            )}
           
        </Card>
        </Container>
<Space h="xl"/>
      <Container>

          {/* Loading */}
          {publications?.loading && (
          
              <></>
            )}
          {/* Loaded */}
          {!publications?.loading && publications?.data && (
            <InfiniteScroll
              dataLength={publications?.data?.length || 0}
              next={() => publications?.next()}
              hasMore={publications?.hasMore}
              className="mt-4"
              loader={
                <>
               
                  
                </>
              }
            >
              {
                // @ts-ignore post type
                publications?.data?.map((post: PostType) => (
                  <Post
                    key={post.id}
                    post={post}
                    activeProfile={activeProfile.data!}
                  />
                ))}
            </InfiniteScroll>
          )}
     
      </Container>
    </>
  );
};

export default ProfilePage;
