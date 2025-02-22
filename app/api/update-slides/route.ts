import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  let currentSlides: any[] = [];
  try {
    const { transcript, currentSlides: requestSlides } = await request.json();
    currentSlides = requestSlides;

    const prompt = `Based on the following transcript: "${transcript}"
    and the current slides: ${JSON.stringify(currentSlides)},
    
    Analyze the speech and:
    1. Identify key points and themes
    2. Create or update slides that maintain a logical flow
    3. Keep the title slide (first slide) unchanged
    4. Use appropriate layouts based on content type:
       - "focus" for big ideas
       - "split" for comparisons
       - "content" for detailed points
       - "media" for descriptive content
    
    Return updated slides in the following JSON format (no markdown, no code blocks, just the raw JSON):
    [
      {
        "title": "Slide Title",
        "content": ["Point 1", "Point 2", "Point 3"],
        "layout": "default"
      }
    ]
    
    Ensure natural progression and coherent structure.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Clean up the response to ensure it's valid JSON
    const cleanJson = text.replace(/```json\n?|```/g, "").trim();
    const updatedSlides = JSON.parse(cleanJson);

    // Validate the slides structure
    if (!Array.isArray(updatedSlides)) {
      throw new Error("Invalid slides format: not an array");
    }

    return new Response(JSON.stringify(updatedSlides), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    // Return the current slides in case of error
    return new Response(JSON.stringify(currentSlides), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
