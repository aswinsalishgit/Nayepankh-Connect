import { streamText } from 'ai';
import { createOllama } from 'ollama-ai-provider';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const baseURL = process.env.OLLAMA_BASE_URL || 'https://api.ollama.com/api';
  const apiKey = process.env.OLLAMA_API_KEY || '';
  const modelName = process.env.OLLAMA_MODEL || 'qwen3-next:80b';

  const ollama = createOllama({
    baseURL,
    headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined,
  });

  const result = await streamText({
    // @ts-expect-error: ollama-ai-provider types slightly mismatch ai@3.4.0 LanguageModelV1CallWarning
    model: ollama(modelName),
    messages,
    system: "You are the 'AI Support Buddy' for Nayepankh Foundation volunteers. Your tone is loving, compassionate, simple, and extremely helpful. You assist volunteers with drafting emails, understanding NGO guidelines, and organizing events. Keep responses concise, warm, and structured."
  });

  return result.toDataStreamResponse();
}
