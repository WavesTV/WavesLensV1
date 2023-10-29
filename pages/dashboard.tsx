import {
    Space,
    Center,
    Text,
    Paper,
    Divider, 
    Image,
    Group,
    Avatar,
    Card,
    Button,
    Container
  } from "@mantine/core";
import { useActiveProfile, useActiveWallet } from "@lens-protocol/react-web";
import styles from "../styles/ProfileCard.module.css";
import Link from "next/link";
import { Stream } from "@/components/Stream";

export default function Dashboard() {
 const walletInfo = useActiveWallet();
const activeProfile = useActiveProfile();
 const replaceURLs = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const atSymbolRegex = /(\S*@+\S*)/g;

    return text
      .replace(urlRegex, (url: string) => `<a href="${url}" target="_blank">${url}</a>`)
      .replace(atSymbolRegex, (match: string) => ` ${match} `);
  };
    return(
        <>
        <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
            Stream Dashboard
            </Text>
          </>
        }
        labelPosition="center"
      />

<Space h="lg"/>

    {walletInfo?.data && activeProfile?.data ? (
      <>
                     <Card shadow="sm" padding="lg" radius="md" withBorder>
       <Card.Section>
        {/* @ts-ignore */}
          <Image
           // @ts-ignore
            src={activeProfile?.data?.coverPicture?.original?.url || ""}
            height={200}
            fallbackSrc="https://www.hdwallpaper.nu/wp-content/uploads/2015/07/Ocean-wave-stock-image_WEB.jpg"
          />
        </Card.Section>
        
        
    
          <Avatar
            // @ts-ignore
             src={
                    // @ts-ignore
                    activeProfile?.data?.picture?.original?.url || "/user.png"
                  }
            className={styles.avatar}
            size={80}
        radius={80}
        mx="auto"
        mt={-30}
          />
      
{/* Profile Handle */}
<Group justify="center">
          @{activeProfile?.data?.handle || "anonuser"}
        </Group>
        {/* Profile Name */}
        <Group justify="center" className={styles.profileName}>
          <Text c="dimmed" fw={500}>{activeProfile?.data?.name || "Anon User"}</Text>
        </Group>
        
      <Space h="xl"/>
      <Stream />
      <Space h="xl"/>
      <Center>
        <Text
        
            fz="sm"
            style={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              
            }}
             dangerouslySetInnerHTML={{
              __html:
              activeProfile && activeProfile.data && activeProfile.data.bio 
                  ? replaceURLs(activeProfile.data.bio.replace(/\n/g, "<br> "))
                  : "",
            }}
          />
          </Center>
      <Space h="xl"/>
      <Group justify="center">

      
      <Text fw={500} fz="sm">
          {activeProfile?.data?.stats.totalFollowers} {" Followers"}
        </Text>
    |
          <Text fw={500} fz="sm">
           {activeProfile?.data?.stats.totalFollowing}{" Following"}
        </Text>
        </Group>

        <Space h="md"/>
        </Card>

         <Space h="xl"/>


        </>
                ) : (
                   <Card shadow="sm" padding="lg" radius="md" withBorder>
       <Card.Section>
        {/* @ts-ignore */}
          <Image
           // @ts-ignore
            src={activeProfile?.data?.coverPicture?.original?.url || ""}
            height={200}
            fallbackSrc="https://www.hdwallpaper.nu/wp-content/uploads/2015/07/Ocean-wave-stock-image_WEB.jpg"
          />
        </Card.Section>
        
        
    
          <Avatar
            // @ts-ignore
             src={
                    // @ts-ignore
                    activeProfile?.data?.picture?.original?.url || "/user.png"
                  }
            className={styles.avatar}
            size={80}
        radius={80}
        mx="auto"
        mt={-30}
          />
      {/* Profile Name */}
        <Group justify="center" className={styles.profileName}>
          <Text fw={500}>{activeProfile?.data?.name || "Anon User"}</Text>
        </Group>
{/* Profile Handle */}
<Group justify="center">
          @{activeProfile?.data?.handle || "anonuser"}
        </Group>
        
        
<Space h="md"/>
     
      
      <Group justify="center">

      
      <Text fw={500} fz="sm">
          1 {" Followers"}
        </Text>
       |
          <Text fw={500} fz="sm">
          1 {" Following"}
        </Text>
        </Group>

        <Space h="md"/>
        <Container size="md">
      
        <Button component={Link} href="/login">
            Sign In to Stream
        </Button>
        
        </Container>
        </Card>

                )}

</>
    )
}