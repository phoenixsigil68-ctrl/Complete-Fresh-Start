'use client';

import { ImageQuizGenerator } from '@/components/quiz-from-image/image-quiz-generator';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';
import { LanguageToggle } from '@/components/language-toggle';

export default function QuizFromImagePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <header className="flex items-center justify-between mb-6 bg-card/80 p-4 rounded-xl shadow-lg border backdrop-blur-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary">
              {t('imageQuizGenerator.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('imageQuizGenerator.subtitle')}
            </p>
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
        <main>
          <ImageQuizGenerator />
        </main>
      </div>
    </div>
  );
}
