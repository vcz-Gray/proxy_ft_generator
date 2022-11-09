// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ITokenForSubmissionWemade.sol";
import "./TokenForSubmissionWemade.sol";

contract GenerateNewTokenForSubmissionWemade is Ownable {
  mapping(string => address) public getTokenAddresses;
  mapping(address => string) public getNameOfTokens;
  mapping(address => string) public getSymbolOfTokens;
  mapping(string => mapping(string => address)) public getExistTokens;
  address[] allTokens;

  event TokenForSubmissionWemadeCreated(string name, string symbol, address tokenForSubmissionWemade, address to, uint256 amount);

  function getAllTokensLength() external view returns (uint256) {
    return allTokens.length;
  }

  function createNewTokenForSubmissionWemade(string memory _name, string memory _symbol, address _to, uint256 _amount) external onlyOwner returns (address tokenForSubmissionWemade) {
    require(getTokenAddresses[_name] == address(0x0), "TokenForSubmissionWemade name is exist");
    require(getTokenAddresses[_symbol] == address(0x0), "TokenForSubmissionWemade symbol is exist");
    require(getExistTokens[_name][_symbol] == address(0x0), "TokenForSubmissionWemade is exist");

    TokenForSubmissionWemade newToken = new TokenForSubmissionWemade(_name, _symbol, _to, _amount);
    tokenForSubmissionWemade = address(newToken);

    getTokenAddresses[_name] = tokenForSubmissionWemade;
    getTokenAddresses[_symbol] = tokenForSubmissionWemade;
    getNameOfTokens[tokenForSubmissionWemade] = _name;
    getSymbolOfTokens[tokenForSubmissionWemade] = _symbol;
    getExistTokens[_name][_symbol] = tokenForSubmissionWemade;
    allTokens.push(tokenForSubmissionWemade);
    emit TokenForSubmissionWemadeCreated(_name, _symbol, tokenForSubmissionWemade, _to, _amount);
  }

  function transferOwnershipOfNewToken(address tokenAddr, address to) external onlyOwner {
    require(bytes(getNameOfTokens[tokenAddr]).length > 0, "TokenForSubmissionWemade does not exist");
    require(bytes(getSymbolOfTokens[tokenAddr]).length > 0, "TokenForSubmissionWemade does not exist");
    Ownable(tokenAddr).transferOwnership(to);
  }
}
