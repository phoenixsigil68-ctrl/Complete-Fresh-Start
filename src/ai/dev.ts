'use server';
import { config } from 'dotenv';
config();

import '@/ai/schemas.ts';
import '@/ai/flows/generate-quiz-questions.ts';
import '@/ai/flows/chat-flow.ts';
import '@/ai/flows/ask-doubt-flow.ts';
import '@/ai/flows/generate-flashcards-flow.ts';
import '@/ai/flows/summarize-content-flow.ts';
import '@/ai/flows/generate-quiz-from-image-flow.ts';
import '@/ai/flows/text-to-speech-flow.ts';
