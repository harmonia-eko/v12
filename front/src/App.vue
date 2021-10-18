<template>
 


    <wallet-provider :wallets="wallets" auto-connect>
        <div>
            <div class="fixed top-0 right-0 p-8">
                <wallet-modal-provider>
                    <wallet-multi-button></wallet-multi-button>
                </wallet-modal-provider>
            </div>
            <router-view/>
        </div>
    </wallet-provider>
</template>

    


<script lang="ts" setup>
import {
    getPhantomWallet,
    getBitpieWallet,
    getBloctoWallet,
    getCoin98Wallet,
    getLedgerWallet,
    getMathWallet,
    getSlopeWallet,
    getSolflareWallet,
    getSolflareWebWallet,
    getSolletWallet,
    getSolletExtensionWallet,
    getSolongWallet,
    getTorusWallet,
} from '@solana/wallet-adapter-wallets'
import { WalletMultiButton, WalletModalProvider } from './vue-ui'
const wallets = [
    getPhantomWallet(),
    getBitpieWallet(),
    getBloctoWallet(),
    getCoin98Wallet(),
    getLedgerWallet(),
    getMathWallet(),
    getMathWallet(),
    getSlopeWallet(),
    getSolflareWallet(),
    getSolflareWebWallet(),
    getSolletWallet(),
    getSolletExtensionWallet(),
    getSolongWallet(),
    
]
// import { initWallet, useWallet } from "@solana/wallet-adapter-vue";
// import { getPhantomWallet, WalletName } from "@solana/wallet-adapter-wallets";
import { defineComponent, onBeforeMount } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    onBeforeMount(() => {
      console.log("baam");

      // const wallets = [getPhantomWallet()];
      // initWallet({ wallets, autoConnect: true });
      // const { select } = useWallet();

      // select(WalletName.Phantom);
    });
  },
});
</script>