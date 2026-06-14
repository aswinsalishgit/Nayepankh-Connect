import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Create an OpenAI-compatible provider instance
// This allows using any Ollama/cloud open-source model provider 
// that follows the OpenAI API specification (which most do).
const ollamaCloud = createOpenAI({
  apiKey: process.env.OLLAMA_API_KEY || '',
  // Set OLLAMA_BASE_URL in your .env.local if you have a custom host
  // e.g., baseURL: 'http://localhost:11434/v1' for local Ollama
  baseURL: process.env.OLLAMA_BASE_URL || 'https://api.together.xyz/v1', // Using Together AI as an example fallback for cloud open-source models
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  // The model name should ideally be passed in env vars, 
  // defaulting to a llama3 variant.
  const modelName = process.env.OLLAMA_MODEL || 'meta-llama/Meta-Llama-3-8B-Instruct-Turbo';

  const result = await streamText({
    model: ollamaCloud(modelName),
    messages,
    system: "You are the 'AI Support Buddy' for Nayepankh Foundation volunteers. Your tone is loving, compassionate, simple, and extremely helpful. You assist volunteers with drafting emails, understanding NGO guidelines, and organizing events. Keep responses concise, warm, and structured.",
  });

  return result.toDataStreamResponse();
}
