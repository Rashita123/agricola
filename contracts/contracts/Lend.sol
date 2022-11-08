// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lend is ChainlinkClient, Ownable {
    using SafeERC20 for IERC20;

    address public governance;
    uint256 public FEES_NUMERATOR = 30; // 3% protocl fees on withdraw
    uint256 public FEES_DENOMINATOR = 1000;

    mapping(address => mapping(address => uint256)) public lendingBalance;
    mapping(address => uint256) public uniqueTokensLent;
    mapping(address => address) public tokenPriceFeedMapping;
    address[] allowedTokens;
    address[] public lenders;

    event Lent(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount, uint256 fees);

    IERC20 public agriLendToken;

    constructor(address _agriLendTokenAddress) {
        agriLendToken = IERC20(_agriLendTokenAddress);
        governance = msg.sender;
    }

    function addAllowedTokens(address token) public onlyOwner {
        allowedTokens.push(token);
    }

    function setPriceFeedContract(
        address token,
        address priceFeed
    ) public onlyOwner {
        tokenPriceFeedMapping[token] = priceFeed;
    }

    function lendTokens(uint256 _amount, address token) external {
        // important require checks
        require(_amount > 0, "lend: amount cannot be 0");
        require(tokenIsAllowed(token), "lend: unauthorized token");

        // update storage variables
        updateUniqueTokensLent(msg.sender, token);
        lendingBalance[token][msg.sender] += _amount;

        emit Lent(msg.sender, _amount);
        // follow check effects interaction pattern
        IERC20(token).safeTransferFrom(msg.sender, address(this), _amount);
    }

    function withdrawTokens(uint256 _amount, address _token) public {
        // important require checks
        uint256 balance = lendingBalance[_token][msg.sender];
        require(balance > 0, "lend: lending balance cannot be 0");
        require(
            balance > _amount,
            "lend: withdrawal balance cannot be less than lending balance"
        );

        uint256 fees = processFeesAmount(_amount);
        uint256 amountAfterFees = _amount - fees;

        lendingBalance[_token][msg.sender] = balance - _amount;
        if (lendingBalance[_token][msg.sender] == 0) {
            uniqueTokensLent[msg.sender] = uniqueTokensLent[msg.sender] - 1;
        }

        emit Withdrawn(msg.sender, amountAfterFees, fees);
        // follow check effects interaction pattern
        IERC20(_token).safeTransfer(msg.sender, amountAfterFees);
        IERC20(_token).safeTransferFrom(msg.sender, governance, fees);
    }

    function processFeesAmount(
        uint256 _amount
    ) internal view returns (uint256) {
        return (FEES_NUMERATOR * _amount) / FEES_DENOMINATOR;
    }

    function getUserTokenValue(
        address user,
        address token
    ) public view returns (uint256) {
        return lendingBalance[token][user];
    }

    function getUserTotalValue(address user) public view returns (uint256) {
        uint256 totalValue = 0;
        if (uniqueTokensLent[user] > 0) {
            for (
                uint256 allowedTokensIndex = 0;
                allowedTokensIndex < allowedTokens.length;
                allowedTokensIndex++
            ) {
                totalValue =
                    totalValue +
                    getUserLendingBalanceEthValue(
                        user,
                        allowedTokens[allowedTokensIndex]
                    );
            }
        }
        return totalValue;
    }

    function tokenIsAllowed(address token) public view returns (bool) {
        for (
            uint256 allowedTokensIndex = 0;
            allowedTokensIndex < allowedTokens.length;
            allowedTokensIndex++
        ) {
            if (allowedTokens[allowedTokensIndex] == token) {
                return true;
            }
        }
        return false;
    }

    function updateUniqueTokensLent(address user, address token) internal {
        if (lendingBalance[token][user] <= 0) {
            uniqueTokensLent[user] = uniqueTokensLent[user] + 1;
        }
    }

    function getUserLendingBalanceEthValue(
        address user,
        address token
    ) public view returns (uint256) {
        if (uniqueTokensLent[user] <= 0) {
            return 0;
        }
        return
            (lendingBalance[token][user] * getTokenEthPrice(token)) /
            (10 ** 18);
    }

    function getTokenEthPrice(address token) public view returns (uint256) {
        address priceFeedAddress = tokenPriceFeedMapping[token];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            priceFeedAddress
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function receieveTokens() public {
        uint256 totalAmount = getUserTotalValue(msg.sender);
        require(totalAmount > 0, "lend:no funds lent");
        agriLendToken.transfer(msg.sender, totalAmount);
    }

    function issueTokens() public onlyOwner {
        // Issue tokens to all lenders
        for (
            uint256 lendersIndex = 0;
            lendersIndex < lenders.length;
            lendersIndex++
        ) {
            address recipient = lenders[lendersIndex];
            agriLendToken.transfer(recipient, getUserTotalValue(recipient));
        }
    }
}
