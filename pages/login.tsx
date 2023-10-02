
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import SignInWithLensButton from "@/components/SignInWithLensButton";
import { useActiveProfile, useActiveWallet } from "@lens-protocol/react-web";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { Center, Container, Paper, Text, Button, ActionIcon, UnstyledButton, Space, Group, Tooltip } from "@mantine/core";

const Login: NextPage = () => {
  const router = useRouter();
  const walletInfo = useActiveWallet();
  const activeProfile = useActiveProfile();

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
              <Text c="dimmed" fw={500}>
                Waves requires you to have a Lens Profile NFT.{" "}
                <Link
                  href="https://lens.xyz/"
                  target="_blank"
                  className="underline"
                >
                  Learn more
                </Link>
                .
              </Text>
            </Center>
<Space h="md" />
            <Center>
              <Text c="dimmed" fw={500}>
  You don&apos;t have a Lens Profile yet. 😞
</Text>

              </Center>

              
            </>
          )}
              <Space h="md" />
            
                {walletInfo?.data && activeProfile?.data ? (
                  <Center>
                  <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }} onClick={() => router.push("/")}>
                    Continue to Waves
                  </Button>
                  </Center>
                ) : (
                  <Center>
                  <SignInWithLensButton />
                  </Center>
                )}
            
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
            <UnstyledButton component={Link} href='/dashboard'>
                <Text size="lg" fw={900} fs="italic">Get Started with your first stream!</Text>
            </UnstyledButton>
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
