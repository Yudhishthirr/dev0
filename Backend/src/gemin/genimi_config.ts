import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
dotenv.config();


const Model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMENI_API_KEY,
    // model: "gemini-2.5-flash-preview-04-17",
    // model: "gemini-2.5-pro-preview-06-05",
    model: "gemini-2.5-flash-preview-05-20",
    // maxOutputTokens: 9000
    // streaming: true,
});

export {Model}