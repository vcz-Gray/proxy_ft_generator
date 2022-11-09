// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./IERC20CountOwner.sol";

interface ITokenForSubmissionWemade is IERC20CountOwner {
    function mint(address _to, uint256 _amount) external returns (bool);
    function burn(uint256 _amount) external returns (bool);
}
