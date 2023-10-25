
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import SignInWithLensButton from "@/components/SignInWithLensButton";
import { useActiveProfile, useActiveWallet, useWalletLogin } from "@lens-protocol/react-web";
import { useRouter } from "next/router";
import { Center, Container, Paper, Text, Loader, ActionIcon, UnstyledButton, Space, Group, Tooltip } from "@mantine/core";
import {
  ConnectWallet,
  useAddress,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";
import LoginExecuteButton from "@/components/LoginExecuteButton";
import { Polygon, Mumbai } from "@thirdweb-dev/chains";

const Login: NextPage = () => {
  const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();
  const router = useRouter();
  const { data: wallet, loading } = useActiveWallet();
  const activeProfile = useActiveProfile();


useEffect(() => {
  // Use the useRouter hook to programmatically navigate to the dashboard
  
  if (wallet && activeProfile?.data) {
    router.push('/dashboard');
  }
}, [wallet, activeProfile]);
   

  return (
    <>
     <Container>
    <Paper shadow="xl" radius="xl" withBorder p="xl">
        <Center>
            <Text size="xl" fw={900} fs="italic" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Welcome to Waves</Text>
            </Center>
            
           <Space h="md" />
           <Group justify="center">
          {/* Wallet connected, has profile on Lens. */}
          {wallet && activeProfile?.data ? (
  // Render content when both walletInfo and activeProfile data are available
  <>
  <Loader size={28} />
  </>
) : (
  // Render content when either walletInfo or activeProfile data is missing
  <>
    <Center>
        
      <SignInWithLensButton/>
     
              </Center>

   
  </>
)}


          
        </Group>
        
        {/* Wallet connected, but no Lens profile */}
          {wallet && !activeProfile?.data && (
            <>
<Space h="md" />
        <Center>
          <Text size="md" fw={500}>You don&rsquo;t have a Lens profile yet. 😞</Text>
        </Center>
             <Space h="md" />

     <Center>
         Waves requires you to have a Lens profile NFT.{" "}
              
    </Center>
     <Space h="md" />
     
     <Center>
                <Link
                  href="https://lens.xyz/"
                  target="_blank"
                  className="underline"
                >
                  Learn more
                </Link>
               </Center>
            </>
          )}
              <Space h="md" />
            
                
            
         <Space h="lg"/>
        
      </Paper>
      </Container>
    </>
  );
};

export default Login;
