"use server";

import { generateQuizQuestions } from "@/ai/flows/generate-quiz-questions";
import type { GenerateQuizQuestionsOutput } from "@/ai/flows/generate-quiz-questions";
import {
  generateFlashcards,
  type GenerateFlashcardsOutput,
} from "@/ai/flows/generate-flashcards-flow";
import { summarizeContent } from "@/ai/flows/summarize-content-flow";
import {
  generateQuizFromImage,
  type GenerateQuizFromImageOutput,
} from "@/ai/flows/generate-quiz-from-image-flow";
import {
  generatePaper,
  type GeneratePaperOutput,
} from "@/ai/flows/generate-paper-flow";
import guTranslations from "@/lib/i18n/gu.json";
import enTranslations from "@/lib/i18n/en.json";

const translations = {
  gu: guTranslations,
  en: enTranslations,
};

// A helper function to get translations on the server
function getT(lang: "gu" | "en" = "gu") {
  return function t(
    key: string,
    params?: Record<string, string | number>
  ): string {
    const keys = key.split(".");
    let result: any = translations[lang];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        let fallbackResult: any = translations.en;
        for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
        }
        if (fallbackResult === undefined) return key;
        result = fallbackResult;
      }
    }

    if (typeof result === "string" && params) {
      return Object.entries(params).reduce((acc, [key, value]) => {
        return acc.replace(`{${key}}`, String(value));
      }, result);
    }

    return result || key;
  };
}

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
  const t = getT(formData.get("language") as "gu" | "en");
  const grade = formData.get("gradeLevel");
  if (grade !== "9" && grade !== "10" && grade !== "11" && grade !== "12") {
    return { ...prevState, success: false, message: t("errors.invalidGrade") };
  }

  const subject = formData.get("subjectName") as string;
  const chapter = formData.get("chapterName") as string;

  try {
    const quizData = await generateQuizQuestions({
      gradeLevel: grade,
      subject: subject,
      chapter: chapter,
      numberOfQuestions: 15,
    });
    return {
      formKey: prevState.formKey + 1,
      success: true,
      message: t("quizGenerator.success"),
      data: quizData,
    };
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : t("errors.unknown");
    return {
      ...prevState,
      success: false,
      message: t("errors.quizCreationFailed", { message }),
    };
  }
}

export type CreateFlashcardsState = {
  success: boolean;
  message: string;
  data: GenerateFlashcardsOutput | null;
};

export async function createFlashcardsAction(
  chapterContent: string,
  lang: "gu" | "en" = "gu"
): Promise<CreateFlashcardsState> {
  const t = getT(lang);
  if (!chapterContent) {
    return { success: false, message: t("errors.contentMissing"), data: null };
  }

  try {
    const flashcardData = await generateFlashcards({
      chapterContent: chapterContent,
      count: 15,
    });
    return {
      success: true,
      message: "ફ્લેશકાર્ડ્સ સફળતાપૂર્વક બનાવવામાં આવ્યા!",
      data: flashcardData,
    };
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : t("errors.unknown");
    return {
      success: false,
      message: t("errors.flashcardCreationFailed", { message }),
      data: null,
    };
  }
}

export type SummarizeContentState = {
  summary: string | null;
  error?: string;
};

export async function summarizeContentAction(
  chapterContent: string,
  lang: "gu" | "en" = "gu"
): Promise<SummarizeContentState> {
  const t = getT(lang);
  if (!chapterContent) {
    return { summary: null, error: t("errors.contentMissing") };
  }

  try {
    const response = await summarizeContent({
      chapterContent: chapterContent,
    });
    return { summary: response };
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : t("errors.unknown");
    return {
      summary: null,
      error: t("errors.summaryCreationFailed", { message }),
    };
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
  const t = getT(formData.get("language") as "gu" | "en");
  const imageDataUri = formData.get("imageDataUri") as string;

  if (!imageDataUri) {
    return { ...prevState, success: false, message: t("errors.imageRequired") };
  }

  try {
    const quizData = await generateQuizFromImage({
      imageDataUri: imageDataUri,
    });
    return {
      formKey: prevState.formKey + 1,
      success: true,
      message: t("imageQuizGenerator.quizReady"),
      data: quizData,
    };
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : t("errors.unknown");
    return {
      ...prevState,
      success: false,
      message: t("errors.imageQuizFailed", { message }),
    };
  }
}

export type CreatePaperState = {
  success: boolean;
  message: string;
  data: GeneratePaperOutput | null;
};

export async function createPaperAction(
  chapterContent: string,
  grade: string,
  subject: string,
  lang: "gu" | "en" = "gu"
): Promise<CreatePaperState> {
  const t = getT(lang);
  if (!chapterContent) {
    return { success: false, message: t("errors.contentMissing"), data: null };
  }

  try {
    const paperData = await generatePaper({
      chapterContent,
      grade,
      subject,
    });
    return {
      success: true,
      message: t("paperGenerator.success"),
      data: paperData,
    };
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : t("errors.unknown");
    return {
      success: false,
      message: t("errors.paperCreationFailed", { message }),
      data: null,
    };
  }
}
