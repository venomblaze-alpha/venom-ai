import { groq } from "@ai-sdk/groq";
import { smoothStream, streamText } from "ai";

export const dynamic = "force-dynamic";
export const maxDuration = 35;

export async function POST(req: Request) {
  try {
    const { messages, selectedModel } = await req.json();

    const result = streamText({
      model: groq(selectedModel ?? ""),
      system: "You are a helpful assistant",
      messages,
      maxRetries: 3,
      experimental_transform: smoothStream({
        chunking: "word",
      }),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
