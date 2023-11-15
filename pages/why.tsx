import { Welcome } from "@/components/Welcome/Welcome";
import {
  Text,
  Space,
  ActionIcon,
  Paper,
  Container,
  Center,
  Divider,
} from "@mantine/core";
import { ImArrowDown2 } from "react-icons/im";
import { Fade } from "react-awesome-reveal";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
import { IconCheck } from "@tabler/icons-react";
export default function Why() {
  return (
    <>
      <div>
        <Welcome />
      </div>

      <HowItWorks />
      <Space h="xl" />
      <Text
        ta="center"
        fz={50}
        fw={800}
        fs="italic"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 176 }}
      >
        Roadmap
      </Text>
      <Text ta="center" size="lg" fw={800} fs="italic">
        Milestone 1
      </Text>
      <Space h="md" />
      <Container>
        <Fade>
          <Paper shadow="xl" radius="md" withBorder p="xl">
            <ActionIcon variant="light" color="green" aria-label="Settings">
              <IconCheck style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>

            <Text td="underline" ta="center" fw={500}>
              Build MVP on Lens V1
            </Text>
            <Text c="dimmed" fw={200}>
              Basic Usage - Post, Livestream, Engage, View Profiles/Feeds
            </Text>
            <Space h="md" />
          </Paper>
        </Fade>
        <Space h="sm" />
        <Center>
          <ImArrowDown2 />
        </Center>
        <Space h="sm" />
        <Fade>
          <Paper shadow="xl" radius="md" withBorder p="xl">
            <Text td="underline" ta="center" fw={500}>
              Build MVP on Lens V2
            </Text>
            <Text c="dimmed" fw={200}>
              Basic Usage - Post, Livestream, Engage, View Profiles/Feeds
            </Text>
            <Space h="md" />
          </Paper>
        </Fade>
      </Container>

      <Space h="sm" />
      <Divider my="sm" />
      <Space h="sm" />

      <Text ta="center" size="lg" fw={800} fs="italic">
        Milestone 2
      </Text>
      <Space h="md" />
      <Container>
        <Fade>
          <Paper shadow="xl" radius="md" withBorder p="xl">
            <Text td="underline" ta="center" fw={500}>
              Subcriptions
            </Text>
            <Text c="dimmed" fw={200}>
              Payment Processing - Direct/Instant payments via Matic
            </Text>
            <Space h="md" />
            <Text c="dimmed" fw={200}>
              Tiered System - 3 tiers similar to Twitch
            </Text>
            <Space h="md" />
            <Text c="dimmed" fw={200}>
              Rewards - Subscriber Badge, Subscriber NFT, and more
            </Text>
          </Paper>
        </Fade>
        <Space h="sm" />
        <Center>
          <ImArrowDown2 />
        </Center>
        <Space h="sm" />
        <Fade>
          <Paper shadow="xl" radius="md" withBorder p="xl">
            <Text td="underline" ta="center" fw={500}>
              Chat
            </Text>
            <Text c="dimmed" fw={200}>
              Using Streamr to build on-chain channel chats
            </Text>
            <Space h="md" />
          </Paper>
        </Fade>
      </Container>
      <Space h="sm" />
      <Divider my="sm" />
      <Space h="sm" />

      <Text ta="center" size="lg" fw={800} fs="italic">
        Milestone 3
      </Text>
      <Space h="md" />
      <Container>
        <Fade>
          <Paper shadow="xl" radius="md" withBorder p="xl">
            <Text td="underline" ta="center" fw={500}>
              Mobile App Prototype
            </Text>
            <Text c="dimmed" fw={200}>
              Functionality will mirror Web App
            </Text>
            <Space h="md" />
          </Paper>
        </Fade>
        <Space h="sm" />
        <Center>
          <ImArrowDown2 />
        </Center>
        <Space h="sm" />
        <Fade>
          <Paper shadow="xl" radius="md" withBorder p="xl">
            <Text td="underline" ta="center" fw={500}>
              Community Takeover
            </Text>
            <Text c="dimmed" fw={200}>
              Future features will be handled via open forum or voting
            </Text>
            <Space h="md" />
          </Paper>
        </Fade>
      </Container>
      <Space h={111} />
    </>
  );
}
