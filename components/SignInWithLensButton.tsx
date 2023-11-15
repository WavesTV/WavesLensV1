
import {
  ConnectWallet,
  useAddress,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";
import React from "react";
import { Button, Loader } from "@mantine/core";
import { CHAIN } from "../const/chains";
import LoginExecuteButton from "./LoginExecuteButton";

export default function SignInWithLensButton() {
  const address = useAddress();
  const wrongNetwork = useNetworkMismatch();
  const switchChain = useSwitchChain();

 if (!address) {
    return (
      <ConnectWallet
        style={{
          width: "100%",
        }}
        auth={{
          loginOptional: true,
        }}
        theme="dark"
      />
    );
  }

  if (wrongNetwork) {
    return (
      <Button
        onClick={() => {
          switchChain(CHAIN.chainId);
        }}
      >
        Switch to {CHAIN.name}
      </Button>
    );
  }

  if (address) {
    return <LoginExecuteButton />;
  }

  return (
    <ConnectWallet
      theme="dark"
      auth={{
        loginOptional: true,
      }}
    />
  );
}