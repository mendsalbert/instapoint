// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDeBridgeGate.sol";

contract PresentationToken is ERC20, Ownable {
    IDeBridgeGate public deBridgeGate;
    mapping(address => uint256) public presenterScores;
    mapping(address => uint256) public participantScores;
    
    // Cross-chain configuration
    uint256 public constant SONIC_CHAIN_ID = 146; // Sonic Chain ID
    uint256 public constant PROTOCOL_FEE = 1; // 1 S (SONIC native token)
    
    constructor(address _deBridgeGate) ERC20("PresentationToken", "PRES") Ownable(msg.sender) {
        deBridgeGate = IDeBridgeGate(_deBridgeGate);
    }
    
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

    // Cross-chain token transfer function
    function bridgeTokens(
        uint256 targetChainId,
        address receiver,
        uint256 amount
    ) external payable {
        require(msg.value >= PROTOCOL_FEE, "Insufficient protocol fee");
        
        // Create submission parameters
        IDeBridgeGate.SubmissionAutoParamsTo memory autoParams;
        autoParams.executionFee = 0; // No execution fee for this example
        autoParams.flags = Flags.setFlag(0, Flags.REVERT_IF_EXTERNAL_FAIL, true);
        autoParams.fallbackAddress = abi.encodePacked(msg.sender);
        
        // Approve deBridge to spend tokens
        _approve(msg.sender, address(deBridgeGate), amount);
        
        // Send tokens cross-chain
        deBridgeGate.send{value: msg.value}(
            address(this), // token address
            amount,
            targetChainId,
            abi.encodePacked(receiver), // receiver address
            "", // permit
            false, // use asset fee
            0, // referral code
            abi.encode(autoParams)
        );
    }

    // Function to receive tokens from other chains
    function onTokenBridged(
        address recipient,
        uint256 amount
    ) external {
        require(msg.sender == address(deBridgeGate), "Only deBridge can call");
        _mint(recipient, amount);
    }
} 