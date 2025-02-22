// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PresentationNFT is ERC721URIStorage {
    uint256 private _tokenIds;
    
    constructor() ERC721("PresentationNFT", "PNFT") {}
    
    function mintPresentation(address presenter, string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(presenter, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
} 