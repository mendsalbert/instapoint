import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  let title = "",
    description = ""; // Declare variables in scope
  try {
    const {
      title: requestTitle,
      description: requestDesc,
      stage,
      currentProgress = 0,
      existingSlides = [],
    } = await request.json();

    title = requestTitle;
    description = requestDesc;

    // If we're near the end (10 slides), add Q&A and Thank You slides
    if (currentProgress >= 10) {
      return new Response(
        JSON.stringify([
          {
            id: `slide-${currentProgress + 1}`,
            title: "Questions & Answers",
            content: [
              "We'd love to hear your thoughts and questions",
              "Feel free to raise your hand or use the chat",
            ],
            layout: "focus",
            theme: "modern",
          },
          {
            id: `slide-${currentProgress + 2}`,
            title: "Thank You!",
            content: [
              `Thank you for attending our presentation on "${title}"`,
              "Contact: [Your Contact Information]",
            ],
            layout: "title",
            theme: "modern",
          },
        ]),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const prompt = `Create ${
      stage === "initial" ? "the first 5" : "4-5"
    } slides for a presentation about "${title}".
      Description: ${description}
      ${
        stage === "initial"
          ? `
        The first slide should be a title slide with:
        - An engaging, improved version of the title
        - A compelling subtitle
        - Layout: "title"
        
        Follow with 4 content slides that:
        - Have clear, specific points (maximum 2 points per slide)
        - Flow logically
        - Use appropriate layouts
        - Ensure content builds progressively
      `
          : `
        Continue from slide ${currentProgress + 1}
        Previous slides: ${JSON.stringify(existingSlides)}
        - Build upon previous content
        - Maintain presentation flow
        - Maximum 2 points per slide
        - Generate up to slide 10 (Q&A and Thank You slides will be added automatically)
      `
      }

      Return as a JSON array of slides:
      [
        {
          "id": "slide-1",
          "title": "Your Title Here",
          "content": ["Point 1", "Point 2"],
          "layout": "title or content",
          "theme": "modern"
        }
      ]`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Clean up and validate JSON
    const cleanJson = text.replace(/```json\n?|```/g, "").trim();
    const slides = JSON.parse(cleanJson);

    if (!Array.isArray(slides)) {
      throw new Error("Invalid slides format: not an array");
    }

    // Process slides and ensure we don't exceed 10 content slides
    const processedSlides = slides
      .map((slide, index) => ({
        id: slide.id || `slide-${currentProgress + index + 1}`,
        title: slide.title || "Untitled Slide",
        content: Array.isArray(slide.content)
          ? slide.content.slice(0, 2) // Limit to 2 points per slide
          : ["No content available"],
        layout:
          slide.layout ||
          (index === 0 && stage === "initial" ? "title" : "content"),
        theme: slide.theme || "modern",
      }))
      .slice(0, Math.min(slides.length, 10 - currentProgress)); // Ensure we leave room for Q&A and Thank You

    return new Response(JSON.stringify(processedSlides), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify([
        {
          id: "slide-1",
          title: title || "Introduction",
          content: [
            "Getting Started",
            description || "Presentation content will appear here",
          ],
          layout: "title",
          theme: "modern",
        },
      ]),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
