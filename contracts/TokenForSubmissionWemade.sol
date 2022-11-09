// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC20CountOwner.sol";

contract TokenForSubmissionWemade is ERC20CountOwner {
    constructor(
        string memory _name,
        string memory _symbol,
        address _to,
        uint256 _amount
        ) ERC20CountOwner(_name, _symbol) {
        _mint(_to, _amount);
    }

    function mint(address _to, uint256 _amount) external onlyOwner returns (bool) {
        _mint(_to, _amount);
        return true;
    }

    function burn(uint256 _amount) external returns (bool) {
        _burn(msg.sender, _amount);
        return true;
    }
}
