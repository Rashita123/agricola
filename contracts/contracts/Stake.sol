// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Lend.sol";

contract Stake is ChainlinkClient, Ownable {
    IERC20 public immutable usdcToken;
    Lend public immutable nativeToken;

    mapping(address => bool) public allowedTokens;

    constructor(address _usdcToken, address _nativeToken) {
        usdcToken = IERC20(_usdcToken);
        nativeToken = Lend(_nativeToken);
        allowedTokens[_usdcToken] = true;
    }

    function stakeTokens(address _token, uint256 _amount) external {
        require(_amount > 0, "amount cannot be 0");
        require(allowedTokens[_token], "stake: token is not whitelisted");

        require(
            IERC20(_token).balanceOf(msg.sender) >= _amount,
            "stake: insifficient balance"
        );

        uint256 sharesToMint = nativeToken.getSharesToMint(_token, _amount);
        nativeToken.mintShares(msg.sender, _token, _amount);
        require(
            nativeToken.balanceOf(msg.sender) >= sharesToMint,
            "stake: invalid stake"
        );
    }

    function unstakeTokens(address _token, uint256 _amount) external {
        uint256 sharesToBurn = nativeToken.getSharesToBurn(_token, _amount);
        uint256 shares = nativeToken.balanceOf(msg.sender);
        require(shares >= sharesToBurn, "stake: insifficient stake");
        nativeToken.burnShares(msg.sender, _token, _amount);
        require(
            nativeToken.balanceOf(msg.sender) == shares - sharesToBurn,
            "stake: invalid stake"
        );
    }
}
