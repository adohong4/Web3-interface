
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { shortenAddr } from "./lib/utils";
import { contractAddr } from "./contracts/contractData";
import { ExternalLink } from "lucide-react"

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
      <header className="container mx-auto py-2 px-2">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Crowndfunding</h1>
            <a href={`https://sepolia.etherscan.io/address/${contractAddr}`}
              target="_blank"
              className="text-sm hover:bg-gray-200 p-1 rounded-lg flex items-center gap-1"
            >
              {shortenAddr(contractAddr)}
              <ExternalLink className="w-3 h-4" />
            </a>
          </div>

          <button className="bg-slate-900 text-white py-2 px-3 rounded-lg hover:bg-slate-800 transition-colors text-sm"
            onClick={() => open()}
          >
            {isConnected ? `${shortenAddr(address)}` : "Connect Wallet"}
          </button>
        </div>
      </header>

    </>
  )
}
