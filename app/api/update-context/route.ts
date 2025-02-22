import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { transcript, currentContext, currentSlide } = await request.json();

    const prompt = `
    Based on the presentation about "${currentContext.title}":
    Description: ${currentContext.description}
    Current speech: "${transcript}"

    1. Maintain the presentation flow based on the description
    2. Generate the next 2 slides predicting the speaker's direction
    3. Keep content concise and visually appealing
    4. Suggest relevant images or diagrams

    Return as JSON:
    {
      "currentSlide": {
        "title": "Current slide title",
        "content": ["Key points"],
        "visual": "suggested_image_type"
      },
      "nextSlides": [
        {
          "title": "Upcoming slide title",
          "content": ["Predicted points"],
          "visual": "suggested_image_type"
        }
      ]
    }`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = JSON.parse(response.text().trim());

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        updatedSlides: [],
        predictedSlides: [],
        keyPoints: [],
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
