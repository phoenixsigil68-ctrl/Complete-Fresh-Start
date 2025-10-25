'use server';

import { generateQuizQuestions } from '@/ai/flows/generate-quiz-questions';
import type { GenerateQuizQuestionsOutput } from '@/ai/flows/generate-quiz-questions';
import { chat, type ChatInput } from '@/ai/flows/chat-flow';
import { askDoubt } from '@/ai/flows/ask-doubt-flow';
import { generateFlashcards, type GenerateFlashcardsOutput } from '@/ai/flows/generate-flashcards-flow';
import { summarizeContent } from '@/ai/flows/summarize-content-flow';
import { generateQuizFromImage, type GenerateQuizFromImageOutput } from '@/ai/flows/generate-quiz-from-image-flow';
import { textToSpeech } from '@/ai/flows/text-to-speech-flow';
import {type Message} from 'genkit';

export type CreateQuizState = {
  formKey: number;
  success: boolean;
  message: string;
  data: GenerateQuizQuestionsOutput | null;
};

export async function createQuizAction(
  prevState: CreateQuizState,
  formData: FormData
): Promise<CreateQuizState> {
  const grade = formData.get('gradeLevel');
  if (grade !== '9' && grade !== '10' && grade !== '11' && grade !== '12') {
    return { ...prevState, success: false, message: 'અમાન્ય ધોરણ સ્તર.' };
  }

  const subject = formData.get('subjectName') as string;
  const chapter = formData.get('chapterName') as string;

  try {
    const quizData = await generateQuizQuestions({
      gradeLevel: grade,
      subject: subject,
      chapter: chapter,
      numberOfQuestions: 15,
    });
    return { formKey: prevState.formKey + 1, success: true, message: 'ક્વિઝ સફળતાપૂર્વક બનાવવામાં આવી!', data: quizData };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'એક અજ્ઞાત ભૂલ આવી.';
    return { ...prevState, success: false, message: `ક્વિઝ બનાવવામાં નિષ્ફળ: ${message}` };
  }
}

export type ChatState = {
  formKey: number;
  messages: Message[];
  error?: string;
};

export async function chatAction(
  prevState: ChatState,
  formData: FormData
): Promise<ChatState> {
  const userInput = formData.get('message') as string;
  if (!userInput) {
    return { ...prevState, error: 'Message is required' };
  }

  const history = prevState.messages || [];
  const newUserMessage: Message = { role: 'user', content: [{text: userInput}] };
  const newHistory = [...history, newUserMessage];

  try {
    const responseText = await chat({
      history: newHistory,
      message: userInput,
    });

    const audioDataUri = await textToSpeech(responseText);
    
    const modelResponse: Message = { 
      role: 'model', 
      content: [
        {text: responseText},
        ...(audioDataUri ? [{data: {uri: audioDataUri, contentType: 'audio/wav'}}] : [])
      ]
    };

    return {
      formKey: prevState.formKey + 1,
      messages: [...newHistory, modelResponse],
    };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      ...prevState,
      messages: newHistory, // Keep history up to the user's message
      error: `Failed to get response: ${message}`,
    };
  }
}

export type AskDoubtState = {
  formKey: number;
  question: string;
  answer: string | null;
  error?: string;
};

export async function askDoubtAction(
  prevState: AskDoubtState,
  formData: FormData
): Promise<AskDoubtState> {
  const question = formData.get('question') as string;
  const chapterContent = formData.get('chapterContent') as string;

  if (!question) {
    return { ...prevState, error: 'પ્રશ્ન જરૂરી છે.', answer: null };
  }

  try {
    const response = await askDoubt({
      chapterContent: chapterContent,
      question: question,
    });
    return { formKey: prevState.formKey + 1, question, answer: response };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { ...prevState, question, error: `જવાબ મેળવવામાં નિષ્ફળ: ${message}`, answer: null };
  }
}

export type CreateFlashcardsState = {
  success: boolean;
  message: string;
  data: GenerateFlashcardsOutput | null;
};

export async function createFlashcardsAction(
  chapterContent: string
): Promise<CreateFlashcardsState> {
  if (!chapterContent) {
    return { success: false, message: 'પ્રકરણ સામગ્રી ખૂટે છે.', data: null };
  }

  try {
    const flashcardData = await generateFlashcards({
      chapterContent: chapterContent,
      count: 10,
    });
    return { success: true, message: 'ફ્લેશકાર્ડ્સ સફળતાપૂર્વક બનાવવામાં આવ્યા!', data: flashcardData };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'એક અજ્ઞાત ભૂલ આવી.';
    return { success: false, message: `ફ્લેશકાર્ડ્સ બનાવવામાં નિષ્ફળ: ${message}`, data: null };
  }
}


export type SummarizeContentState = {
  summary: string | null;
  error?: string;
};

export async function summarizeContentAction(
  chapterContent: string
): Promise<SummarizeContentState> {
  if (!chapterContent) {
    return { summary: null, error: 'પ્રકરણ સામગ્રી ખૂટે છે.' };
  }

  try {
    const response = await summarizeContent({
      chapterContent: chapterContent,
    });
    return { summary: response };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'એક અજ્ઞાત ભૂલ આવી.';
    return { summary: null, error: `સારાંશ બનાવવામાં નિષ્ફળ: ${message}` };
  }
}

export type CreateQuizFromImageState = {
    formKey: number;
    success: boolean;
    message: string;
    data: GenerateQuizFromImageOutput | null;
};

export async function createQuizFromImageAction(
    prevState: CreateQuizFromImageState,
    formData: FormData
): Promise<CreateQuizFromImageState> {
    const imageDataUri = formData.get('imageDataUri') as string;

    if (!imageDataUri) {
        return { ...prevState, success: false, message: 'કૃપા કરીને એક છબી અપલોડ કરો.' };
    }

    try {
        const quizData = await generateQuizFromImage({
            imageDataUri: imageDataUri,
        });
        return { formKey: prevState.formKey + 1, success: true, message: 'છબીમાંથી ક્વિઝ સફળતાપૂર્વક બનાવવામાં આવી!', data: quizData };
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : 'એક અજ્ઞાત ભૂલ આવી.';
        return { ...prevState, success: false, message: `ક્વિઝ બનાવવામાં નિષ્ફળ: ${message}` };
    }
}
