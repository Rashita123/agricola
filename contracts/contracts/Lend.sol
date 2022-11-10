// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Lend is ChainlinkClient, ERC20("FARMLOAN", "FLN") {
    using SafeERC20 for IERC20;

    uint256 public constant MIN_VOTES = 1;

    address public governance;
    uint256 public FEES_NUMERATOR = 30; // 3% protocl fees on withdraw
    uint256 public FEES_DENOMINATOR = 1000;

    mapping(address => mapping(address => uint256)) public lendingBalance;
    mapping(address => uint256) public uniqueTokensLent;
    mapping(address => address) public tokenPriceFeedMapping;
    address[] public allowedTokens;
    address[] public lenders;
    mapping(address => uint16) public tokenMultiplier;

    event Lent(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount, uint256 fees);

    mapping(address => bool) public auth;

    struct Loan {
        address token;
        uint256 principal;
        uint256 rateInBasisPoints;
        uint256 totalAmount;
        uint256 endTimestamp;
        uint256 currentVoteCount;
        uint256 totalVotesRequired;
        uint256 totalAmountVoted;
        address borrower;
        bool active;
        bool repaid;
        bool approved;
        string ipfsHash;
    }

    event newLoanRequest(uint256 indexed loanId);
    event loanApproved(uint256 indexed loanId);
    event loanRepaid(uint256 indexed loanId);
    event loanLiquidated(uint256 indexed loanId);

    mapping(uint256 => Loan) public loans;
    uint256 public loanId;

    // staker => loanId => voted ratio
    mapping(address => mapping(uint256 => uint256)) public votes;
    mapping(uint256 => address[]) public voters;

    constructor() {
        governance = msg.sender;
        auth[msg.sender] = true;
        _mint(address(this), 1e28);
    }

    modifier onlyAuth() {
        require(auth[msg.sender], "lend: not allowed");
        _;
    }
    modifier onlyGovernance() {
        require(msg.sender == governance, "lend: not allowed, only governance");
        _;
    }

    function updateAuth(address _who, bool _toggle) external onlyGovernance {
        auth[_who] = _toggle;
    }

    function addAllowedTokens(address token) public onlyGovernance {
        allowedTokens.push(token);
    }

    function updateMultiplier(address token, uint16 multiplier)
        external
        onlyGovernance
    {
        tokenMultiplier[token] = multiplier;
    }

    function setPriceFeedContract(address token, address priceFeed)
        public
        onlyGovernance
    {
        tokenPriceFeedMapping[token] = priceFeed;
    }

    function lendTokens(uint256 _amount, address _token) external {
        // important require checks
        require(_amount > 0, "lend: amount cannot be 0");
        require(tokenIsAllowed(_token), "lend: unauthorized token");

        // update storage variables
        updateUniqueTokensLent(msg.sender, _token);
        lendingBalance[_token][msg.sender] += _amount;

        emit Lent(msg.sender, _amount);
        // follow check effects interaction pattern
        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);
        // keep 1-1
        uint256 sharesToMint = getSharesToMint(_token, _amount);
        _mint(msg.sender, sharesToMint);
    }

    function getSharesToMint(address token, uint256 amount)
        public
        view
        returns (uint256)
    {
        return (amount * uint256(tokenMultiplier[token])) / 1000;
    }

    function mintShares(
        address who,
        address token,
        uint256 amount
    ) external onlyAuth {
        _mint(who, getSharesToMint(token, amount));
        IERC20(token).transferFrom(who, address(this), amount);
    }

    function withdrawShares(address token, uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "lend: no outstanding shares");

        uint256 fees = processFeesAmount(amount);
        uint256 amountAfterFees = amount - fees;

        uint256 amountToBurn = getSharesToBurn(token, amount);
        _burn(msg.sender, amountToBurn);
        IERC20(token).transfer(msg.sender, amountAfterFees);
    }

    function getSharesToBurn(address token, uint256 amount)
        public
        view
        returns (uint256)
    {
        return (amount * 1000) / uint256(tokenMultiplier[token]);
    }

    function burnShares(
        address who,
        address token,
        uint256 amount
    ) external onlyAuth {
        _burn(who, getSharesToMint(token, amount));
        IERC20(token).transfer(who, amount);
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

    function processFeesAmount(uint256 _amount)
        internal
        view
        returns (uint256)
    {
        return (FEES_NUMERATOR * _amount) / FEES_DENOMINATOR;
    }

    function getUserTokenValue(address user, address token)
        public
        view
        returns (uint256)
    {
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

    function getUserLendingBalanceEthValue(address user, address token)
        public
        view
        returns (uint256)
    {
        if (uniqueTokensLent[user] <= 0) {
            return 0;
        }
        return
            (lendingBalance[token][user] * getTokenEthPrice(token)) / (10**18);
    }

    function getTokenEthPrice(address token) public view returns (uint256) {
        address priceFeedAddress = tokenPriceFeedMapping[token];
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            priceFeedAddress
        );
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function createBorrowRequest(
        address token,
        uint256 principal,
        uint256 rateInBasisPoints,
        uint256 totalAmount,
        uint256 endTimestamp,
        uint256 totalVotesRequired,
        address borrower,
        string memory ipfsHash
    ) external {
        require(totalVotesRequired >= MIN_VOTES, "lend: invalid min votes");
        Loan memory loan = Loan(
            token,
            principal,
            rateInBasisPoints,
            totalAmount,
            endTimestamp,
            0, /* currentVoteCount */
            totalVotesRequired,
            0, /* totalAmountVoted */
            borrower,
            true, /* active */
            false, /* repaid */
            false, /* approved */
            ipfsHash
        );
        loans[loanId++] = loan;
        emit newLoanRequest(loanId);
    }

    function logVote(
        uint256 _loanId,
        address _staker,
        uint256 _amount
    ) external onlyAuth {
        require(votes[_staker][_loanId] == 0, "lend: already voted");
        Loan storage loan = loans[_loanId];
        require(
            loan.token != address(0) && loan.active && !loan.repaid,
            "loan: invalid loan"
        );

        require(balanceOf(_staker) > 0, "lend: no stake");
        transferFrom(_staker, address(this), _amount);
        votes[_staker][_loanId] = _amount;
        voters[_loanId].push(_staker);
        loan.totalAmountVoted += _amount;
        loan.currentVoteCount++;
        if (loan.currentVoteCount >= loan.totalVotesRequired) {
            loan.approved = true;
            IERC20(loan.token).transfer(loan.borrower, loan.principal);
            emit loanApproved(_loanId);
        }
    }

    function payBack(uint256 _loanId) external {
        Loan memory loan = loans[_loanId];
        require(loan.approved, "lend: loan not approved");
        address borrower = loan.borrower;
        require(msg.sender == borrower, "lend: only borrower can payback loan");
        IERC20(loan.token).transferFrom(
            borrower,
            address(this),
            loan.totalAmount
        );
        loans[_loanId].repaid = true;
        loans[_loanId].active = false;
        emit loanRepaid(_loanId);
    }

    function liquidateLoan(uint256 _loanId) external {
        Loan memory loan = loans[_loanId];
        require(
            loan.active && !loan.repaid && block.timestamp > loan.endTimestamp,
            "lend: cannot liquidate loan"
        );
        address[] memory stakers = voters[_loanId];
        uint256 len = stakers.length;
        uint256 principalAmount = loan.principal;
        uint256 totalAmountVoted = loan.totalAmountVoted;
        unchecked {
            for (uint256 i; i < len; ) {
                address staker = stakers[i];
                uint256 amountStaked = votes[staker][_loanId];
                uint256 amountSlashed = (principalAmount * amountStaked) /
                    totalAmountVoted;
                uint256 remaining = amountStaked - amountSlashed;
                transfer(staker, remaining);
                i++;
            }
        }

        loans[_loanId].active = false;
        emit loanLiquidated(_loanId);
    }
}
