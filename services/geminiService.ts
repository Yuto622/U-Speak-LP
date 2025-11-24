import { GoogleGenAI, Type } from "@google/genai";
import { University, Topic, MonologueResponse } from '../types';

const apiKey = process.env.API_KEY || '';

const getAIClient = () => {
  if (!apiKey) {
    console.warn("API_KEY is missing. Mock data might be returned or errors will occur.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateStudentMonologue = async (
  university: University,
  topic: Topic
): Promise<MonologueResponse> => {
  if (!apiKey) {
    // Fallback for demo purposes if no key is present
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          text: "Honestly, the marine layer over the pier this morning was mystical. I think I'm gonna skip Econ to meditate on the beach. Don't judge me.",
          author: "Kai",
          university: university,
          mood: "Zen / Rebellious",
          background_sound: "Distant waves & Seagulls",
          emoji: "🌊",
          color_hex: "#00f0ff",
          timestamp: "10:42 AM"
        });
      }, 2000);
    });
  }

  const ai = getAIClient();

  const prompt = `
    Generate a vivid, authentic "inner monologue" (hitorigoto) of a university student from ${university}.
    The topic is: ${topic}.
    
    The output must be a JSON object describing the moment.
    
    Style guide:
    - Casual, spoken English.
    - Use slang appropriate for ${university === University.STANFORD ? 'Silicon Valley/Tech/Startup culture' : 'LA/Beach/Hollywood culture'}.
    - Length: 2 sentences max.
    - "background_sound": A short description of the ambient noise around them.
    - "mood": 1-2 words describing their vibe.
    - "color_hex": A HEX color code that represents this specific mood (e.g. #FF0000 for angry, #00FFFF for chill, #FF00FF for romantic).
    - "timestamp": A realistic time of day (e.g. "2:04 AM", "11:30 AM").
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            author: { type: Type.STRING, description: "A fictional first name" },
            university: { type: Type.STRING },
            mood: { type: Type.STRING },
            background_sound: { type: Type.STRING },
            emoji: { type: Type.STRING, description: "One single emoji representing the text" },
            color_hex: { type: Type.STRING },
            timestamp: { type: Type.STRING }
          },
          required: ["text", "author", "university", "mood", "background_sound", "emoji", "color_hex", "timestamp"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No text generated");
    
    const data = JSON.parse(jsonText);
    
    return {
      text: data.text,
      author: data.author,
      university: university,
      mood: data.mood,
      background_sound: data.background_sound,
      emoji: data.emoji,
      color_hex: data.color_hex,
      timestamp: data.timestamp
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};