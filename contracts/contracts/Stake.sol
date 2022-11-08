// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Stake is ChainlinkClient, Ownable {
    address[] public stakers;

    mapping(address => mapping(address => uint256)) public stakingBalance;
    mapping(address => uint256) public uniqueTokensLent;
    mapping(address => address) public tokenPriceFeedMapping;
    mapping(address => mapping(uint256 => uint256))
        public userLockedTimeMapping;
    address[] allowedTokens;
    uint256 public timeNow;
    mapping(address => unlockedData) public addressToUnlockedData;

    IERC20 public immutable usdcToken;

    mapping(address => uint256[]) public entriesForUser;
    address[] userAddress;
    uint256[] userAmount;
    uint256[] lockedTime;
    uint256[] lockedAmountIndexList;
    uint256[] lockedAmountList;
    bool[] claimed;

    struct unlockedData {
        uint256 unlockedBalance;
        uint256[] unlockedAmountList;
        uint256[] unlockedIndexList;
    }

    constructor(address _usdcTokenAddress) {
        usdcToken = IERC20(_usdcTokenAddress);
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

    function stakeTokens(
        uint256 _amount,
        address token,
        uint256 numberOfDays
    ) public {
        require(_amount > 0, "amount cannot be 0");
        if (tokenIsAllowed(token)) {
            updateUniqueTokensLent(msg.sender, token);
            IERC20(token).transferFrom(msg.sender, address(this), _amount);
            stakingBalance[token][msg.sender] += _amount;
            userAddress.push(msg.sender);
            userAmount.push(_amount);
            lockedTime.push(block.timestamp + (numberOfDays * 1 days));
            claimed.push(false);
            entriesForUser[msg.sender].push(userAddress.length);
            if (uniqueTokensLent[msg.sender] == 1) {
                stakers.push(msg.sender);
            }
        }
    }

    function getUnlockedTokens() public returns (unlockedData memory) {
        uint256 unlockedValue = 0;
        uint256[] memory tempList1;
        lockedAmountIndexList = tempList1;
        uint256[] memory tempList2;
        lockedAmountList = tempList2;
        for (
            uint256 index = 0;
            index < entriesForUser[msg.sender].length;
            index++
        ) {
            uint256 lookupIndex = entriesForUser[msg.sender][index];
            uint256 deadline = lockedTime[lookupIndex - 1];
            if (
                block.timestamp >= deadline && claimed[lookupIndex - 1] == false
            ) {
                unlockedValue = unlockedValue + userAmount[lookupIndex - 1];
                lockedAmountIndexList.push(lookupIndex - 1);
                lockedAmountList.push(userAmount[lookupIndex - 1]);
            }
        }
        return
            unlockedData(
                unlockedValue,
                lockedAmountList,
                lockedAmountIndexList
            );
    }

    function getWithdrawbleTokens() public view returns (uint256) {
        uint256 unlockedValue = 0;
        for (
            uint256 index = 0;
            index < entriesForUser[msg.sender].length;
            index++
        ) {
            uint256 lookupIndex = entriesForUser[msg.sender][index];
            uint256 deadline = lockedTime[lookupIndex - 1];
            if (
                block.timestamp >= deadline && claimed[lookupIndex - 1] == false
            ) {
                unlockedValue = unlockedValue + userAmount[lookupIndex - 1];
            }
        }
        return unlockedValue;
    }

    function withdrawTokens(uint256 _amount, address token) public {
        uint256 balance = stakingBalance[token][msg.sender];
        unlockedData memory UnlockedData = getUnlockedTokens();
        require(
            UnlockedData.unlockedBalance > 0,
            "stakeing balance cannot be 0"
        );
        require(
            UnlockedData.unlockedBalance >= _amount,
            "withdrawal balance cannot be less than stakeing balance"
        );
        IERC20(token).transfer(msg.sender, _amount);
        stakingBalance[token][msg.sender] = balance - _amount;
        if (stakingBalance[token][msg.sender] == 0) {
            uniqueTokensLent[msg.sender] = uniqueTokensLent[msg.sender] - 1;
        }
        for (
            uint256 index = 0;
            index < UnlockedData.unlockedAmountList.length;
            index++
        ) {
            if (UnlockedData.unlockedAmountList[index] >= _amount) {
                deductAmount(_amount, UnlockedData.unlockedIndexList[index]);
            } else {
                deductAmount(_amount, UnlockedData.unlockedIndexList[index]);
                _amount = _amount - UnlockedData.unlockedIndexList[index];
            }
        }
    }

    function deductAmount(uint256 _amount, uint256 index) public {
        userAmount[index] = userAmount[index] - _amount;
    }

    function getUserTokenValue(
        address user,
        address token
    ) public view returns (uint256) {
        return stakingBalance[token][user];
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
                    getUserStakeingBalanceEthValue(
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
        if (stakingBalance[token][user] <= 0) {
            uniqueTokensLent[user] = uniqueTokensLent[user] + 1;
        }
    }

    function getUserStakeingBalanceEthValue(
        address user,
        address token
    ) public view returns (uint256) {
        if (uniqueTokensLent[user] <= 0) {
            return 0;
        }
        return
            (stakingBalance[token][user] * getTokenEthPrice(token)) /
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

    function receiveTokens() public {
        uint256 totalAmount = getUserTotalValue(msg.sender);
        require(totalAmount > 0, "no amount staked");
        usdcToken.transfer(msg.sender, totalAmount);
    }

    function issueTokens() public onlyOwner {
        // Issue tokens to all stakeers
        for (
            uint256 stakeersIndex = 0;
            stakeersIndex < stakers.length;
            stakeersIndex++
        ) {
            address recipient = stakers[stakeersIndex];
            usdcToken.transfer(recipient, getUserTotalValue(recipient));
        }
    }
}
