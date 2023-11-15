import { Space, Center, Text, Group, Divider } from "@mantine/core";
import { useSession } from "@lens-protocol/react-web";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function Wallet() {
  const session = useSession();
  console.log(session);
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
      {session?.data?.address && (
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
