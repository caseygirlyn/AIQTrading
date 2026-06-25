let ai = null;

async function getAiClient() {
    if (ai) return ai;

    if (typeof window === "undefined") {
        return null;
    }

    try {
        const { GoogleGenAI } = await import("@google/genai");
        ai = new GoogleGenAI({
            apiKey: import.meta.env.VITE_GEMINI_API_KEY,
        });
        return ai;
    } catch {
        return null;
    }
}

export async function analyzeWithAI(input = {}) {
    const prompt = `
You are a trading analyst.

Use ONLY this data:

${JSON.stringify(input, null, 2)}

Return JSON:
{
  "bias": "Bullish|Bearish|Neutral",
  "confidence": number (0-100),
  "analysis": string,
  "risk": string,
  "opportunity": string,
  "scenarios": [
    { "name": string, "condition": string, "action": string }
  ]
}
`;

    const client = await getAiClient();

    if (!client) {
        return {
            bias: "Neutral",
            confidence: 0,
            analysis: "AI analysis is unavailable in this environment.",
            risk: "Unknown",
            opportunity: "Unknown",
            scenarios: [],
        };
    }

    const res = await client.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            thinkingConfig: {
                thinkingLevel: "LOW",
            },
        },
    });

    const text = typeof res?.text === "string" ? res.text : "";

    // SAFE PARSE
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd < jsonStart) {
        return {
            bias: "Neutral",
            confidence: 0,
            analysis: "AI response was not parseable.",
            risk: "Unknown",
            opportunity: "Unknown",
            scenarios: [],
        };
    }

    const cleanJson = text.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(cleanJson);
}