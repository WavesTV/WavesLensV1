import { useWalletLogin } from "@lens-protocol/react-web";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import React from "react";
import { Button } from "@mantine/core";

export default function LoginExecuteButton() {
  const loginFunction = useWalletLogin();
  const address = useAddress();

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
    variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
      onClick={() => {
        loginFunction?.execute({
          address: address,
        });
      }}
    >
      Sign in with Lens
    </Button>
  );
}
