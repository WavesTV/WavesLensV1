import React, { useEffect, useState } from "react";

import { useNetworkMismatch, useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import SignInWithLensButton from "./SignInWithLensButton";
import { Center, Container, Group, Paper, Space, Text } from "@mantine/core";

const MODAL_DISPLAY_DELAY = 1000; // Set the delay time in milliseconds

export default function NetworkSwitchModal() {
  const router = useRouter();
  const address = useAddress();
  const wrongNetwork = useNetworkMismatch();
  const [openNetworkModal, setOpenNetworkModal] = useState<boolean>(false);

  useEffect(() => {
    if (!address || wrongNetwork) {
      if (router.pathname !== "/") {
        setOpenNetworkModal(true);
      } else {
        setOpenNetworkModal(false);
      }
    }
  }, [address, wrongNetwork, router.pathname]);

  return (
    <>
      <Space h={55} />

      <Container>
        <Paper shadow="xl" radius="xl" withBorder p="xl">
          <Center>
            <Text
              fz="xl"
              fw={900}
              fs="italic"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 176 }}
            >
              Waves
            </Text>
          </Center>
          <Group justify="center">
            <Text fw={500} c="dimmed">
              Connect Your Wallet & Sign in with Lens
            </Text>
          </Group>

          <Space h="xl" />
          <Center>
            <SignInWithLensButton />
          </Center>
        </Paper>
      </Container>
    </>
  );
}
