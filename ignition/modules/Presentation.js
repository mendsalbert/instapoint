const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PresentationModule", async (m) => {
  // Get deBridge gate address based on network
  const DEBRIDGE_ADDRESSES = {
    sonic: "0x43dE2d77BF8027e25dBD179B491e8d52810B5845", // Example address
    ethereum: "0x43dE2d77BF8027e25dBD179B491e8d52810B5845",
    polygon: "0x43dE2d77BF8027e25dBD179B491e8d52810B5845",
    // Add other network addresses as needed
  };

  // Deploy PresentationToken
  const presentationToken = m.contract("PresentationToken", [
    m.getParameter("deBridgeGate", DEBRIDGE_ADDRESSES.sonic),
  ]);

  // Deploy PresentationNFT
  const presentationNFT = m.contract("PresentationNFT", []);

  // Optional: Set up initial configuration
  const setupToken = m.call(presentationToken, "mint", [
    m.getParameter("initialMintAddress", m.deployer()),
    m.getParameter("initialMintAmount", "1000000000000000000000"), // 1000 tokens
  ]);

  // Ensure setup happens after deployment
  setupToken.after(presentationToken);

  return {
    presentationToken,
    presentationNFT,
    setupToken,
  };
});
