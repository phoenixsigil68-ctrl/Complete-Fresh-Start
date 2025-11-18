'use server';

/**
 * @fileOverview AI-powered exam paper generator for students.
 *
 * - generatePaper - A function that generates a sample paper based on chapter content.
 * - GeneratePaperInput - The input type for the generatePaper function.
 * - GeneratePaperOutput - The return type for the generatePaper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { MultipleChoiceQuestionSchema } from '../schemas';

const ShortAnswerQuestionSchema = z.object({
    question: z.string().describe('The short answer question text in Gujarati.'),
});

const LongAnswerQuestionSchema = z.object({
    question: z.string().describe('The long answer question text in Gujarati.'),
});

const GeneratePaperInputSchema = z.object({
  chapterContent: z.string().describe('The full text content of the chapter.'),
  grade: z.string().describe('The grade level for the paper.'),
  subject: z.string().describe('The subject of the paper.'),
});
export type GeneratePaperInput = z.infer<typeof GeneratePaperInputSchema>;

const GeneratePaperOutputSchema = z.object({
    title: z.string().describe('The title of the paper in Gujarati.'),
    totalMarks: z.number().int().describe('The total marks for the paper.'),
    multipleChoiceQuestions: z.array(MultipleChoiceQuestionSchema).describe('An array of multiple-choice questions.'),
    shortAnswerQuestions: z.array(ShortAnswerQuestionSchema).describe('An array of short answer questions.'),
    longAnswerQuestions: z.array(LongAnswerQuestionSchema).describe('An array of long answer questions.'),
});
export type GeneratePaperOutput = z.infer<typeof GeneratePaperOutputSchema>;


export async function generatePaper(input: GeneratePaperInput): Promise<GeneratePaperOutput> {
  return generatePaperFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generatePaperPrompt',
    input: {schema: GeneratePaperInputSchema},
    output: {schema: GeneratePaperOutputSchema},
    prompt: `You are an expert Gujarati educator creating a sample exam paper for students.

Your task is to generate a 25-mark sample paper from the following chapter content for the specified grade and subject.

- The paper must be in Gujarati.
- The paper should have a suitable title.
- The paper should be worth a total of 25 marks.
- Include a mix of question types:
  - 5 multiple-choice questions (1 mark each)
  - 5 short answer questions (2 marks each)
  - 2 long answer questions (5 marks each)

Ensure the questions are relevant to the chapter content and appropriate for the grade level.

Grade: {{grade}}
Subject: {{subject}}
Chapter Content:
---
{{{chapterContent}}}
---

Your response must be a JSON object matching the specified output schema.`,
});


const generatePaperFlow = ai.defineFlow(
  {
    name: 'generatePaperFlow',
    inputSchema: GeneratePaperInputSchema,
    outputSchema: GeneratePaperOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
