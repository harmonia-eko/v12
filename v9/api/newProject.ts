import * as anchor from "@project-serum/anchor";
import idl from "../idls/idl.json"
import {AnchorWallet} from "@solana/wallet-adapter-react/lib/useAnchorWallet"

export const newProject =async(name: string, number:number, price:number, anchorWallet: AnchorWallet,
    
    connection: anchor.web3.Connection,image:string,description:string
  ): Promise<string>=>{
    const provider = new anchor.Provider(connection, anchorWallet, {
        preflightCommitment: "recent",
      });
      
    
    const program = new anchor.Program(idl as anchor.Idl, new anchor.web3.PublicKey("HARm9wjX7iJ1eqQCckXdd1imRFXE6PsVChVdV4PbfLc"), provider);

    const projectAccount = anchor.web3.Keypair.generate();

    
     const tx =await program.rpc.create(
      new anchor.BN(number),
      new anchor.BN(price),
      name,
      "this is a test project",
      "https://images.unsplash.com/photo-1464550838636-1a3496df938b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHxhttps://harmonia-eko.ghost.io/content/images/size/w2000/2021/10/eddy-klaus-BHNxfaeNCTI-unsplash-1.jpg8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1630&q=80",
      {
        accounts: {
          project: projectAccount.publicKey,
          seller: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },

        signers: [projectAccount],
      }
    );
    return tx
  } 