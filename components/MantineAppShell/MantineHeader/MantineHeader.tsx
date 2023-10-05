import {
    Group,
    Button,
    UnstyledButton,
    Text,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    useMantineTheme,
    ActionIcon,
    Tooltip,
    Badge,
    Space,
    Menu,
    Avatar,
  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconBellRinging,
    IconHome2,
    IconUser,
    IconWallet,
    IconLogout,
    IconReceipt2,
    IconSwitchHorizontal,
    IconLayoutDashboard,
  } from '@tabler/icons-react';
import classes from './MantineHeader.module.css';
import Link from 'next/link';
import { GiWaveCrest } from 'react-icons/gi';
import { ColorSchemeToggle } from '../../ColorSchemeToggle';
import SignInWithLensButton from '@/components/SignInWithLensButton';
import { useActiveProfile, useActiveWallet, useWalletLogout  } from "@lens-protocol/react-web";
import { ConnectWallet } from '@thirdweb-dev/react';





  
  export function MantineHeader() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const walletInfo = useActiveWallet();
    const activeProfile = useActiveProfile();
    const { execute: logout, isPending } = useWalletLogout();
    
  

 
 
    
  
    return (
      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
             <UnstyledButton component={Link} href="/">
          <Group>
           
          <Text size="xl" fw={900} fs="italic" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Waves</Text>
<Badge variant="filled" color="blue" radius="sm" className={classes.betaTag}>BETA</Badge>

</Group>
  </UnstyledButton>
            <Group h="100%" visibleFrom="sm">
            <Tooltip label="Home" withArrow  position="bottom" offset={3}>
          <ActionIcon
          component={Link}
          href="/"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 360  }}
    >
      <IconHome2 />
    </ActionIcon>
    </Tooltip>
    <Tooltip label="Dashboard" withArrow  position="bottom" offset={3}>
    <ActionIcon
    component={Link}
    href="/dashboard"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      <IconLayoutDashboard />
    </ActionIcon>
    </Tooltip>
    <Tooltip label="Wallet" withArrow  position="bottom" offset={3}>
    <ActionIcon
    component={Link}
    href="/wallet"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 150  }}
    >
      <IconWallet />
    </ActionIcon>
    </Tooltip>
    <Tooltip label="Notifications" withArrow  position="bottom" offset={3}>
    <ActionIcon
    component={Link}
    href="/notifications"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 270 }}
    
    >
     
      <IconBellRinging/>
     
   
        
    </ActionIcon>
    </Tooltip>
            </Group>
  
            <Group visibleFrom="sm">
            <ColorSchemeToggle/>

            {/* Wallet + Active Lens Profile */}
            {walletInfo?.data && activeProfile?.data && (
            <>
             <Menu
                            trigger="hover"
                            openDelay={100}
                            closeDelay={400}
                            shadow="md"
                            width={200}
                            zIndex={1000000}
                          >
                            <Menu.Target>
            <Avatar
            // @ts-ignore
             src={
                    // @ts-ignore
                    activeProfile?.data?.picture?.original?.url || "/user.png"
                  }
            
              size={60}
              radius={80}
              mx="auto"
          />
            </Menu.Target>
            <Menu.Dropdown>

                        <Menu.Item
                                leftSection={<IconLogout size={17} />}
                                disabled={isPending} onClick={logout}
                              >
                                Logout
                              </Menu.Item>
            </Menu.Dropdown>
            </Menu>
            </>
               
          )}
          {/* No Wallet + No Lens Profile */}
          {!walletInfo?.data && !activeProfile?.data && (
            <>
            <Button component={Link} href="/login">Login</Button>
            </>
          )}


            </Group>
  
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>
  
        <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="70%"
        padding="md"
        title={
          <Text fw={700} size="xl"  fs="italic" variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Waves</Text>
        }
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
         
          <Group p="md">
          <ColorSchemeToggle/>
</Group>
        
          <Link href="/" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan',  deg: 360  }}
    >
      <IconHome2/>
    </ActionIcon>
    <Space w='md'/>
              Home
            </Link>
            <Space h='md'/>
            <Link   href="/dashboard" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      <IconLayoutDashboard/>
    </ActionIcon>
    <Space w='md'/>
              Dashboard
            </Link>
            <Space h='md'/>
            <Link href="/wallet" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 150 }}
    >
      <IconWallet/>
    </ActionIcon>
    <Space w='md'/>
              Wallet
            </Link>
            <Space h='md'/>
            <Link href="/notifications" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 270 }}
    >
      <IconBellRinging/>
    </ActionIcon>
    <Space w='md'/>
              Notifications
            </Link>
            <Space h='md'/>
          

          <Group align="center" grow pb="xl" px="md">
             {walletInfo?.data && activeProfile?.data ? (
          <Menu
                         
                            shadow="md"
                            width={200}
                            zIndex={1000000}
                          >
                            <Menu.Target>
                              <Button
                                leftSection={<GiWaveCrest size="1rem" />}
                                variant="gradient"
                                gradient={{ from: "cyan", to: "indigo" }}
                              >
                                {activeProfile?.data?.handle}
                              </Button>
        
            </Menu.Target>
            <Menu.Dropdown>

                        <Menu.Item
                                leftSection={<IconLogout size={17} />}
                                disabled={isPending} onClick={logout}
                              >
                                Logout
                              </Menu.Item>
            </Menu.Dropdown>
            </Menu>
             ):(
            <>
            <Button component={Link} href="/login">Login</Button>
            </>
             )}
             
          </Group>
        </ScrollArea>
      </Drawer>
      </Box>
    );
  }