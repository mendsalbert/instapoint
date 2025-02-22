// Audience Analysis Types
export interface AudienceMetrics {
  attention: number; // 0-1 scale
  engagement: number;
  sentiment: SentimentScore;
  facialExpressions: FacialExpressionData;
  audioAnalysis: AudioAnalysisData;
  participantCount: number;
  activeParticipants: number;
  questions: Question[];
}

export interface SentimentScore {
  positive: number;
  neutral: number;
  negative: number;
}

export interface FacialExpressionData {
  attention: number;
  confusion: number;
  interest: number;
  timestamp: number;
}

export interface AudioAnalysisData {
  volume: number;
  pace: number;
  clarity: number;
  timestamp: number;
}

export interface Question {
  id: string;
  text: string;
  timestamp: number;
  sentiment: string;
  answered: boolean;
}

// Learning System Types
export interface LearningData {
  presentationId: string;
  metrics: PresentationMetrics;
  improvements: Improvement[];
  successMetrics: SuccessMetrics;
}

export interface Improvement {
  type: "content" | "delivery" | "engagement" | "timing";
  suggestion: string;
  confidence: number;
  impact: number;
}

export interface SuccessMetrics {
  overallEngagement: number;
  questionQuality: number;
  participationRate: number;
  contentRetention: number;
}

// Agent Types
export interface AgentState {
  currentContext: PresentationContext;
  audienceState: AudienceMetrics;
  learningHistory: LearningData[];
  adaptationHistory: Adaptation[];
}

export interface Adaptation {
  timestamp: number;
  trigger: string;
  action: AgentAction;
  outcome: AdaptationOutcome;
}

export interface AdaptationOutcome {
  success: boolean;
  impactScore: number;
  audienceResponse: AudienceMetrics;
}

// Add PresentationContext interface
export interface PresentationContext {
  title: string;
  description: string;
  keyPoints: string[];
  currentContext: string;
}

// Add EngagementMetrics interface
export interface EngagementMetrics {
  attention: number;
  engagement: number;
  comprehension: number;
  timestamp: number;
}

// Add FollowUpContent interface
export interface FollowUpContent {
  summary: string;
  keyTakeaways: string[];
  nextSteps: string[];
  resources: string[];
}

// Export PresentationMetrics
export type { PresentationMetrics } from "./database";

// Add AgentAction interface
export interface AgentAction {
  type:
    | "content_modification"
    | "style_adjustment"
    | "pace_change"
    | "follow_up";
  confidence: number;
  suggestion: string;
  context: {
    slideIndex?: number;
    currentMetrics?: AudienceMetrics;
    trigger?: string;
  };
}
