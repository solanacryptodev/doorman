require('dotenv').config();
const anchor = require('@project-serum/anchor');
const utf8 = anchor.utils.bytes.utf8;

const DOORMAN_SEED = "doorman";

// the mint that's used across doorman + candymachine
console.log('process.env.REACT_APP_MINT: ', process.env.REACT_APP_MINT);
const CANDYMACHINE_PROGRAM = new anchor.web3.PublicKey(process.env.REACT_APP_CANDYMACHINE_PROGRAM);


// candy machine
const CANDYMACHINE_ID = new anchor.web3.PublicKey(process.env.REACT_APP_CANDYMACHINE_ID);

// doorman config
const DOORMAN_CONFIG = new anchor.web3.PublicKey(process.env.REACT_APP_DOORMAN_CONFIG);
const DOORMAN_TREASURY = new anchor.web3.PublicKey(process.env.REACT_APP_DOORMAN_TREASURY);
const DOORMAN_WHITELIST = new anchor.web3.PublicKey(process.env.REACT_APP_DOORMAN_WHITELIST);
const DOORMAN_INITIALIZOR_TOKEN_ACCOUNT = new anchor.web3.PublicKey(process.env.DOORMAN_INITIALIZOR_TOKEN_ACCOUNT);

// the mint used between cm & doorman
const MINT = new anchor.web3.PublicKey(process.env.REACT_APP_MINT);


async function getMintTokenVaultAddress() {
   const [mintTokenVault, mintTokenVaultBump] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode(DOORMAN_SEED), MINT.toBuffer()],
      program.programId
   );
   return mintTokenVault;
}

const provider = anchor.Provider.env();
anchor.setProvider(provider);
const program = anchor.workspace.Doorman;

async function showConfig() {
   let accountData = await program.account.config.fetch(DOORMAN_CONFIG);
   accountData.costInLamports = accountData.costInLamports.toString();
   accountData.authority = accountData.authority.toString();
   accountData.treasury = accountData.treasury.toString();
   accountData.mintTokenVaultAddress = accountData.mintTokenVault.toString();
   accountData.goLiveDate = new Date(accountData.goLiveDate.toNumber() * 1000);
   accountData.mint = accountData.mint.toBase58();
   console.log("\n >> config account data: ", accountData);
   return accountData;
}

const txTimeout = 30000;

module.exports = {
   CANDYMACHINE_PROGRAM,
   CANDYMACHINE_ID,
   DOORMAN_INITIALIZOR_TOKEN_ACCOUNT,
   DOORMAN_WHITELIST,
   DOORMAN_SEED,
   DOORMAN_CONFIG,
   MINT,
   DOORMAN_TREASURY,
   getMintTokenVaultAddress,
   provider,
   program,
   showConfig,
   txTimeout
};
