import type { NextPage } from "next";
import { Welcome } from "@/components/Welcome/Welcome";
import {
  useActiveProfile,
  useActiveWallet,
} from "@lens-protocol/react-web";
import Feed from "./feed";
import Create from "./create";
import { Avatar, Paper, Text, Button, Textarea, Space, Group, Container, Checkbox , ActionIcon, FileInput, Center} from "@mantine/core";
import { GiMirrorMirror } from "react-icons/gi";
const Home: NextPage = () => {
 const walletInfo = useActiveWallet();
  const activeProfile = useActiveProfile();
  return (
    <>
   
    <Welcome />
  <Container>

        
                {walletInfo?.data && activeProfile?.data ? (
                   <Create/>
                ) : (
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
            Create Post
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
