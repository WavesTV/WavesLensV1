
import {
  ConnectWallet,
  useAddress,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import { CHAIN } from "../const/chains";
import LoginExecuteButton from "./LoginExecuteButton";

export default function SignInWithLensButton() {
 const address = useAddress();
  const wrongNetwork = useNetworkMismatch();
  const switchChain = useSwitchChain();

  useEffect(() => {
    if (wrongNetwork) {
      switchChain(CHAIN.chainId);
    }
  }, [wrongNetwork, switchChain]);

  if (!address) {
    return (
      <ConnectWallet
        style={{ width: "100%" }}
        auth={{ loginOptional: true }}
        theme="dark"
      />
    );
  }

  if (address) {
    return <LoginExecuteButton />;
  }

  return (
    <ConnectWallet
      theme="dark"
      auth={{ loginOptional: true }}
    />
  );
}