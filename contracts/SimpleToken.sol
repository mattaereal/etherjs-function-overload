// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("SimpleToken", "ST") {
        _mint(msg.sender, initialSupply);
    }

    function balanceOf(address user, address user2) external view returns(uint256, uint256) {
        return (balanceOf(user), balanceOf(user2));
    }
}