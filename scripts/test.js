const { ethers } = require("ethers");

async function main() {
    console.log("Test...");
        const TestWrapperFactory = await ethers.getContractFactory("TestWrapper");
        const WETHFactory = await ethers.getContractFactory("WETH");
    
        const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
        const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
        const balance = await wallet.getBalance();
    
        console.log(balance.toString());
        const wrapValue = ethers.utils.parseEther("0.1")

        const TestWrapperContract = await TestWrapperFactory.attach("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    
        console.log(TestWrapperContract);
        //console.log(ETHWrapperContract.address)
    
        const wethAddress = TestWrapperContract.WETHToken();
        const WETHContract = await WETHFactory.attach(wethAddress);
    }
    main()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });