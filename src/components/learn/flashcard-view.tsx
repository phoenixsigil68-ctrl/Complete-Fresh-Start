'use client';

import { useState } from 'react';
import type { Chapter } from '@/lib/types';
import { createFlashcardsAction, type CreateFlashcardsState } from '@/app/actions';
import { Button } from '../ui/button';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';
import { FlashcardCarousel } from './flashcard-carousel';
import { useTranslation } from '@/context/language-context';

export function FlashcardView({ chapter }: { chapter: Chapter }) {
  const [state, setState] = useState<CreateFlashcardsState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleGenerate = async () => {
    setIsLoading(true);
    setState(null);
    const result = await createFlashcardsAction(chapter.content);
    setIsLoading(false);
    setState(result);

    if (!result.success) {
      toast({
        variant: 'destructive',
        title: t('flashcardView.errorTitle'),
        description: result.message,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('flashcardView.title')}</CardTitle>
        <CardDescription>
          {t('flashcardView.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6">
        {!state?.data && (
           <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('flashcardView.creating')}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {t('flashcardView.createButton')}
              </>
            )}
          </Button>
        )}

        {isLoading && (
            <div className="flex flex-col items-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mb-2" />
                <p>{t('flashcardView.generating')}</p>
            </div>
        )}

        {state?.success && state.data && (
          <div className="w-full">
            <FlashcardCarousel flashcards={state.data.flashcards} />
             <div className="text-center mt-6">
                 <Button onClick={handleGenerate} disabled={isLoading} variant="outline">
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('flashcardView.creatingNew')}
                    </>
                    ) : (
                    <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {t('flashcardView.createNew')}
                    </>
                    )}
                </Button>
            </div>
          </div>
        )}

        {!isLoading && state && !state.success && (
          <Alert variant="destructive" className="w-full max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t('flashcardView.errorTitle')}</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !state && (
             <div className="flex items-center justify-center h-40 text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg w-full">
              <p>{t('flashcardView.initialPrompt')}</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
