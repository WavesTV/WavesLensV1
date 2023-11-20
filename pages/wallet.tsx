import {
  Space,
  Center,
  Text,
  Paper,
  Divider,
  Group,
  Button,
  Container,
} from "@mantine/core";
import { useSession } from "@lens-protocol/react-web";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { GiWaveCrest } from "react-icons/gi";
import { useRouter } from "next/router";

export default function Wallet() {
  const address = useAddress();
  const router = useRouter();
  return (
    <>
      <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
              Wallet
            </Text>
          </>
        }
        labelPosition="center"
      />

      <Space h="lg" />
      {address ? (
        <>
          <Group justify="center">
            <ConnectWallet
              theme="dark"
              auth={{
                loginOptional: true,
              }}
            />
          </Group>
        </>
      ) : (
        <>
          <Container size="30rem" px={0}>
            <Paper shadow="xl" p="lg" withBorder>
              <Center>
                <Text size="md" fw={400}>
                  Connect your Wallet to view it.
                </Text>
              </Center>
              <Space h="md" />
              <Center>
                <Button
                  fullWidth
                  leftSection={<GiWaveCrest size="1rem" />}
                  variant="gradient"
                  gradient={{ from: "cyan", to: "indigo" }}
                  onClick={() => router.push("/login")}
                >
                  Connect Wallet
                </Button>
              </Center>
            </Paper>
          </Container>
        </>
      )}
      <Space h="lg" />
      <Center>
        <iframe
          title="heroswap"
          width="50%"
          style={{
            border: "none",
            borderRadius: "22px",
            minHeight: "50vh",
          }}
          src="https://heroswap.com/widget?affiliateAddress=BC1YLfjx3jKZeoShqr2r3QttepoYmvJGEs7vbYx1WYoNmNW9FY5VUu6"
        />
      </Center>
    </>
  );
}
