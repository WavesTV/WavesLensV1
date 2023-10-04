
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import SignInWithLensButton from "@/components/SignInWithLensButton";
import { useActiveProfile, useActiveWallet, useWalletLogin } from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import { Center, Container, Paper, Text, Button, ActionIcon, UnstyledButton, Space, Group, Tooltip } from "@mantine/core";
import {
  ConnectWallet,
  useAddress,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";
import LoginExecuteButton from "@/components/LoginExecuteButton";
const Login: NextPage = () => {
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();
  const router = useRouter();
  const walletInfo = useActiveWallet();
  const activeProfile = useActiveProfile();

const address = useAddress();
console.log(walletInfo)
console.log("activeProfile" + activeProfile)


  return (
    <>
     <Container>
    <Paper shadow="xl" radius="xl" withBorder p="xl">
        <Center>
            <Text size="xl" fw={900} fs="italic" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Waves</Text>
            </Center>
            
           <Space h="md" />
        {/* Wallet connected, but no Lens profile */}
          {walletInfo?.data && !activeProfile?.data && (
            <>
          
              
         <Center>
              <Text size="md" fw={500}>Sorry, you dont have a Lens Profile.</Text>
              </Center>
             <Space h="md" />

              <Center>
        
      <SignInWithLensButton/>
     
              </Center>

              
            </>
          )}
              <Space h="md" />
            
                
            
         <Space h="lg"/>
        <Group justify="center">
          {/* Wallet connected, has profile on Lens. */}
          {walletInfo?.data && activeProfile?.data && (

            
            <>
            
            <Center>
              <Text size="xl" fw={900} fs="italic" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Welcome to Waves</Text>
              </Center>
             <Space h="md" />
                <Center>

                  <Tooltip label="Go to your dashboard">
            <Button component={Link} href='/dashboard'>
                <Text size="lg" fw={900} fs="italic">Get Started with your first stream</Text>
            </Button>
            </Tooltip>
              </Center>
              </>
          
               
          )}

          
        </Group>
      </Paper>
      </Container>
    </>
  );
};

export default Login;
