<template>
  <div></div>
</template>

<script>
import { Connection, PublicKey } from '@solana/web3.js'
import { Program, Provider, web3 } from '@project-serum/anchor'
import idl from '../../target/idl/harmonia.json'

import { getPhantomWallet } from '@solana/wallet-adapter-wallets'
import { defineComponent } from '@nuxtjs/composition-api'
import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from '@solana/wallet-adapter-vue'
export default defineComponent({
  setup() {
    const wallets = [getPhantomWallet()]

    const { SystemProgram, Keypair } = web3
    /* create an account  */
    const baseAccount = Keypair.generate()
    const opts = {
      preflightCommitment: 'processed',
    }
    const programID = new PublicKey(idl.metadata.address)

    const wallet = useWallet()

    async function getProvider() {
      /* create the provider and return it to the caller */
      /* network set to local network for now */
      const network = 'http://127.0.0.1:8899'
      const connection = new Connection(network, opts.preflightCommitment)

      const provider = new Provider(
        connection,
        wallet,
        opts.preflightCommitment
      )
      return provider
    }

    async function createCounter() {
      const provider = await getProvider()
      /* create the program interface combining the idl, program ID, and provider */
      const program = new Program(idl, programID, provider)
      try {
        /* interact with the program via rpc */
        await program.rpc.create({
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [baseAccount],
        })

        const account = await program.account.baseAccount.fetch(
          baseAccount.publicKey
        )
        console.log('account: ', account)
        setValue(account.count.toString())
      } catch (err) {
        console.log('Transaction error: ', err)
      }
    }

    async function increment() {
      const provider = await getProvider()
      const program = new Program(idl, programID, provider)
      await program.rpc.increment({
        accounts: {
          baseAccount: baseAccount.publicKey,
        },
      })

      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      )
      console.log('account: ', account)
      setValue(account.count.toString())
    }
  },
})
</script>

<style lang="scss" scoped>
</style>