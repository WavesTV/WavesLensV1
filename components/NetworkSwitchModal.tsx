import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "./ui/dialog";
import { useNetworkMismatch, useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import SignInWithLensButton from "./SignInWithLensButton";
import { useActiveWallet } from "@lens-protocol/react-web";
import { Center, Container, Group, Paper, Space, Text } from "@mantine/core";

const MODAL_DISPLAY_DELAY = 1000; // Set the delay time in milliseconds

export default function NetworkSwitchModal() {
  const router = useRouter();
  const address = useAddress();
  const wrongNetwork = useNetworkMismatch();
  const [openNetworkModal, setOpenNetworkModal] = useState<boolean>(false);
  const walletInfo = useActiveWallet();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!address || wrongNetwork || !walletInfo?.data) {
      if (router.pathname !== "/") {
        timeoutId = setTimeout(() => {
          setOpenNetworkModal(true);
        }, MODAL_DISPLAY_DELAY);
      }
    } else {
      setOpenNetworkModal(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [address, wrongNetwork, router.pathname, walletInfo?.data]);

  return (
    <>
    <Space h={55}/>
    <Dialog open={openNetworkModal}>
      <DialogContent>
        <Container>
        <Paper shadow="xl" radius="xl" withBorder p="xl">
        <DialogHeader>
          <Center>
        
      <Text fz="xl" fw={900} fs="italic" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 176 }}>Waves</Text>
      </Center>
          <Group justify="center">
          <Text fw={500} c="dimmed">Connect Your Wallet & Sign in with Lens</Text>
          </Group>
         
 <Space h="xl"/>
        
          <SignInWithLensButton />
        </DialogHeader>
       
        </Paper>
         </Container>
      </DialogContent>
    </Dialog>
    </>
  );
}
