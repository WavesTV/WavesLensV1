import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { EthersWallet, PrivateKeyWallet } from "@thirdweb-dev/wallets";
import { ethers } from "ethers";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  // Use the domain from the environment or default to evmkit.com
  domain: "waves-lensv1.vercel.app",

  // Use the private key from the environment or generate a random one
  wallet: "uI4kVapLEYRj_LF7RTreiPdi5hcb3doHLTFrsJRPPkOsv9ETkgzDZKpeUA32_SXMeE4eq5fJxrS8IcYBfA9PBA"
    ? new PrivateKeyWallet("uI4kVapLEYRj_LF7RTreiPdi5hcb3doHLTFrsJRPPkOsv9ETkgzDZKpeUA32_SXMeE4eq5fJxrS8IcYBfA9PBA")
    : new EthersWallet(ethers.Wallet.createRandom()),
});

export default ThirdwebAuthHandler();
