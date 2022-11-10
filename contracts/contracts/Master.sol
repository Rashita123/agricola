// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {ERC20} from "./ERC20.sol";
import "hardhat/console.sol";

contract Master {
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    string public name = "FARMLOAN";
    string public symbol = "FML";
    uint8 public decimals = 18;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    function transfer(address recipient, uint256 amount)
        external
        returns (bool)
    {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool) {
        // allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint(address who, uint256 amount) public {
        balanceOf[who] += amount;
        totalSupply += amount;
        emit Transfer(address(0), who, amount);
    }

    function burn(address who, uint256 amount) public {
        balanceOf[who] -= amount;
        totalSupply -= amount;
        emit Transfer(who, address(0), amount);
    }

    uint256 public constant MIN_VOTES = 1;

    ERC20 public usdc;

    mapping(address => uint256) public amountLent;

    constructor(address _token) {
        usdc = ERC20(_token);
        usdc.mint(address(this), 1e23);
    }

    function lend(uint256 amount) public {
        console.log("lend called with amount", amount);
        usdc.transferFrom(msg.sender, address(this), amount);
        amountLent[msg.sender] += amount;
    }

    function unlend(uint256 amount) public {
        if (usdc.balanceOf(address(this)) < amount) {
            usdc.mint(address(this), amount - usdc.balanceOf(address(this)));
        }
        usdc.transferFrom(address(this), msg.sender, amount);
        unchecked {
            amountLent[msg.sender] -= amount;
        }
    }

    mapping(address => uint256) public staked;
    mapping(address => uint256) public withdrawableStake;

    function stake(uint256 amount) public {
        this.transferFrom(msg.sender, address(this), amount);
        staked[msg.sender] += amount;
        withdrawableStake[msg.sender] += amount;
    }

    function unStake(uint256 amount) public {
        staked[msg.sender] -= amount;
        withdrawableStake[msg.sender] -= amount;
        transferFrom(address(this), msg.sender, amount);
    }

    struct Loan {
        uint256 principal;
        uint256 loanTerm;
        uint256 roi;
        uint256 totalAmount;
        string info;
        string typeOfLoan;
        address borrower;
        uint256 currentVoteCount;
        uint256 totalVotesRequired;
        bool active;
        bool paid;
        bool approved;
        bool repayed;
        bool liquidated;
    }
    uint256 public LOAN_ID;
    mapping(uint256 => Loan) public loans;

    function createLoan(
        uint256 principal,
        uint256 loanTerm,
        uint256 roi,
        uint256 totalAmount,
        string memory info,
        string memory typeOfLoan
    ) external {
        Loan memory newLoan = Loan(
            principal,
            loanTerm,
            roi,
            totalAmount,
            info,
            typeOfLoan,
            msg.sender,
            0,
            1,
            true,
            false,
            false,
            false,
            false
        );
        loans[LOAN_ID++] = newLoan;
    }

    mapping(uint256 => address[]) public voters;

    function logVote(uint256 loanId, uint256 amount) external {
        Loan storage loan = loans[loanId];

        this.transferFrom(msg.sender, address(this), amount);

        withdrawableStake[msg.sender] -= amount;
        voters[loanId].push(msg.sender);
        loan.currentVoteCount++;

        if (loan.currentVoteCount >= MIN_VOTES) {
            loan.paid = true;
            loan.approved = true;
            usdc.transferFrom(address(this), loan.borrower, loan.principal);
        }
    }

    function payBack(uint256 loanId) public {
        Loan storage loan = loans[loanId];
        usdc.transferFrom(loan.borrower, address(this), loan.totalAmount);
        loan.repayed = true;
        loan.active = false;

        for (uint256 i = 0; i < voters[loanId].length; i++) {
            address voter = voters[loanId][i];
            withdrawableStake[voter] = staked[voter];
        }
    }

    function liquidate(uint256 loanId) public {
        Loan storage loan = loans[loanId];
        loan.active = false;
        loan.liquidated = true;
    }
}
