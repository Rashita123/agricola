import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { Master__factory, USDCToken__factory } from "../typechain";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { ethers } = hre;
    const [governance, lender, borrower, staker] = await ethers.getSigners();

    const usdc = await (
        (await ethers.getContractFactory(
            "USDCToken",
            governance
        )) as USDCToken__factory
    ).deploy();

    console.log("usdc deployed at", usdc.address);

    const master = await (
        (await ethers.getContractFactory(
            "Master",
            governance
        )) as Master__factory
    ).deploy(usdc.address);

    console.log(master.address);

    const addresses = [
        "0xA1d1906A97e0140E5B5f75645d4d73CC982F5289",
        "0x58d1D3400cD08E22983cbC2C0AE9AaE13cc5efef",
        "0x942b11311e862AAA45d8047A94f8063620C72b8e",
        "0x942b11311e862AAA45d8047A94f8063620C72b8e",
    ];

    await Promise.all(
        addresses.map((a) =>
            governance.sendTransaction({
                to: a,
                value: ethers.utils.parseEther("1"),
            })
        )
    );

    await Promise.all(
        addresses.map((a) => usdc.faucet(a, ethers.utils.parseEther("1000")))
    );

    await Promise.all(
        addresses.map((a) => master.mint(a, ethers.utils.parseEther("10")))
    );
};

export default func;
