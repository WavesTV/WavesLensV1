import { useActiveWallet } from "@lens-protocol/react-web";
import {
  ConnectWallet,
  useAddress,
  useNetworkMismatch,
  useSwitchChain,
  
} from "@thirdweb-dev/react";
import React from "react";
import { Button } from "@mantine/core";
import { CHAIN } from "../const/chains";
import LoginExecuteButton from "./LoginExecuteButton";
import { Polygon, Mumbai } from "@thirdweb-dev/chains";

export default function SignInWithLensButton() {
  const address = useAddress();
  const wrongNetwork = useNetworkMismatch();
  const switchChain = useSwitchChain();
  const walletInfo = useActiveWallet();
console.log("wrongNetwork" + wrongNetwork)


  if (wrongNetwork) {
    return (
      <Button
        variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        onClick={() => {
          switchChain(Polygon.chainId); 
        }}
      >
        Switch to {CHAIN.name}
      </Button>
    );
  }

  if (!walletInfo?.data) {
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
