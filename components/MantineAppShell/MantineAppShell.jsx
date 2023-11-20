import { IconCircleCheck } from "@tabler/icons-react";

import Link from "next/link";
import { useRouter } from "next/router";
import {
  ActionIcon,
  AppShell,
  Center,
  Text,
  Image,
  MantineProvider,
  Space,
  Tooltip,
  Divider,
  Paper,
  Group,
  List,
  ThemeIcon,
  UnstyledButton,
  Avatar,
  rem,
} from "@mantine/core";
import { RiArrowRightDoubleLine, RiArrowLeftDoubleLine } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";
import { MantineHeader } from "@/components/MantineAppShell/MantineHeader/MantineHeader";
import classes from "../../styles/RecommendedWaves.module.css";

export function MantineAppShell({ children }) {
  const router = useRouter();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <MantineHeader />
      </AppShell.Header>
      <AppShell.Navbar>
        {desktopOpened ? (
          <>
            <Tooltip position="right-start" label="Close Sidebars">
              <ActionIcon
                mt={11}
                ml={11}
                onClick={toggleDesktop}
                visibleFrom="sm"
              >
                <RiArrowLeftDoubleLine />
              </ActionIcon>
            </Tooltip>
          </>
        ) : null}
        <Space h="md" />
        <Text ta="center" fs="italic" fw={700} size="md">
          Recommended Waves
        </Text>
        <Space h="md" />
        <UnstyledButton
          onClick={() => router.push("/profile/titannode")}
          className={classes.user}
        >
          <Group>
            <Avatar
              src="https://ik.imagekit.io/lens/media-snapshot/4a06ebbbd900102ba392ff8f63f4b1562ccf999a865ebc7bf8b26efdfcb14532.png"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Titan Node
              </Text>

              <Text c="dimmed" size="xs">
                @titannode
              </Text>
            </div>
          </Group>
        </UnstyledButton>

        <UnstyledButton
          component={Link}
          href="/profile/jarrodwatts"
          className={classes.user}
        >
          <Group>
            <Avatar
              src="https://ik.imagekit.io/lens/media-snapshot/tr:w-300,h-300/f19080249d7eb5457b9a8a3204f63672e8a827d2b59f23cb758fa2fce9de1b68.png"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Jarrod Watts
              </Text>

              <Text c="dimmed" size="xs">
                @jarrodwatts
              </Text>
            </div>
          </Group>
        </UnstyledButton>

        <UnstyledButton
          onClick={() => router.push("/profile/foundnone")}
          className={classes.user}
        >
          <Group>
            <Avatar
              src="https://ik.imagekit.io/lens/media-snapshot/tr:w-300,h-300/c0a499a325343e16ac4c096906e33f111b5f6f3190b17445917b2491dc74c507.png"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Transmental
              </Text>

              <Text c="dimmed" size="xs">
                @foundnone
              </Text>
            </div>
          </Group>
        </UnstyledButton>

        <UnstyledButton
          onClick={() => router.push("/profile/rehash")}
          className={classes.user}
        >
          <Group>
            <Avatar
              src="https://ik.imagekit.io/lens/media-snapshot/tr:w-300,h-300/bf425afca090edab12dbc16dbf0b56c08d1c3ef1555deddf09bf9c6633ed6976.jpg"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Rehash: A Web3 Podcast
              </Text>

              <Text c="dimmed" size="xs">
                @rehash
              </Text>
            </div>
          </Group>
        </UnstyledButton>

        <UnstyledButton
          onClick={() => router.push("/profile/krassenstein")}
          className={classes.user}
        >
          <Group>
            <Avatar
              src="https://ik.imagekit.io/lens/media-snapshot/tr:w-300,h-300/b0ee1bc9613628d9668693825a59c5f55b099adb6b91a6f52a95933670e071a4.jpg"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Krassenstein
              </Text>

              <Text c="dimmed" size="xs">
                @krassenstein
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </AppShell.Navbar>
      <AppShell.Aside>
        <Space h={40} />

        <Text fw={700} ta="center" fs="italic">
          Powered By
        </Text>
        <Space h="md" />
        <UnstyledButton
          component="a"
          href="https://www.lens.xyz/"
          target="_blank"
          rel="noreferrer"
          className={classes.user}
        >
          <Group>
            <Avatar
              src="https://gw.ipfs-lens.dev/ipfs/Qmb4XppdMDCsS7KCL8nCJo8pukEWeqL4bTghURYwYiG83i/cropped_image.png"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Lens Protocol
              </Text>
            </div>
          </Group>
        </UnstyledButton>

        <UnstyledButton
          component="a"
          href="https://livepeer.org/"
          target="_blank"
          rel="noreferrer"
          className={classes.user}
        >
          <Group>
            <Avatar
              src="https://gw.ipfs-lens.dev/ipfs/bafkreieqprlwmiawdkfzlvxjsaldlctrgxq6ccjhizriqhspedb5k2imyy"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                Livepeer
              </Text>
            </div>
          </Group>
        </UnstyledButton>

        <UnstyledButton
          component="a"
          href="https://thirdweb.com/"
          target="_blank"
          rel="noreferrer"
          className={classes.user}
        >
          <Group>
            <Avatar
              src="https://pbs.twimg.com/profile_images/1580649916686286848/vdNCao2e_400x400.jpg"
              radius="xl"
            />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                ThirdWeb
              </Text>
            </div>
          </Group>
        </UnstyledButton>

        <Space h="md" />
      </AppShell.Aside>

      <AppShell.Main>
        {!desktopOpened ? (
          <Tooltip position="right-start" label="Open Sidebars">
            <div style={{ position: "fixed", zIndex: 9999 }}>
              <ActionIcon onClick={toggleDesktop} visibleFrom="sm">
                <RiArrowRightDoubleLine />
              </ActionIcon>
            </div>
          </Tooltip>
        ) : null}
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
