import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let ai: GoogleGenAI | null = null;

try {
  // Initialize only if API Key is available
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize Gemini Client", error);
}

export const sendMessageToGemini = async (
  message: string, 
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  if (!ai) {
    return "SYSTEM ERROR: API_KEY_MISSING. Please configure the neural link (env variables).";
  }

  try {
    const chat = ai.chats.create({ 
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "You are the AI Assistant for a 'Comic Book Style' Portfolio. Speak in a dramatic, comic-book narrator style. Be concise, punchy, and use words like 'POW!', 'ZAP!', and 'MEANWHILE...'. Your goal is to hype up the developer's skills (React, TypeScript, AI). If asked about the developer, say they are a code vigilante fighting bugs in the digital city."
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text ?? "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "COMMUNICATION BREAKDOWN! The signal was intercepted by a villain (API Error).";
  }
};