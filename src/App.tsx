
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { shortenAddr } from "./lib/utils";

// 1. Get projectId
const projectId = import.meta.env.VITE_WALLETCONNECT_ID;

const sepolia = {
  chainId: 11155111,
  name: "Ethereum Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: import.meta.env.VITE_ETH_SEPOLIA_RPC_URL,
};

const metadata = {
  name: "Crowndfunding Interface",
  description: "A decentralized crowdfunding platform",
  url: "http://localhost:5173",
  icons: ["https://avatars.mywebsite.com/"],
}

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true
})

createWeb3Modal({
  ethersConfig,
  chains: [sepolia],
  projectId,
  enableAnalytics: true
});

export default function App() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  return (
    <>
      <button className="bg-slate-900 text-white py-2 px-3 rounded-lg hover:bg-slate-800 transition-colors"
        onClick={() => open()}
      >
        {isConnected ? `${shortenAddr(address)}` : "Connect Wallet"}
      </button>
    </>
  )
}
