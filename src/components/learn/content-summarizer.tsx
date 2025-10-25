'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { summarizeContentAction, type SummarizeContentState } from '@/app/actions';
import type { Chapter } from '@/lib/types';
import { Loader2, Pilcrow, Sparkles, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { useTranslation } from '@/context/language-context';

export function ContentSummarizer({ chapter }: { chapter: Chapter }) {
  const [state, setState] = useState<SummarizeContentState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setState(null);
    const result = await summarizeContentAction(chapter.content);
    setIsLoading(false);
    setState(result);
  };

  return (
    <div>
      <h3 className="text-xl font-bold font-headline mb-3 text-primary flex items-center">
        <Pilcrow className="mr-3 h-6 w-6" />
        {t('summarizer.title')}
      </h3>
      <p className="mb-4 text-muted-foreground text-sm">
        {t('summarizer.description')}
      </p>

      <Button onClick={handleGenerateSummary} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('summarizer.loading')}
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            {t('summarizer.button')}
          </>
        )}
      </Button>

      {isLoading && (
         <div className="flex items-center text-muted-foreground text-sm mt-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>{t('summarizer.generating')}</span>
        </div>
      )}

      {state?.summary && !isLoading && (
         <Card className="mt-4 bg-background shadow-inner">
          <CardContent className="p-4">
             <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {state.summary}
             </div>
          </CardContent>
        </Card>
      )}

      {state?.error && !isLoading && (
         <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t('summarizer.errorTitle')}</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
      )}
    </div>
  );
}
