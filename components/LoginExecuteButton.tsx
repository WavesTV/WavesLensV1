import { useWalletLogin, useActiveWallet } from "@lens-protocol/react-web";
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
      onClick={() => {
        loginFunction?.execute({
          address: address,
        });
      }}
    >
      Sign In
    </Button>
  );
}
