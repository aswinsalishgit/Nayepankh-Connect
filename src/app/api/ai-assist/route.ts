import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const baseURL = process.env.OLLAMA_BASE_URL || 'https://api.together.xyz/v1';
  const apiKey = process.env.OLLAMA_API_KEY || '';
  const modelName = process.env.OLLAMA_MODEL || 'meta-llama/Meta-Llama-3-8B-Instruct-Turbo';

  // Format messages
  const systemMessage = {
    role: "system",
    content: "You are the 'AI Support Buddy' for Nayepankh Foundation volunteers. Your tone is loving, compassionate, simple, and extremely helpful. You assist volunteers with drafting emails, understanding NGO guidelines, and organizing events. Keep responses concise, warm, and structured."
  };

  const response = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages: [systemMessage, ...messages],
      stream: true,
    }),
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
