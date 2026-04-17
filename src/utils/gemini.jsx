import { GoogleGenAI } from "@google/genai";

// Temporary hardcoded key, per current project setup.
export const GEMINI_API = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API });
export default ai;

