// services/aiAnalysis.js

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

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

    const res = await ai.models.generateContent({
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