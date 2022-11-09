// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20CountOwner is IERC20 {
    function totalOwnerCounts() external view returns (uint256);
}
