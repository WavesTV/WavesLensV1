import type { NextPage } from "next";
import {
  useActiveProfile,
  useActiveWallet,
} from "@lens-protocol/react-web";
import Feed from "./feed";
import { Avatar, Paper, Text, Button, Textarea, Space, Group, Container, Checkbox , Center} from "@mantine/core";
import Link from "next/link";
import { GiWaveSurfer } from "react-icons/gi";
import { Create } from "@/components/create";

const Home: NextPage = () => {
 const walletInfo = useActiveWallet();
  const activeProfile = useActiveProfile();


  return (
    <>
<Container size={560} p={0}>

        
                {walletInfo?.data && activeProfile?.data ? (
                   <><Create /></>
                ) : (
                  <>
                  <Center>
        
      <Text fz={66} fw={900} fs="italic" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 176 }}>Waves</Text>
      </Center>
      
      <Center>
        <Text fw={700} size="md">
          Twitch Meets Twitter
        </Text>
      </Center>
      
<Space h="xl"/>
<Group grow>
   <Button
   component={Link}
            size="md"
           href="/login"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            leftSection={<GiWaveSurfer size={23} />}
          >
            Sign Up
          </Button>

        </Group>
      <Space h="xl"/>
   
                  <Paper shadow="xl" withBorder p="xl">
       
        <Group>
                <Avatar
                  
                  size="lg"
                />
             
                  <Text c="dimmed" fw={500} size="lg">
                    anon
                  </Text>
</Group>
        <Space h="md"/>
            <Textarea
              id="content"
      variant="filled"
      size="md"
      radius="md"
      placeholder="You must Connect your Wallet and have a valid Lens Profile NFT to post!"
      
    />

    
          
         <Space h="md"/>

<Group justify="apart">
<Button disabled variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 205}} >
            Create
          </Button>
<Checkbox
      defaultChecked
      label="Followers Only"
      description="Only your followers will be able to see this post."
      id="followers-only"
      size="sm"
disabled
    />
          


          
    </Group>    
      </Paper>
                  </>
                  
                )}
       
      </Container>
    <Space h='xl'/>
    <Container>
    <Feed />
    </Container>
    </>
  );
};

export default Home;
