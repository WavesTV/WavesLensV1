import { useLogin, useProfiles, profileId } from "@lens-protocol/react-web";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import React from "react";
import { Button } from "@mantine/core";

export default function LoginExecuteButton() {
  const { execute: login, loading: isLoginPending } = useLogin();
  const address = useAddress();
  const { data: ownedProfiles } = useProfiles({
    where: {
      ownedBy: address && [address], // Wrap address in an array
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
    <Button
      onClick={async () => {
        await login({
          address: address,
          profileId: ownedProfiles && ownedProfiles[0].id,
        });
      }}
    >
      Sign In with Lens
    </Button>
  );
}
