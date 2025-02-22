// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PresentationToken is ERC20, Ownable {
    mapping(address => uint256) public presenterScores;
    mapping(address => uint256) public participantScores;
    
    constructor() ERC20("PresentationToken", "PRES") {}
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function rewardPresenter(address presenter, uint256 score) public onlyOwner {
        presenterScores[presenter] += score;
        _mint(presenter, score * 100); // 100 tokens per score point
    }
    
    function rewardParticipant(address participant, uint256 score) public onlyOwner {
        participantScores[participant] += score;
        _mint(participant, score * 10); // 10 tokens per score point
    }
} 