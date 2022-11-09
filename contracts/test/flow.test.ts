import { expect } from "chai";
import { Signer, BigNumber, constants } from "ethers";
import { ethers } from "hardhat";

import {
    Lend__factory,
    Stake__factory,
    USDCToken__factory,
    Lend,
    Stake,
    USDCToken,
} from "../typechain";

const ZERO = BigNumber.from(0).toBigInt();

const LEND_AMT = BigNumber.from(10_000).mul(BigNumber.from(10).pow(18));
const STAKE_AMT = BigNumber.from(100).mul(BigNumber.from(10).pow(18));
const VOTE_AMT = BigNumber.from(10).mul(BigNumber.from(10).pow(18));

const PRINCIPAL = BigNumber.from(10000).mul(BigNumber.from(10).pow(18));
const TOTAL_AMT = BigNumber.from(11000).mul(BigNumber.from(10).pow(18));
const ROI = BigNumber.from(10 * 1000);

describe("AGRICOLA", function () {
    let lendContract: Lend;
    let stakeContract: Stake;
    let USDCToken: USDCToken;
    let governance: Signer;
    let borrower: Signer;
    let staker: Signer;
    let lender: Signer;

    let loanId: BigNumber;

    before(async function () {
        [governance, borrower, staker, lender] = await ethers.getSigners();

        USDCToken = await (
            (await ethers.getContractFactory(
                "USDCToken",
                governance
            )) as USDCToken__factory
        ).deploy();

        USDCToken.faucet(await lender.getAddress(), LEND_AMT);

        lendContract = await (
            (await ethers.getContractFactory(
                "Lend",
                governance
            )) as Lend__factory
        ).deploy();

        await Promise.all(
            [lender, staker, borrower].map((who) =>
                USDCToken.connect(who).approve(
                    lendContract.address,
                    constants.MaxUint256
                )
            )
        );

        await lendContract
            .connect(governance)
            .addAllowedTokens(USDCToken.address);
        await lendContract
            .connect(governance)
            .updateMultiplier(USDCToken.address, 1000);

        stakeContract = await (
            (await ethers.getContractFactory(
                "Stake",
                governance
            )) as Stake__factory
        ).deploy(USDCToken.address, lendContract.address);
        await lendContract
            .connect(governance)
            .updateAuth(stakeContract.address, true);

        expect(
            (await USDCToken.balanceOf(await lender.getAddress())).gt(0)
        ).to.be.true;
        expect(
            (await USDCToken.balanceOf(await staker.getAddress())).eq(0)
        ).to.be.true;
        expect(
            (await USDCToken.balanceOf(await borrower.getAddress())).eq(0)
        ).to.be.true;
    });

    it("lend tokens", async () => {
        await lendContract
            .connect(lender)
            .lendTokens(LEND_AMT, USDCToken.address);

        const lenderBalanceAfterLending = await USDCToken.balanceOf(
            await lender.getAddress()
        );
        expect(lenderBalanceAfterLending).to.be.equal(ZERO);

        const lenderSharesBalanceAfterLending = await lendContract.balanceOf(
            await lender.getAddress()
        );
        expect(lenderSharesBalanceAfterLending).to.be.equal(
            await lendContract.getSharesToMint(USDCToken.address, LEND_AMT)
        );
    });

    it("stake tokens", async () => {
        await USDCToken.faucet(await staker.getAddress(), STAKE_AMT);

        await stakeContract
            .connect(staker)
            .stakeTokens(USDCToken.address, STAKE_AMT);

        const balance = await USDCToken.balanceOf(await staker.getAddress());
        expect(balance.eq(ZERO)).to.be.true;
        const shares = await lendContract.balanceOf(await staker.getAddress());
        expect(shares.gt(ZERO)).to.be.true;
    });

    it("createLoanRequest", async () => {
        const blockNum = await ethers.provider.getBlockNumber();
        const block = await ethers.provider.getBlock(blockNum);

        await lendContract.createBorrowRequest(
            USDCToken.address,
            PRINCIPAL,
            ROI,
            TOTAL_AMT,
            block.timestamp + 7200,
            1,
            await borrower.getAddress(),
            "" // ipfs hash
        );
        loanId = (await lendContract.loanId()).sub(1);
        await Promise.all(
            [lender, staker, borrower].map((who) =>
                USDCToken.connect(who).approve(
                    lendContract.address,
                    constants.MaxUint256
                )
            )
        );
    });

    it("vote", async () => {
        await stakeContract.connect(staker).vote(loanId, VOTE_AMT);

        const stakerBalance = await lendContract.balanceOf(
            await staker.getAddress()
        );

        expect(stakerBalance.eq(STAKE_AMT.sub(VOTE_AMT)));
    });

    it("payback", async () => {
        await USDCToken.faucet(await borrower.getAddress(), TOTAL_AMT);
        let balance = await USDCToken.balanceOf(await borrower.getAddress());
        expect(balance.gte(TOTAL_AMT));
        await lendContract.connect(borrower).payBack(loanId);
        expect(balance.eq(ZERO));

        expect((await lendContract.loans(loanId)).repaid === true);
    });

    it("liquidate", async () => {
        const blockNum = await ethers.provider.getBlockNumber();
        const block = await ethers.provider.getBlock(blockNum);

        await lendContract.createBorrowRequest(
            USDCToken.address,
            PRINCIPAL,
            ROI,
            TOTAL_AMT,
            block.timestamp + 7200,
            1,
            await borrower.getAddress(),
            "" // ipfs hash
        );
        loanId = (await lendContract.loanId()).sub(1);
        await USDCToken.faucet(await staker.getAddress(), STAKE_AMT);
        await stakeContract.connect(staker).vote(loanId, VOTE_AMT);

        await ethers.provider.send("evm_increaseTime", [
            block.timestamp + 7201,
        ]);

        await lendContract.liquidateLoan(loanId);
    });

    it("withdraw lent tokens", async () => {
        let shares = await lendContract.balanceOf(await lender.getAddress());
        expect(shares.gt(ZERO)).to.be.true;

        await lendContract
            .connect(lender)
            .withdrawShares(USDCToken.address, LEND_AMT);

        const tokenBalance = await USDCToken.balanceOf(
            await lender.getAddress()
        );
        expect(tokenBalance.gt(ZERO)).to.be.true;

        shares = await lendContract.balanceOf(await lender.getAddress());
        expect(shares.eq(ZERO)).to.be.true;
    });
});
