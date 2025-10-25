'use client';

import type { Chapter, Grade, Subject } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizTaker } from './quiz-taker';
import { QuizGenerator } from './quiz-generator';
import { Button } from '../ui/button';
import Link from 'next/link';
import { FileImage, Sparkles } from 'lucide-react';
import { useTranslation } from '@/context/language-context';

export function QuizView({ chapter, grade, subject }: { chapter: Chapter; grade: Grade; subject: Subject }) {
  const { t } = useTranslation();
  return (
    <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t('quiz.selfAssessmentTitle')}</CardTitle>
          <CardDescription>{t('quiz.selfAssessmentDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {chapter.quiz && chapter.quiz.length > 0 ? (
            <QuizTaker initialQuestions={chapter.quiz} chapterId={`${grade.id}-${subject.id}-${chapter.id}`} />
          ) : (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg">
              <p>{t('quiz.noQuizAvailable')}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="space-y-8">
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>{t('quiz.aiGeneratorTitle')}</CardTitle>
            <CardDescription>{t('quiz.aiGeneratorDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <QuizGenerator chapter={chapter} grade={grade} subject={subject} />
          </CardContent>
        </Card>
        <Card>
           <CardHeader>
            <CardTitle className="flex items-center">
                <FileImage className="mr-3 text-primary"/>
                 {t('quiz.fromImageTitle')}
            </CardTitle>
            <CardDescription>{t('quiz.fromImageDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild variant="outline">
                <Link href="/quiz-from-image">
                    <Sparkles className="mr-2 h-5 w-5" />
                    {t('quiz.fromImageButton')}
                </Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
