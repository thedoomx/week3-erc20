import { ethers } from "hardhat";

export async function main() {

    const ETHWrapperFactory = await ethers.getContractFactory("ETHWrapper");
    const WETHFactory = await ethers.getContractFactory("WETH");

    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
    const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
    const balance = await wallet.getBalance();

    console.log(balance.toString()) //9999994071390232423833
    const wrapValue = ethers.utils.parseEther("0.1")
    const code = await provider.getCode("0x5FbDB2315678afecb367f032d93F642f64180aa3")

    const ETHWrapperContract = await ETHWrapperFactory.attach("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");

    //console.log(ETHWrapperContract);
    //console.log(ETHWrapperContract.address)

    const wethAddress = await ETHWrapperContract.WETHToken();
    const WETHContract = await WETHFactory.attach(wethAddress);


    const tx = await ETHWrapperContract.wrap({ value: wrapValue });
    await tx.wait();
    let contractETHBalance = await provider.getBalance(ETHWrapperContract.address);
    console.log("Contract ETH balance after wrapping:", contractETHBalance.toString());


    return;
    //console.log(code);
    //const wethAddress = await ETHWrapperContract.WETHToken();
    //const WETHContract = await WETHFactory.attach(wethAddress);
    //console.log(WETHContract);
}