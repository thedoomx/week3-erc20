import { ethers } from "hardhat";

const run = async function () {

    const ETHWrapperFactory = await ethers.getContractFactory("ETHWrapper");
    const provider = new ethers.providers.InfuraProvider("<network>", "<Infura API KEY>");
    const wallet = new ethers.Wallet("<Private Key>", provider);
    const balance = await wallet.getBalance();

    console.log(balance.toString())
    const wrapValue = ethers.utils.parseEther("1")

    const ETHWrapperContract = await ETHWrapperFactory.attach("<Your ETHWrapper address>");

    console.log(ETHWrapperContract.address)

    const WETHFactory = await ethers.getContractFactory("WETH");
    const wethAddress = await ETHWrapperContract.WETHToken();

    const WETHContract = await WETHFactory.attach(wethAddress)

}
run();