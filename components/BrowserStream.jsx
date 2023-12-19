import { Player, useCreateStream, useUpdateStream, Broadcast } from "@livepeer/react";
import { useMemo, useState, useRef } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Title,
  Input,
  Paper,
  Textarea,
  Group,
  Button,
  Space,
  Center,
  CopyButton,
  Tabs,
  Tooltip,
  Card,
  rgba,
  Loader,
  Text,
  Progress,
  Divider,
  Accordion,
  Collapse,
  useMantineTheme,
  ActionIcon,
  PasswordInput,
  HoverCard,
  Container,
  Checkbox,
  Blockquote,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { TwitchPlayer, TwitchChat } from "react-twitch-embed";
import {
  IconCopy,
  IconRocket,
  IconCheck,
  IconScreenShare,
  IconKey,
  IconX,
} from "@tabler/icons-react";
import { useInterval } from "@mantine/hooks";
import { RiKickLine } from "react-icons/ri";
import { RiYoutubeLine } from "react-icons/ri";
import { BsTwitch } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { VscKey } from "react-icons/vsc";
import { BiTimer, BiUserCircle } from "react-icons/bi";
import { TiInfoLargeOutline } from "react-icons/ti";
import {
  ReferencePolicyType,
  useSession,
  useCreatePost,
} from "@lens-protocol/react-web";
import { mainContentFocus, liveStream } from "@lens-protocol/metadata";
import classes from "../styles/LaunchButton.module.css";
import useUpload from "@/lib/useUpload";
import { BsExclamationCircle } from "react-icons/bs";

export const BrowserStream = () => {
  const theme = useMantineTheme();
  const { data: session } = useSession();
  const [streamName, setStreamName] = useState("");
  const [disable, { toggle }] = useDisclosure(false);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [openedMulti, { toggle: toggleMulti }] = useDisclosure(true);
  const embed = useRef(); // We use a ref instead of state to avoid rerenders.
  const upload = useUpload();
  const [postSuccess, setPostSuccess] = useState(false);
  const { execute, error, loading } = useCreatePost();

  const handleReady = (e) => {
    embed.current = e;
  };

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 0;
      }),
    75,
  );

  // Allowing user to create streams via livepeers useCreateStream hook
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);

  async function createLivestreamPost() {
    try {
      // Get the current date and time in ISO 8601 format
      const currentDate = new Date().toISOString();

      const metadata = liveStream({
        title: stream?.name,
        liveUrl: `https://lvpr.tv/?v=${stream?.playbackId}`,
        playbackUrl: `https://lvpr.tv/?v=${stream?.playbackId}`,
        startsAt: currentDate,
      });

      const uri = await upload(metadata);

      const result = await execute({
        metadata: uri,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const isLoading = useMemo(() => status === "loading", [status]);

  const streamId = stream?.id;

  const showOverlay = !!stream;
  const { mutate: suspendStream } = useUpdateStream({
    streamId,
    suspend: true,
  });

  const handleEndStream = async () => {
    suspendStream?.();
    setStreamName("");
  };

  const { mutate: recordStream } = useUpdateStream({
    streamId,
    record: true,
  });
  const handleEnableRecording = async () => {
    recordStream?.();
    
  };
  const [isRecordingEnabled, setIsRecordingEnabled] = useState(false);

  const [twitchStreamKey, setTwitchStreamKey] = useState("");
  const [twitchUsername, setTwitchUsername] = useState("");
  const [twitchInput, setTwitchInput] = useState("");
  const {
    mutate: twitchMultistream,
    isSuccess,
    status: twitchStatus,
  } = useUpdateStream({
    streamId,
    multistream: {
      targets: [
        {
          profile: "source",
          spec: {
            name: "Twitch",
            url: `rtmp://live.twitch.tv/app/${twitchStreamKey}`, // Use the RTMP URL entered by the user
          },
        },
      ],
    },
  });

  const handleEnableTwitchMultistream = async () => {
    setTwitchUsername(twitchInput);
    twitchMultistream?.();
  };

  const [ytStreamKey, setYTStreamKey] = useState("");
  const [ytStreamURL, setYTStreamURL] = useState("");
  const { mutate: youtubeMultistream, status: ytmulti } = useUpdateStream({
    streamId,
    multistream: {
      targets: [
        {
          profile: "source",
          spec: {
            name: "Youtube",
            url: `${ytStreamURL}/${ytStreamKey}`, // Use the RTMP URL entered by the user
          },
        },
      ],
    },
  });

  const handleEnableYTMultistream = async () => {
    youtubeMultistream?.();
  };

  const [kickStreamKey, setKickStreamKey] = useState("");
  const [kickStreamURL, setKickStreamURL] = useState("");
  const { mutate: kickMultistream, error: kickmulti } = useUpdateStream({
    streamId,
    multistream: {
      targets: [
        {
          profile: "source",
          spec: {
            name: "Kick",
            url: `${kickStreamURL}/app/${kickStreamKey}`, // Use the RTMP URL entered by the user
          },
        },
      ],
    },
  });

  const handleEnableKickMultistream = async () => {
    kickMultistream?.();
  };

  return (
    
<>
          



          <Center>
            <Text fz="lg" fw={777} c="dimmed" truncate>
              Start Streaming
            </Text>
          </Center>
          <Space h="md" />
          <Textarea
            placeholder="Enter Stream Title"
            variant="filled"
            radius="md"
            disabled={disable}
            onChange={(e) => setStreamName(e.target.value)}
          />
          <Space h="xl" />
          {status === "success" && (
            <>
              {streamName ? (
                <>
                  <Container>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <HoverCard width={280} closeDelay={700} shadow="md">
                          <HoverCard.Target>
                            <ActionIcon radius="xl" size="sm" variant="outline">
                              <TiInfoLargeOutline />
                            </ActionIcon>
                          </HoverCard.Target>
                          <HoverCard.Dropdown>
                            <Text fw={500} size="xs">
                              Allow access to your Camera/Mic to start streaming
                            </Text>
                            <Space h="xs" />
                          </HoverCard.Dropdown>
                        </HoverCard>
                      </div>
                      <Space h="md" />
                      <Group justify="center">
                        <Title order={1}>
                          <Text radius="sm" fw={700} fz="lg">
                            {streamName}
                          </Text>
                        </Title>
                      </Group>

                      <Divider my="sm" />

                      <Group justify="center">
                        
                        <Button
                          rightSection={<IconRocket size="1rem" />}
                          fullWidth
                          className={classes.button}
                          onClick={() => {
                            createLivestreamPost();
                          }}
                        ></Button>
                        <Space h="md" />

                        <Blockquote
                          color="red"
                          radius="xl"
                          iconSize={30}
                          icon={<BsExclamationCircle size="1.2rem" />}
                          mt="xl"
                        >
                          <Text fw={400} fs="italic">
                            Your Stream Data is stored locally in your browser,
                            so if you click away from your dashboard during an
                            active stream you will have to start a new Wave. We
                            will rework this in the future for a better
                            experience.
                          </Text>
                        </Blockquote>
                      </Group>

                      <Space h="md" />
                    </Card>
                  </Container>
                  <Space h="md" />
                  <Center>
                    <Group style={{ width: "500px" }}>
                      <Tooltip label="Stream to Multiple Platforms">
                        <Button
                          fullWidth
                          variant="gradient"
                          gradient={{ from: "indigo", to: "cyan" }}
                          radius="lg"
                          size="md"
                          onClick={toggleMulti}
                        >
                          {" "}
                          <Text fw={700} fz="lg">
                            Multistream
                          </Text>
                        </Button>
                      </Tooltip>
                    </Group>
                  </Center>
                  <Collapse in={openedMulti}>
                    <Divider my="sm" />
                    <Paper shadow="md" radius="md" p="lg" withBorder>
                      <HoverCard width={280} closeDelay={700} shadow="md">
                        <HoverCard.Target>
                          <ActionIcon radius="xl" size="sm" variant="outline">
                            <TiInfoLargeOutline />
                          </ActionIcon>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                          <Text fw={500} size="sm">
                            Broadcast your Stream to multiple platforms with
                            Multistreaming!
                          </Text>
                          <Space h="xs" />
                          <Text fw={500} size="sm">
                            Just paste in the necessary information and click
                            the Launch button.
                          </Text>
                          <Space h="xs" />
                          <Text fw={500} size="sm">
                            It is recommended to have separate tabs open of your
                            Multistreams to ensure everything is working!
                          </Text>
                          <Space h="xs" />
                          <Text fw={500} size="sm">
                            Be sure to set the Stream Title, Category, etc in
                            the apps you are multistreaming to.
                          </Text>
                        </HoverCard.Dropdown>
                      </HoverCard>
                      <Space h="xs" />
                      <Accordion variant="separated" radius="md">
                        <Accordion.Item value="Youtube">
                          <Accordion.Control
                            icon={<RiYoutubeLine size={"1.5rem"} color="red" />}
                          >
                            <Text size="xl" fw={500}>
                              Youtube
                            </Text>
                          </Accordion.Control>
                          <Accordion.Panel>
                            <Input
                              icon={<BiUserCircle />}
                              placeholder="Enter Your Youtube Stream URL"
                              radius="md"
                              value={ytStreamURL}
                              onChange={(e) => setYTStreamURL(e.target.value)}
                            />
                            <Space h="md" />
                            <PasswordInput
                              icon={<AiOutlineLink />}
                              placeholder="Enter Your Youtube Stream Key"
                              radius="md"
                              value={ytStreamKey}
                              onChange={(e) => setYTStreamKey(e.target.value)}
                            />
                            <Space h="md" />
                            <Group justify="right">
                              <Button
                                rightSection={<IconRocket size="1rem" />}
                                variant="light"
                                size="xs"
                                onClick={handleEnableYTMultistream}
                              >
                                Launch
                              </Button>
                              {ytmulti && <div>{ytmulti.message}</div>}
                            </Group>
                          </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="Twitch">
                          <Accordion.Control
                            icon={<BsTwitch size={"1.5rem"} color="purple" />}
                          >
                            <Text size="xl" fw={500}>
                              Twitch
                            </Text>
                          </Accordion.Control>
                          <Accordion.Panel>
                            <Input
                              icon={<BiUserCircle />}
                              placeholder="Enter Your Twitch Username"
                              radius="md"
                              value={twitchInput}
                              onChange={(e) => setTwitchInput(e.target.value)}
                            />
                            <Space h="md" />
                            <PasswordInput
                              icon={<VscKey />}
                              placeholder="Enter Your Twitch Stream Key"
                              radius="md"
                              value={twitchStreamKey}
                              onChange={(e) =>
                                setTwitchStreamKey(e.target.value)
                              }
                            />
                            <Space h="md" />
                            <Group justify="right">
                              <Button
                                rightSection={<IconRocket size="1rem" />}
                                variant="light"
                                size="xs"
                                onClick={handleEnableTwitchMultistream}
                              >
                                Launch
                              </Button>
                            </Group>

                            {twitchUsername && (
                              <>
                                <Space h="md" />
                                <Center>
                                  <TwitchPlayer
                                    channel={twitchUsername}
                                    width={333}
                                    muted
                                    onReady={handleReady}
                                    id="1"
                                  />
                                  <Space w="md" />
                                  <TwitchChat
                                    channel={twitchUsername}
                                    darkMode
                                  />
                                </Center>
                              </>
                            )}
                          </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="Kick">
                          <Accordion.Control
                            icon={<RiKickLine size={"1.5rem"} color="green" />}
                          >
                            {" "}
                            <Text fw={500} size="xl">
                              Kick
                            </Text>
                          </Accordion.Control>
                          <Accordion.Panel>
                            <Input
                              icon={<AiOutlineLink />}
                              placeholder="Enter Kick Stream URL"
                              radius="md"
                              value={kickStreamURL}
                              onChange={(e) => setKickStreamURL(e.target.value)}
                            />
                            <Space h="md" />
                            <PasswordInput
                              icon={<VscKey />}
                              placeholder="Enter Kick Stream Key"
                              radius="md"
                              value={kickStreamKey}
                              onChange={(e) => setKickStreamKey(e.target.value)}
                            />{" "}
                            <Space h="md" />
                            <Group justify="right">
                              <Button
                                onClick={handleEnableKickMultistream}
                                rightSection={<IconRocket size="1rem" />}
                                variant="light"
                                size="xs"
                              >
                                Launch
                              </Button>
                            </Group>
                          </Accordion.Panel>
                        </Accordion.Item>
                      </Accordion>
                    </Paper>
                  </Collapse>

                  <Space h="md" />
                  <Blockquote
                    color="blue"
                    radius="xl"
                    iconSize={30}
                    icon={<BsExclamationCircle size="1.2rem" />}
                    mt="xl"
                  >
                    <Text fw={400} fs="italic">
                      This stream playback is not public. Please Launch your
                      Wave to make it accessible across all Lens Apps.
                    </Text>
                  </Blockquote>
                  <Space h="md" />
                  <Group justify="center">
                     <Broadcast
                      title={stream?.name}
                      streamKey={stream.streamKey}
                      
                      muted
                    />
                  </Group>

                  <Space h="md" />
                  <Group justify="center">
                    <Button
                      fullWidth
                      color="red"
                      radius="xl"
                      onClick={handleEndStream}
                    >
                      End Wave
                    </Button>
                  </Group>
                </>
              ) : (
                <Group justify="center">
                  <p>Wave suspended. Refresh to create a new Wave.</p>
                </Group>
              )}
            </>
          )}
          {status === "loading" && (
            <Group justify="center">
              <Loader size="sm" />
            </Group>
          )}
          {status === "error" && (
            <Group justify="center">
              <p>Error occurred while creating your wave.</p>
            </Group>
          )}
          <Space h="md" />
          {!stream && (
            <Group justify="center">
              <Button
                radius="xl"
                onClick={() => {
                  toggle();

                  createStream?.(); // Create the stream and store the result
                }}
                disabled={isLoading || !createStream}
              >
                Create Wave
              </Button>
            </Group>
          )}
   
</>
  );
};
