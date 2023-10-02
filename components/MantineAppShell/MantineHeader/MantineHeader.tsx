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
  } from '@tabler/icons-react';
import classes from './MantineHeader.module.css';
import Link from 'next/link';
import { GiWaveCrest } from 'react-icons/gi';
import { ColorSchemeToggle } from '../../ColorSchemeToggle';






  
  export function MantineHeader() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();

    
    
  

 
 
    
  
    return (
      <Box>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
          <Group>
          <Text size="xl" fw={900} fs="italic" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Waves</Text>
<Badge variant="filled" color="blue" radius="sm" className={classes.betaTag}>BETA</Badge>
</Group>
  
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
    <Tooltip label="Profile" withArrow  position="bottom" offset={3}>
    <ActionIcon
    component={Link}
    href="/dashboard"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      <IconUser />
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
            <Link   href="/user" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      <IconUser/>
    </ActionIcon>
    <Space w='md'/>
              Profile
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
      
          </Group>
        </ScrollArea>
      </Drawer>
      </Box>
    );
  }