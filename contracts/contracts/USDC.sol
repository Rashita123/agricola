// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import {ERC20} from "./ERC20.sol";

contract USDCToken is ERC20("USDC", "USDC") {
    constructor() {
        mint(msg.sender, 1e10 * 1e18);
    }

    function faucet(address _who, uint256 _amt) external {
        mint(_who, _amt);
    }
}
