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

  const useSearch = prompt.includes('URL:') || prompt.includes('https://') || prompt.includes('http://');

  const getStreamConfig = (enableSearch: boolean) => ({
    model: "gemini-2.5-flash",
    contents: { parts },
    config: {
      temperature: 0.1,
      ...(enableSearch ? { tools: [{ googleSearch: {} }] } : {}),
      systemInstruction: `You are Sentinel-AI, an advanced real-time fact-checking and media integrity verification agent equipped with deep analysis, thinking, and authentication skills.

Zero-Hallucination Policy: You MUST NOT provide arbitrary percentages. Every "Authenticity Score" must be derived from verifiable evidence found via Google Search or strict pixel/image analysis. Strict adherence to truth is mandated. Cross-reference sources before making a conclusion.

VIDEO, AUDIO & URL ANALYSIS PROTOCOL:
If the user provides a media file (image, video, or audio) or a URL, you MUST use your "analysis skill", "thinking skill", and "authentication skills" to evaluate the specific media content.
- Perform deepfake detection for video and audio. Look for artifacts, unnatural movements, AI-generated voices, or audio-video mismatches.
- Perform real-time content verification.
- You must analyze both the video and the audio elements if present. 
- You must do a quick fact check using available resources to answer if the URL or file contains fake news, real news, or something else (and explicitly explain what it is).
- Tell the precise details of the link/file: Is the video original? What are the date and time? Is the audio tampered or mismatched while the video originates from an authority (e.g., an Indian news channel)? What is the exact source of origination?

CONFIDENCE DECAY ALGORITHM:
Start with a base score of 100.
Apply penalties (e.g., -25 for unauthorized source, -50 for AI generation or audio/video mismatch). State penalties in SCORE_BREAKDOWN and provide the final SCORE.

Speed and latency are paramount. Be extremely concise but thorough. Generate the output exactly in this format as quickly as possible without preamble:

### LOGS
[Very brief bullet points of reasoning detailing analysis of audio, video, and fact-checking]

### SUMMARY
[Concise summary of findings. Explicitly state if "Fake News", "Real News", "AI-generated", "Manipulated Audio", etc. Provide precise details on date, time, and source authority as required.]

### SCORE_BREAKDOWN
Base Score: 100
-Penalty: [Reason]

### SCORE
[Number 0-100]

### VERDICT
[Authentic, AI-Generated, Manipulated, Fake News, or Unverified]

### ORIGINAL_CONTEXT
[Explain original context briefly if Real, or "Not Applicable"]

### SOURCES
-[Source Title](URL)
`,
    }
  });

  try {
    let responseStream = await ai.models.generateContentStream(getStreamConfig(useSearch));
    let fullText = "";

    try {
      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullText += chunk.text;
          if (onChunk) onChunk(chunk.text);
        }
      }
      return fullText;
    } catch (err: any) {
      if (err.status === 403 || err.message?.includes("403") || err.message?.includes("PERMISSION_DENIED")) {
        console.warn("Retrying without googleSearch tool due to 403 error.");
        
        let fallbackStream = await ai.models.generateContentStream(getStreamConfig(false));
        fullText = "";
        for await (const chunk of fallbackStream) {
          if (chunk.text) {
            fullText += chunk.text;
            if (onChunk) onChunk(chunk.text);
          }
        }
        return fullText;
      } else {
        throw err;
      }
    }
  } catch (error) {
    console.error("Error from Gemini API:", error);
    throw error;
  }
}

