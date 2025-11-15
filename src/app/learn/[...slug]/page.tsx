'use client';

import { AppData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentDisplay } from '@/components/learn/content-display';
import { QuizView } from '@/components/learn/quiz-view';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FlashcardView } from '@/components/learn/flashcard-view';
import { LearningTracker } from '@/hooks/use-learning-tracker';
import { useTranslation } from '@/context/language-context';
import { LanguageToggle } from '@/components/language-toggle';
import { use } from 'react';
import { PaperGenerator } from '@/components/learn/paper-generator';

export default function LearnPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const {slug} = use(params);
  const [gradeId, subjectId, chapterId] = slug;
  const { t } = useTranslation();

  const grade = AppData.find(g => g.id === gradeId);
  const subject = grade?.subjects.find(s => s.id === subjectId);
  const chapter = subject?.chapters.find(c => c.id === chapterId);

  if (!chapter || !grade || !subject) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <LearningTracker />
        <header className="flex items-center justify-between mb-6 bg-card/80 p-4 rounded-xl shadow-lg border backdrop-blur-sm">
          <div>
            <p className="text-sm text-muted-foreground">
              {grade.name} - {subject.name}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary">{chapter.name}</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                {t('learn.mainPage')}
              </Link>
            </Button>
          </div>
        </header>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 md:w-fit mx-auto md:mx-0 bg-card/80 backdrop-blur-sm border shadow-md">
            <TabsTrigger value="content">{t('learn.contentTab')}</TabsTrigger>
            <TabsTrigger value="flashcards">{t('learn.flashcardsTab')}</TabsTrigger>
            <TabsTrigger value="quiz">{t('learn.quizTab')}</TabsTrigger>
            <TabsTrigger value="paper">{t('learn.paperTab')}</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="mt-4">
            <ContentDisplay chapter={chapter} grade={grade} subject={subject} />
          </TabsContent>
          <TabsContent value="flashcards" className="mt-4">
            <FlashcardView chapter={chapter} />
          </TabsContent>
          <TabsContent value="quiz" className="mt-4">
            <QuizView chapter={chapter} grade={grade} subject={subject} />
          </TabsContent>
           <TabsContent value="paper" className="mt-4">
            <PaperGenerator chapter={chapter} grade={grade} subject={subject} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
