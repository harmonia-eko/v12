
import { useMemo } from "react";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import "bootstrap/dist/css/bootstrap.min.css"
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
// import Registry from './Registry'
// import Home from './Home'
// import { NewProject } from "./NewProject";
import React from "react"
// import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
// import Login from "./Login"
// import PrivateRoute from "../components/PrivateRoute"
// import ForgotPassword from "./ForgotPassword"
// import ContactUs from ".//ContactUs";
// import AboutUs from ".//AboutUs";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
const treasury = new anchor.web3.PublicKey(process.env.REACT_APP_TREASURY_ADDRESS!);
const config = new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_CONFIG!);
const candyMachineId = new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID!);
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);
const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);
const txTimeout = 30000;
const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network })
    ],
    []
  );
  const wallet = useAnchorWallet()
  return (
    <div className='app'>

      <AuthProvider>
        <Navbar />

        <Footer />
      </AuthProvider>


    </div >
  );
};

export default App;
