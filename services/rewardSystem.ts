import { ethers } from "ethers";
import { BlockchainService } from "./blockchain";
import { PresentationMetrics } from "@/types";

export class RewardSystem {
  private blockchain: BlockchainService;

  constructor() {
    this.blockchain = new BlockchainService();
  }

  async calculatePresentationScore(
    metrics: PresentationMetrics
  ): Promise<number> {
    const engagementWeight = 0.4;
    const participationWeight = 0.3;
    const contentWeight = 0.3;

    const engagementScore =
      metrics.engagementScores.attention * 0.4 +
      metrics.engagementScores.interaction * 0.3 +
      metrics.engagementScores.comprehension * 0.3;

    const participationScore =
      metrics.audienceSize > 0
        ? metrics.questionsAsked.length / metrics.audienceSize
        : 0;

    const contentScore =
      metrics.adaptations.reduce(
        (acc, adaptation) => acc + adaptation.impact,
        0
      ) / metrics.adaptations.length;

    return (
      (engagementScore * engagementWeight +
        participationScore * participationWeight +
        contentScore * contentWeight) *
      100
    ); // Scale to 0-100
  }

  async distributeRewards(
    presenterAddress: string,
    participantAddresses: string[],
    metrics: PresentationMetrics
  ) {
    const presentationScore = await this.calculatePresentationScore(metrics);

    // Reward presenter
    await this.blockchain.contract.rewardPresenter(
      presenterAddress,
      Math.floor(presentationScore)
    );

    // Reward participants based on their engagement
    for (const address of participantAddresses) {
      const participantScore = Math.floor(Math.random() * 50); // Replace with actual participant metrics
      await this.blockchain.contract.rewardParticipant(
        address,
        participantScore
      );
    }

    // Mint presentation NFT
    const metadata = {
      presentationId: metrics.presentationId,
      score: presentationScore,
      timestamp: metrics.timestamp,
      audienceSize: metrics.audienceSize,
    };

    await this.blockchain.mintPresentationNFT(metrics.presentationId, metadata);
  }
}
