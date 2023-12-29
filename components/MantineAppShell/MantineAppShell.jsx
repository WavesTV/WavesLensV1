import { MantineHeader } from "@/components/MantineAppShell/MantineHeader/MantineHeader";
import { MantineNavBar } from "@/components/MantineAppShell/MantineNavBar";
import { MantineAside } from "@/components/MantineAppShell/MantineAside";
import { MantineFooter } from "@/components/MantineAppShell/MantineFooter";
import { Spotlight } from "@/components/Spotlight";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { ActionIcon, AppShell, Space, Tooltip, Group, Modal } from "@mantine/core";
import { RiArrowRightDoubleLine, RiArrowLeftDoubleLine } from "react-icons/ri";
import classes from "../../styles/RecommendedWaves.module.css";
import { BiSolidUpArrow } from "react-icons/bi";
import { useRouter } from 'next/router';
import { Chat } from "@/components/Chat";
import { useSession } from "@lens-protocol/react-web";
import { LiaGlobeSolid } from "react-icons/lia";

export function MantineAppShell({ children }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [navOpened, { toggle: toggleNav }] = useDisclosure(true);
  const [asideOpened, { toggle: toggleAside }] = useDisclosure(true);
  const [openedChat, { open: openChat, close: closeChat }] = useDisclosure(false);
  const [scroll, scrollTo] = useWindowScroll();
  const router = useRouter();
  const { handle } = router.query;
   const { data: session } = useSession();
  return (
    <>
    <Modal p="md" opened={openedChat} onClose={closeChat}>
        <Chat handle={"Global Waves"} />
    </Modal>

      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "md",
          collapsed: { mobile: !mobileOpened, desktop: !navOpened },
        }}
        aside={{
          width: 300,
          breakpoint: "md",
          collapsed: { mobile: !mobileOpened, desktop: !asideOpened },
        }}
      >
        <AppShell.Header>
          <MantineHeader />
        </AppShell.Header>

        <AppShell.Navbar>
          {navOpened && (
            <>
            <Group justify="right">
              <Tooltip position="right-start" label="Close Navbar">
                <ActionIcon
                  variant="light"
                  mt={11}
                  mr={11}
                  onClick={toggleNav}
                  visibleFrom="sm"
                >
                  <RiArrowLeftDoubleLine />
                </ActionIcon>
              </Tooltip>
              </Group>
            </>
          )}
          <Space h="md" />
          <MantineNavBar />
        </AppShell.Navbar>

        <AppShell.Aside>
        {asideOpened && (
            <>
              <Tooltip position="right-start" label="Close Sidebar">
                <ActionIcon
                variant="light"
                  mt={11}
                  ml={11}
                  onClick={toggleAside}
                  visibleFrom="sm"
                >
                  <RiArrowRightDoubleLine />
                </ActionIcon>
              </Tooltip>
            </>
          )}

        {(router.pathname.startsWith('/wave/') && handle) || (router.pathname === '/dashboard' && session?.type === "WITH_PROFILE") ? (
  <>
    <Chat handle={handle || session.profile?.handle?.localName || "Anon"} />
  </>
) : (
  <MantineAside />
)}

          
        </AppShell.Aside>

        <AppShell.Footer p="md" className={classes.footer}>
          <MantineFooter />
        </AppShell.Footer>

        <AppShell.Main>

          {!asideOpened && (
            <Tooltip position="right-start" label="Open Sidebar">
              <div style={{ position: "fixed", zIndex: 9999, right: "20px"}}>
                <ActionIcon variant="light" onClick={toggleAside} visibleFrom="sm">
                  <RiArrowLeftDoubleLine />
                </ActionIcon>
              </div>
            </Tooltip>
            
          )}

          {!navOpened && (
            <Tooltip position="right-start" label="Open Navbar">
              <div style={{ position: "fixed", zIndex: 9999 }}>
                <ActionIcon variant="light" onClick={toggleNav} visibleFrom="sm">
                  <RiArrowRightDoubleLine />
                </ActionIcon>
              </div>
            </Tooltip>
          )}

          <Space h="md" />
          <Group justify="space-between">
            <Spotlight />

            <Tooltip label="Global Chat">
        <ActionIcon
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          size="xl"
          radius="xl"
          onClick={openChat}
        >
          <LiaGlobeSolid size="2rem" />
        </ActionIcon>
      </Tooltip>
          </Group>
          
          <Space h="sm" />
          
           <div style={{ position: "relative" }}>
    {children}
    <Group justify="right">
    <ActionIcon variant="light" size="xl" radius="xl" 
      onClick={() => scrollTo({ y: 0 })}
      style={{
        position: "fixed",
        bottom: "80px",
        
        zIndex: 9999,
      }}
    >
      <BiSolidUpArrow />
    </ActionIcon>
    </Group>
  </div>
        </AppShell.Main>
      </AppShell>
    </>
  );
}
