"use server";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { topic } = body;

  const ai = new GoogleGenAI({});

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: topic,
    config: {
      systemInstruction:
        "You are a expert AI tutor and a friendly AI chatbot. Always answer in the Gujarati language. You can use English whenever it needed. Be a friendly tutor and answer accurately.",
    },
  });

  return NextResponse.json(response.text);
}
