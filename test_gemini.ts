import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: "Tell me a joke about cats",
      config: {
        // tools: [{ googleSearch: {} }]
      }
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      if (chunk.text) {
        fullText += chunk.text;
      }
    }
    console.log("Success with gemini-3-flash-preview + googleSearch");
  } catch (err: any) {
    if (err.status) {
      console.error("Error from Gemini:", err.status, err.message);
    } else {
      console.error("Error:", err);
    }
  }
}
run();
