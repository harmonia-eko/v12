import * as assert from 'assert';
import * as anchor from '@project-serum/anchor';
import { web3 } from '@project-serum/anchor';
import { ensureBalance, getHarmoniaProgram } from './helper';

function toSOL(lamport: number) {
    return lamport / web3.LAMPORTS_PER_SOL;
}


describe("harmonia-test-suite", () => {

    let _projectAccount: anchor.web3.Keypair = null;

    const provider = anchor.Provider.env();
    anchor.setProvider(provider);

    const sellerAccount = anchor.web3.Keypair.generate();
    const projectAccount = anchor.web3.Keypair.generate();
    const buyerAccount = anchor.web3.Keypair.generate();

    const program = getHarmoniaProgram(provider);

    const projectDescription = "The proposed project activity is to treat the manure and wastewater from swine farms of Muyuan Foods Co.,Ltd., in Nanyang City, Henan Province (hereafter refer to as Muyuan) which consists fourteen subsidiary swine farms.";
    const projectPicture = "https://live.staticflickr.com/4133/4841550483_72190f5368_b.jpg";


    console.log(`Connecting to ${provider.connection["_rpcEndpoint"]}`);

    before('Print info', async () => {
        const harmoniaBalance = await ensureBalance(provider, provider.wallet.publicKey, 5);
        let sellerWallet = await ensureBalance(provider, sellerAccount.publicKey, 5);
        let buyerWallet = await ensureBalance(provider, buyerAccount.publicKey, 5);
        console.log(`Harmonia wallet is ${provider.wallet.publicKey.toBase58()}`);
        console.log(`Wallet balance is ${toSOL(harmoniaBalance)}`);
        console.log(`Seller account is ${sellerAccount.publicKey.toBase58()}`);
        console.log(`Seller wallet balance is ${toSOL(sellerWallet)}`);
        console.log(`Buyer account is ${buyerAccount.publicKey.toBase58()}`);
        console.log(`Buyer wallet balance is ${toSOL(buyerWallet)}`);
        console.log(`Project account is ${projectAccount.publicKey.toBase58()}`);
        assert.ok(true);
    });


    it('Create a project (500 offsets / 2000 lamports each offset)', async () => {

        const tx = await program.rpc.create(new anchor.BN(500), new anchor.BN(2000), "AmazingSolarFarm", projectDescription, projectPicture, {
            accounts: {
                project: projectAccount.publicKey,
                seller: sellerAccount.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers: [projectAccount, sellerAccount],
        });

        // Fetch the newly created account from the cluster.
        const account = await program.account.project.fetch(projectAccount.publicKey);
        assert.equal(account.name, "AmazingSolarFarm");
        assert.equal(account.availableOffset.toNumber(), 500);
        assert.equal(account.totalOffset.toNumber(), 500);
        assert.equal(account.offsetPrice.toNumber(), 2000);
        assert.equal(account.description, projectDescription);
        assert.equal(account.pictureUrl, projectPicture);
    });


    it('Buy 10 offsets', async () => {

        const sellerBalance0 = await provider.connection.getBalance(sellerAccount.publicKey);
        const buyerBalance0 = await provider.connection.getBalance(buyerAccount.publicKey);

        const tx = await program.rpc.buy(new anchor.BN(10), {
            accounts: {
                project: projectAccount.publicKey,
                buyer: buyerAccount.publicKey,
                seller: sellerAccount.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            },
            signers: [buyerAccount],
        });

        // Fetch the project from the cluster.
        const account = await program.account.project.fetch(projectAccount.publicKey);
        assert.equal(account.availableOffset.toNumber(), 490);
        assert.equal(account.totalOffset.toNumber(), 500);
        assert.equal(account.offsetPrice.toNumber(), 2000);

        const sellerBalance1 = await provider.connection.getBalance(sellerAccount.publicKey);
        const buyerBalance1 = await provider.connection.getBalance(buyerAccount.publicKey);
        const sellerTake = sellerBalance1 - sellerBalance0;
        const buyerGive = buyerBalance1 - buyerBalance0;
        const expectedTransfer = 10 * 2000;

        assert.equal(sellerTake, expectedTransfer);
        assert.equal(buyerGive, -expectedTransfer);
    });




    it('Not a real test. Just check some api call', async () => {

        let connection = provider.connection;
        let programId = program.programId as web3.PublicKey;

        let accounts = await connection.getProgramAccounts(programId);
        console.log("Total accounts after test: " + accounts.length);
        accounts.forEach((account, idx) => {
            console.log(`Account ${idx} => ${account.pubkey.toBase58()}`);
        });

        let signatures : Array<string> = [];
        let confirmedSignatures = await connection.getSignaturesForAddress(projectAccount.publicKey, {}, "confirmed");
        console.log(`Total confirmed transaction on ${projectAccount.publicKey} : ${confirmedSignatures.length}`)
        confirmedSignatures.forEach((sign, idx) => {
            signatures.push(sign.signature);
            console.log(`Sign ${idx} => ${sign.signature}`);
        });

        let transaction = await connection.getTransaction(confirmedSignatures[0].signature, { commitment: "confirmed" });
        console.log(`1rst transaction ${transaction}`);

        let instructionCoder = (program as anchor.Program).coder.instruction;
        let transactions = await connection.getParsedConfirmedTransactions(signatures, "confirmed");
        transactions.forEach((tx, idx) => {
            console.log(`Tx ${idx}`);
            tx.transaction.message.instructions.forEach((instruction : web3.PartiallyDecodedInstruction) => {
                let decoded = instructionCoder.decode(instruction.data, "base58");
                let data = decoded.data as any;
                if(decoded.name == "buy") {
                    console.log(`buy ${data.amount.toString()}`);
                } else {
                    console.log(`${decoded.name}`);
                }
            });
        });

        assert.ok(true);
    });
});