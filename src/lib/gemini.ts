import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askGeminiCustomerSupport(
  message: string,
  history: { role: 'user' | 'model', parts: { text: string }[] }[],
  onChunk?: (text: string) => void
) {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "You are an AI customer support assistant for Sentinel-AI. The builder of this application is Ishan. Answer user queries, clarify any doubts they have about Sentinel-AI's verification process, and provide a helpful, friendly experience in a concise manner.",
        temperature: 0.7,
      },
      history: history,
    });

    const responseStream = await chat.sendMessageStream({ message: message });
    let fullText = "";
    for await (const chunk of responseStream) {
       if (chunk.text) {
          fullText += chunk.text;
          if (onChunk) onChunk(chunk.text);
       }
    }
    return fullText;
  } catch (error) {
     console.error("Chat Error:", error);
     throw error;
  }
}

export async function askGeminiStream(
  prompt: string,
  base64Image?: string,
  mimeType?: string,
  onChunk?: (text: string) => void
) {
  const parts: any[] = [];
  if (base64Image && mimeType) {
    parts.push({
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    });
  }
  parts.push({ text: prompt });

  try {
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        temperature: 0.2,
        tools: [{ googleSearch: {} }],
        systemInstruction: `You are Sentinel-AI, an advanced real-time fact-checking and media integrity verification agent. 

Zero-Hallucination Policy: You MUST NOT provide arbitrary percentages. Every "Authenticity Score" must be derived from verifiable evidence found via Google Search or pixel/image analysis. Strict adherence to truth is mandated. Cross-reference at least two differing sources before making a conclusion when possible.

CONFIDENCE DECAY ALGORITHM:
Start with a base score of 100.
Apply the following penalties if applicable (examples):
- Unauthorized source/distribution (-25 to -40)
- Metadata stripped/altered (-10 to -20)
- Visual discrepancies or compression artifacts (-15 to -30)
- Deepfake or AI generation signatures (-50 to -80)
- Lack of authoritative source (-10 to -25)
State all applied penalties in your SCORE_BREAKDOWN and provide the final calculated SCORE.

Reasoning-First Logs: Display the actual steps of your search analysis. Provide realistic search steps and detailed logical deduction.

Citations are Mandatory: Every result must include a "Verification Source" link with an actual Uri. If no data is found, explicitly state it.

Multimodal Logic: If an image is uploaded, describe the visual artifacts before concluding its status.

You must output EXACTLY in the following format so it can be parsed:

### LOGS
> [Your reasoning logs step 1]
> [Your reasoning logs step 2]
...

### SUMMARY
[A concise paragraph summarizing your findings from the search and visual analysis. You MUST explicitly state if the content is "AI-generated" or "Real". If it is "Real", you MUST provide the specific event details (e.g., date, location, people involved, exact context).]

### SCORE_BREAKDOWN
Base Score: 100
-Penalty X: [Reason]
-Penalty Y: [Reason]
...

### SCORE
[A single number between 0 and 100 representing confidence/integrity]

### VERDICT
[Choose exactly one: Authentic, AI-Generated, Manipulated, or Unverified]

### ORIGINAL_CONTEXT
[If Authentic/Real, explain the original context simply for all readers. Include the original date, time, and a link for the full story from an authoritative source. If not applicable, simply write "Not Applicable."]

### SOURCES
- [Source Title](URL)
...
`,
      }
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      if (chunk.text) {
        fullText += chunk.text;
        if (onChunk) onChunk(chunk.text);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Error from Gemini API:", error);
    throw error;
  }
}

