import * as anchor from "@project-serum/anchor";
import idl from "../idls/idl.json"
export const fetchProjects = async (anchorWallet: anchor.Wallet,
    connection: anchor.web3.Connection
  ): Promise<any[]>=>{
    const provider = new anchor.Provider(connection, anchorWallet, {
        preflightCommitment: "recent",
      }
      )
    const program = new anchor.Program(
      idl as anchor.Idl, new anchor.web3.PublicKey("HARm9wjX7iJ1eqQCckXdd1imRFXE6PsVChVdV4PbfLc"), provider
      )
    const projects = await program.account.project.all();
    let pl: any[]  = []
    projects.forEach((p) => {
      console.log(p.account.name)
      pl.push( {
        name: p.account.name.toString(),
        number: p.account.availableOffset.toString(),
        price: p.account.offsetPrice.toString(),
        address: p.publicKey.toString(),
        owner: p.account.authority.toString(),
        description: p.account.description.toString(),
        image: p.account.pictureUrl.toString(),
      }
      
      
      )
    }
    )
    pl.sort((a, b)=>{
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1}
      if (x > y) {return 1}
      return 0;
    });
    return pl
      
    
  }
