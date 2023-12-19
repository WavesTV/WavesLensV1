import { Welcome } from "@/components/Welcome/Welcome";
import {
  Text,
  Space,
  List,
  Paper,
  ThemeIcon,
  Center,
  rem,
  Stepper,
} from "@mantine/core";
import { Fade } from "react-awesome-reveal";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";
import classes from "../styles/MilestoneStepper.module.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbProgressBolt } from "react-icons/tb";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function Why() {
  return (
    <>
      <div>
        <Welcome />
      </div>

      <HowItWorks />
      <Space h={70} />
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
      <Space h={70} />
      <Center>
        <Stepper
          active={2}
          orientation="vertical"
          size="xl"
          classNames={classes}
          completedIcon={<IoMdCheckmarkCircleOutline size="1.7rem" />}
        >
          <Stepper.Step
            label="Milestone 1"
            description={
              <>
                <Fade>
                  <Paper shadow="sm" radius="md" withBorder p="xl">
                    <Text c="dimmed" fw={200}>
                      Basic Usage on Lens V1 - Post, Livestream, Post
                      Engagement, View Profiles/Feeds
                    </Text>
                    <Space h="md" />
                  </Paper>
                </Fade>
              </>
            }
          />
          <Stepper.Step
            label="Milestone 2"
            
            description={
              <>
                <Paper shadow="sm" radius="md" withBorder p="xl">
                  <Text c="dimmed" fw={200}>
                    Lens V2 Upgrade & More
                  </Text>
                  <Space h="md" />

                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="teal" size={24} radius="xl">
                        <IoCheckmarkOutline
                          style={{ width: rem(16), height: rem(16) }}
                        />
                      </ThemeIcon>
                    }
                  >
                    <Fade>
                      <List.Item>Connect Wallet + Sign In + Sign Out</List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>
                        Following + Hot + Waves + Profile Feeds (Image, Video, Text Filters)
                      </List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>
                        Livestream via OBS/Streamlabs
                      </List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>
                        Multistream to Twitch, Youtube, & Kick
                      </List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>
                        Wallet Page with HeroSwap (Will support Matic in the
                        future)
                      </List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>Search Lens Profiles</List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>
                        Feed Surf Feature (View Other Lens Creator&apos;s Feeds)
                      </List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>View Notifications with Filter</List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>Like Posts</List.Item>
                    </Fade>
                    
                    <Space h="xs" />
                    <Fade>
                      <List.Item>Powered By Lens Banner + Promoted Artists</List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>Much UI Buffs</List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item
                      >
                        Live Demo
                      </List.Item>
                    </Fade>
                  </List>
                </Paper>
              </>
            }
          />
          <Stepper.Step
          loading
            icon={<TbProgressBolt size="1.7rem" />}
            label="Milestone 3"
            description={
              <>
                <Paper shadow="sm" radius="md" withBorder p="xl">
                  <Text c="dimmed" fw={200}>
                    Monetization + Channel Chats + Enhancements
                  </Text>
                  <Space h="md" />
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="blue" size={24} radius="xl">
                        <IconCircleDashed
                          style={{ width: rem(16), height: rem(16) }}
                        />
                      </ThemeIcon>
                    }
                  >
                    <Fade>
                      <List.Item
                       icon={
                           <ThemeIcon color="teal" size={24} radius="xl">
                        <IoCheckmarkOutline
                          style={{ width: rem(16), height: rem(16) }}
                        />
                      </ThemeIcon>
                        }
                      >
                        New Feed - For better discoverability for new posts/users
                      </List.Item>
                    </Fade>
                       <Space h="xs" />
                       <Fade>
                      <List.Item
                       icon={
                          <ThemeIcon color="teal" size={24} radius="xl">
                            <IoCheckmarkOutline
                              style={{ width: rem(16), height: rem(16) }}
                            />
                          </ThemeIcon>
                        }
                      >
                        Enhanced Feed Surf UI
                      </List.Item>
                    </Fade>
                      <Space h="xs" />
                       <Fade>
                      <List.Item
                       icon={
                          <ThemeIcon color="teal" size={24} radius="xl">
                            <IoCheckmarkOutline
                              style={{ width: rem(16), height: rem(16) }}
                            />
                          </ThemeIcon>
                        }
                      >
                        Enhanced Search - Search Publications + UI
                      </List.Item>
                    </Fade>
                       <Space h="xs" />
                        <Fade>
                      <List.Item
                       icon={
                          <ThemeIcon color="teal" size={24} radius="xl">
                            <IoCheckmarkOutline
                              style={{ width: rem(16), height: rem(16) }}
                            />
                          </ThemeIcon>
                        }
                      >
                        In-Browser Stream - Easier for non-gamer streamers + Mobile Friendly (Kind of)
                      </List.Item>
                    </Fade>
<Space h="xs" />
                       <Fade>
                      <List.Item
                       icon={
                          <ThemeIcon color="teal" size={24} radius="xl">
                            <IoCheckmarkOutline
                              style={{ width: rem(16), height: rem(16) }}
                            />
                          </ThemeIcon>
                        }
                      >
                        Enhanced Recommended Waves
                      </List.Item>
                    </Fade>
                    <Space h="xs" />
                       <Fade>
                      <List.Item
                       icon={
                          <ThemeIcon color="teal" size={24} radius="xl">
                            <IoCheckmarkOutline
                              style={{ width: rem(16), height: rem(16) }}
                            />
                          </ThemeIcon>
                        }
                      >
                        New Promoted Artists (BagBoyBando & Cbo)
                      </List.Item>
                    </Fade>
                       <Space h="xs" />
                    <Fade>
                      <List.Item>Subscriptions + Rewards</List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>Donations</List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>
                        Channel Chats (1st iteration will use Firebase)
                      </List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>Stream Collects</List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>
                        More Post Types(Images, Embed Links, Videos)
                      </List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>Post, Comment, Mirrors</List.Item>
                    </Fade>
                    <Space h="xs" />
                    <Fade>
                      <List.Item>Follow/Unfollow Users</List.Item>
                    </Fade>
                    <Space h="xs" />
                  </List>
                </Paper>
              </>
            }
          />
        </Stepper>
      </Center>
      <Space h="xl" />

      <Space h={111} />
    </>
  );
}
