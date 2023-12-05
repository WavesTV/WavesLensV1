import { MantineHeader } from "@/components/MantineAppShell/MantineHeader/MantineHeader";
import { MantineNavBar } from "@/components/MantineAppShell/MantineNavBar";
import { MantineAside } from "@/components/MantineAppShell/MantineAside";
import { MantineFooter } from "@/components/MantineAppShell/MantineFooter";
import { Spotlight } from "@/components/Spotlight";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, AppShell, Space, Tooltip } from "@mantine/core";
import { RiArrowRightDoubleLine, RiArrowLeftDoubleLine } from "react-icons/ri";
import classes from "../../styles/RecommendedWaves.module.css";

export function MantineAppShell({ children }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <>
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
          <MantineNavBar />
        </AppShell.Navbar>

        <AppShell.Aside>
          <MantineAside />
        </AppShell.Aside>

        <AppShell.Footer p="md" className={classes.footer}>
          <MantineFooter />
        </AppShell.Footer>

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

          <Space h="md" />
          <Spotlight />
          <Space h="sm" />
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
