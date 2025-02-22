import { ethers, BrowserProvider, Contract } from "ethers";

export class BlockchainService {
  private provider: BrowserProvider;
  private contract: Contract;

  constructor() {
    if (typeof window !== "undefined" && window.ethereum) {
      this.provider = new BrowserProvider(window.ethereum);
      // Add your smart contract ABI and address here
      this.contract = new Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        [], // Add contract ABI
        this.provider.getSigner()
      );
    } else {
      throw new Error("Ethereum provider not found");
    }
  }

  async mintPresentationNFT(presentationId: string, metadata: any) {
    try {
      const tx = await this.contract.mintPresentation(presentationId, metadata);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error("Error minting NFT:", error);
      throw error;
    }
  }

  async verifyPresentation(presentationId: string) {
    try {
      return await this.contract.verifyPresentation(presentationId);
    } catch (error) {
      console.error("Error verifying presentation:", error);
      throw error;
    }
  }

  async issueParticipationCertificate(
    participantAddress: string,
    presentationId: string
  ) {
    try {
      const tx = await this.contract.issueCertificate(
        participantAddress,
        presentationId
      );
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error("Error issuing certificate:", error);
      throw error;
    }
  }
}
