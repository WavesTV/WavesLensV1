import { useLogin, useProfiles, profileId } from "@lens-protocol/react-web";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import {
  Button,
  Paper,
  Text,
  Avatar,
  Group,
  Space,
  Tooltip,
  Center,
} from "@mantine/core";
import { LuLogIn } from "react-icons/lu";
import { useRouter } from "next/router";

export default function LoginExecuteButton() {
  const { execute: login, loading: isLoginPending, data } = useLogin();
  const address = useAddress();
  const router = useRouter();

  const { data: ownedProfiles } = useProfiles({
    where: {
      ownedBy: address ? [address] : [], // Wrap address in an array
    },
  });

  if (!address)
    return (
      <ConnectWallet
        auth={{
          loginOptional: true,
        }}
      />
    );

  return (
    <div>
      {ownedProfiles && ownedProfiles.length > 0 ? (
        ownedProfiles.map((profile) => (
          <>
            <React.Fragment key={profile.id}>
              <Paper shadow="lg" radius="md" withBorder p="sm" key={profile.id}>
                <Group justify="space-between" wrap="nowrap">
                  <Avatar
                    // @ts-ignore
                    src={
                      profile.metadata?.picture ||
                      "https://gw.ipfs-lens.dev/ipfs/bafybeidkewnnnisaqmwk7ornt6fymjddlkhlou2tsfhaxxnird4w4yrebe"
                    }
                    alt={`${profile.handle?.localName}'s profile`}
                    radius="md"
                  />

                  <div>
                    <Text size="sm" fw={500}>
                      {profile.metadata?.displayName}
                    </Text>
                    <Text c="dimmed" size="xs">
                      @{profile.handle?.localName}
                    </Text>
                  </div>

                  <Space w={55} />

                  <Tooltip label="Sign into Lens">
                    <Button
                      onClick={async () => {
                        await login({
                          address: address,
                          profileId: profile.id,
                        });
                      }}
                      variant="light"
                      size="compact-md"
                    >
                      <LuLogIn />
                    </Button>
                  </Tooltip>
                </Group>
              </Paper>
            </React.Fragment>
            <Space h="md" />
          </>
        ))
      ) : (
        <Paper shadow="lg" radius="sm" withBorder p="sm">
          <Center>
            <ConnectWallet
              auth={{
                loginOptional: true,
              }}
            />
          </Center>

          <Space h="md" />

          <Text size="md">
            You do not have any Lens Profiles. Please create or acquire a
            profile to proceed.
          </Text>
        </Paper>
      )}
    </div>
  );
}
