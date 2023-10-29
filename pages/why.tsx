import { Welcome } from "@/components/Welcome/Welcome";
import { Text, Space, Grid, Paper, Container, Center } from "@mantine/core";
import { ImArrowDown2 } from "react-icons/im";
import { Fade } from 'react-awesome-reveal';
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
export default function Why() {

return(
    <>
<div>
    <Welcome />
    </div>

    <HowItWorks />
    <Space h="xl"/>
 <Text ta="center" fz={50} fw={800} fs="italic" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 176 }}>Roadmap</Text>
  <Space h="md"/>
    <Container> 
      <Fade>
        <Paper shadow="xl"  radius="md" withBorder p="xl">
        <Text td="underline" ta="center" fw={500}>Launch To Lens Button</Text>
        <Text c="dimmed" fw={200}>Creates an embed post type with the Stream PlaybackURL and Title.</Text>
        <Space h="md"/>
        <Text c="dimmed" fw={200}>Follower-Only Option.</Text>
        <Space h="md"/>
        <Text c="dimmed" fw={200}>Apply to be Whitelisted. Updates user profile with the StreamID and PlaybackURL.</Text>
        <Space h="md"/>
        </Paper>
</Fade>
        <Space h="sm"/>
        <Center>
       <ImArrowDown2/>
       </Center>
       <Space h="sm"/>
<Fade>
      <Paper shadow="xl" radius="md" withBorder p="xl">
      <Text td="underline" ta="center" fw={500}>Channel Chats</Text>
        <Text c="dimmed" fw={200}>Using Firebase to build the Channel Chats for logged in users to engage in.</Text>
        <Space h="md"/>
        <Text c="dimmed" fw={200}>Will be the only component on Waves that isnt on-chain.</Text>
        <Space h="md"/>
    </Paper>
</Fade>
    <Space h="sm"/>
        <Center>
       <ImArrowDown2/>
       </Center>
       <Space h="sm"/>
       <Fade>
      <Paper shadow="xl" radius="md" withBorder p="xl">
      <Text td="underline" ta="center" fw={500}>Notification Display</Text>
        <Text c="dimmed" fw={200}>Displaying user notifications.</Text>
        <Space h="md"/>
        <Text c="dimmed" fw={200}>Color coded based on Notification Type.</Text>
    </Paper>
</Fade>
    <Space h="sm"/>
        <Center>
       <ImArrowDown2/>
       </Center>
       <Space h="sm"/>
       <Fade>
      <Paper shadow="xl" radius="md" withBorder p="xl">
      <Text td="underline" ta="center" fw={500}>More Post-Types</Text>
        <Text c="dimmed" fw={200}>Post Images, Videos, Embedded Links, Votes</Text>
        <Space h="md"/>
    </Paper>
</Fade>
    <Space h="sm"/>
        <Center>
       <ImArrowDown2/>
       </Center>
       <Space h="sm"/>
    <Fade>
      <Paper shadow="xl" radius="md" withBorder p="xl">
      <Text td="underline" ta="center" fw={500}>Subcription Payments</Text>
        <Text c="dimmed" fw={200}>Building subcriptions around crypto payments (MATIC) to be instantly paid out to streamers.</Text>
        <Space h="md"/>
        <Text c="dimmed" fw={200}>Subscriber rewards: Subscriber Badge, Subscription NFT, Channel Points, and more...</Text>
       <Space h="md"/>
       <Text c="dimmed" fw={200}>Future iterations will take a percentage of subcriptions.</Text>
    </Paper>
</Fade>
    <Space h="sm"/>
        <Center>
       <ImArrowDown2/>
       </Center>
       <Space h="sm"/>
<Fade>
      <Paper shadow="xl" radius="md" withBorder p="xl">
          <Text td="underline" ta="center" fw={500}>Clean Up</Text>
        <Text c="dimmed" fw={200}>Fixing any bugs and adding small features based on feedback and testing.</Text>
        <Space h="md"/>
        
    </Paper>
      </Fade>
      <Space h="sm"/>
        <Center>
       <ImArrowDown2/>
       </Center>
       <Space h="sm"/>
<Fade>
       <Paper shadow="xl" radius="md" withBorder p="xl">
          <Text td="underline" ta="center" fw={500}>Community Takeover</Text>
        <Text c="dimmed" fw={200}>Once the foundation for Waves is complete the platform direction will be dependent on the community.</Text>
        <Space h="md"/>
        <Text c="dimmed" fw={200}>Could be done through on-chain voting or some open forum basis.</Text>
           <Space h="md"/>
    </Paper>
      </Fade>

   </Container>
   <Space h={111}/>

</>
)
}