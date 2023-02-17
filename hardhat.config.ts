import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
};

const lazyImport = async (module: any) => {
  return await import(module);
};

task("test-interact", "Interact", async (taskArgs, hre) => {
  const ethers = hre.ethers;


  const ETHWrapperFactory = await ethers.getContractFactory("ETHWrapper");
  const provider = new ethers.providers.InfuraProvider("goerli", "b725c1ff0b9744ff8e3de11235e450cb");
  const wallet = new ethers.Wallet("fa606e52c79087211288f751ef50c9b1747587eb51c59fd23de3e8680e502ca2", provider);

  const balance = await wallet.getBalance();

  console.log(balance.toString())
  const wrapValue = ethers.utils.parseEther("1")

  const ETHWrapperContract = await ETHWrapperFactory.attach("0xed494Fba39989439486d7E79AbB44E9F1300C9f7");

  console.log(ETHWrapperContract.address)
  const code = await provider.getCode("0xed494Fba39989439486d7E79AbB44E9F1300C9f7")
  console.log(code)
  const wethAddress = await ETHWrapperContract.WETHToken();
   //const WETHContract = await WETHFactory.attach(wethAddress);
  return;
  // const ethers = hre.ethers;
  // const TestWrapperFactory = await ethers.getContractFactory("TestWrapper");
  // const WETHFactory = await ethers.getContractFactory("WETH");

  // const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
  // const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
  // const balance = await wallet.getBalance();

  // console.log(balance.toString());
  // const wrapValue = ethers.utils.parseEther("0.1")

  // const TestWrapperContract = await TestWrapperFactory.attach("0x8d72E668c0dA90A2f790fEd5bFaF5e8241a72D75");

  // console.log(TestWrapperContract);
  // //console.log(ETHWrapperContract.address)

  // const wethAddress = await TestWrapperContract.WETHToken();
  // const WETHContract = await WETHFactory.attach(wethAddress);
});

task("interact", "Interact").setAction(async () => {
  const { main, test } = await lazyImport("./scripts/interact");
  //await main();
  await test();
});

task("deploy", "Deploys the contract", async (taskArgs, hre) => {
  // console.log("Trying to deploy...");

  // const LimeToken = await hre.ethers.getContractFactory("LimeToken");
  // const lime = await LimeToken.deploy();

  // await lime.deployed();

  // console.log("LimeCoin deployed to:", lime.address);
  const ETHWrapperFactory = await hre.ethers.getContractFactory("ETHWrapper"); // 
  const ETHWrapperContract = await ETHWrapperFactory.deploy();
  console.log('Waiting for ETHWrapperContract deployment...');
  await ETHWrapperContract.deployed();
  console.log("ETHWrapper deployed to:", ETHWrapperContract.address);

  const TestWrapperFactory = await hre.ethers.getContractFactory("TestWrapper"); // 
  const TestWrapperContract = await TestWrapperFactory.deploy();
  await TestWrapperContract.deployed();
  console.log("TestWrapper deployed to:", TestWrapperContract.address); //0x5FbDB2315678afecb367f032d93F642f64180aa3

  //Goerli
  //ETHWrapper deployed to: 0xed494Fba39989439486d7E79AbB44E9F1300C9f7
  //TestWrapper deployed to: 0x8d72E668c0dA90A2f790fEd5bFaF5e8241a72D75
});

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    //defaultNetwork: "goerli",
    localhost: {
      allowUnlimitedContractSize: true,
    },
    hardhat: {},
    goerli: {
      url: "https://goerli.infura.io/v3/62349f810c5c46389814d8e614bd6ef9", //infura
      accounts: [
        "fa606e52c79087211288f751ef50c9b1747587eb51c59fd23de3e8680e502ca2" //metamask
      ],
    },
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
  },
  mocha: {
    timeout: 300000, // 300 seconds max for running tests
  },
};

export default config;
