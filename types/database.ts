export interface PresentationMetrics {
  id: string;
  presentationId: string;
  timestamp: Date;
  audienceSize: number;
  engagementScores: {
    attention: number;
    interaction: number;
    comprehension: number;
  };
  emotionalResponses: {
    positive: number;
    neutral: number;
    negative: number;
  };
  questionsAsked: {
    timestamp: number;
    question: string;
    slideIndex: number;
    sentiment: string;
  }[];
  adaptations: {
    timestamp: number;
    type: "content" | "style" | "pace";
    reason: string;
    impact: number;
  }[];
}
