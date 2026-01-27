import { GoogleGenerativeAI } from "@google/generative-ai";
import type DatabaseService from "../database/service";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default class AIService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAiNote(noteId: string) {
    return await this.databaseService.getAll(noteId);
  }

  async createNote() {
    // TO DO
  }

  async updateNote() {
    // TO DO
  }

  async deleteNote() {
    // TO DO
  }  

  async analyzeNote(content: string) {
    const prompt = `
      Analyze the following journal entry for sentiment and a brief summary.
      Return the response strictly as a JSON object with the following keys:
      "sentiment": (a single word like Happy, Sad, Anxious, Productive, or Neutral)
      "summary": (a 10-15 word summary of the entry)

      Journal Entry: "${content}"
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return text; 
    } catch (error) {
      console.error("AI Analysis failed:", error);
      return "Analysis unavailable.";
    }
  }
}