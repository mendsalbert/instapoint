import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { AudienceMetrics } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const {
      audienceMetrics,
      currentSlide,
      presentationContext,
      questionsAsked,
      engagementScores,
    } = await request.json();

    // Process audience engagement metrics using both models
    const [aiSuggestions, openAIAnalysis] = await Promise.all([
      analyzeWithGemini(audienceMetrics, currentSlide, presentationContext),
      analyzeWithOpenAI(audienceMetrics, engagementScores),
    ]);

    return new Response(
      JSON.stringify({
        contentSuggestions: aiSuggestions,
        styleAdjustments: openAIAnalysis.styleAdjustments,
        engagementInsights: openAIAnalysis.insights,
      })
    );
  } catch (error) {
    console.error("Error analyzing audience:", error);
    return new Response(
      JSON.stringify({ error: "Failed to analyze audience" })
    );
  }
}

async function analyzeWithGemini(
  metrics: AudienceMetrics,
  currentSlide: number,
  context: any
) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  const result = await model.generateContent(`
    Analyze this audience data and suggest content adjustments:
    Metrics: ${JSON.stringify(metrics)}
    Current Slide: ${currentSlide}
    Context: ${JSON.stringify(context)}
  `);
  return JSON.parse(result.response.text());
}

async function analyzeWithOpenAI(metrics: AudienceMetrics, scores: any) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Analyze audience engagement data and suggest presentation style adjustments.
                Current metrics: ${JSON.stringify(metrics)}
                Engagement scores: ${JSON.stringify(scores)}`,
      },
    ],
  });

  return JSON.parse(completion.choices[0].message.content || "{}");
}
