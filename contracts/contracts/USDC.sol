// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDCToken is ERC20("USDC", "USDC"), Ownable {
    constructor() {
        _mint(msg.sender, 1e10 * 1e18);
    }

    function faucet(address _who, uint256 _amt) external onlyOwner {
        _mint(_who, _amt);
    }
}
