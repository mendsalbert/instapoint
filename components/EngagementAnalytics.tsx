import { useEffect, useRef, useState } from "react";
import { AudienceMetrics } from "@/types";
import { AudienceAnalysisService } from "@/services/audienceAnalysis";
import { io, Socket } from "socket.io-client";

interface EngagementAnalyticsProps {
  presentationId: string;
  currentSlide: number;
  audienceData: AudienceMetrics;
}

// This component will handle real-time analytics and feedback

export function EngagementAnalytics({
  presentationId,
  currentSlide,
  audienceData,
}: EngagementAnalyticsProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const analysisService = useRef<AudienceAnalysisService | null>(null);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize analysis service
    analysisService.current = new AudienceAnalysisService();

    // Connect to WebSocket for real-time updates
    socket.current = io("/analytics");

    socket.current.on("metrics-update", (metrics: AudienceMetrics) => {
      // Handle real-time metrics updates
    });

    return () => {
      analysisService.current?.stop();
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isAnalyzing) {
      analysisService.current?.startAnalysis();
    }
  }, [isAnalyzing]);

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-80">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Audience Engagement</h3>
        <button
          onClick={() => setIsAnalyzing(!isAnalyzing)}
          className={`px-3 py-1 rounded-full text-xs ${
            isAnalyzing
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isAnalyzing ? "Stop Analysis" : "Start Analysis"}
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Attention Level</span>
            <span className="font-medium">
              {Math.round(audienceData.attention * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${audienceData.attention * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Engagement Score</span>
            <span className="font-medium">
              {Math.round(audienceData.engagement * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${audienceData.engagement * 100}%` }}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Active Participants</h4>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              {audienceData.activeParticipants}
            </div>
            <div className="text-sm text-gray-500">
              of {audienceData.participantCount} total
            </div>
          </div>
        </div>

        {audienceData.questions.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Recent Questions</h4>
            <div className="space-y-2">
              {audienceData.questions.slice(0, 3).map((question) => (
                <div
                  key={question.id}
                  className="text-sm p-2 bg-gray-50 rounded-lg"
                >
                  {question.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
