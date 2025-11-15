'use client';

import { useState } from 'react';
import type { Chapter, Grade, Subject } from '@/lib/types';
import { createPaperAction, type CreatePaperState } from '@/app/actions';
import { Button } from '../ui/button';
import { Loader2, Sparkles, AlertTriangle, Printer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';
import { Separator } from '../ui/separator';

function PaperDisplay({ paper }: { paper: NonNullable<CreatePaperState['data']> }) {
  const { t } = useTranslation();
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="mt-6 print:shadow-none print:border-none">
      <CardHeader className="flex flex-row justify-between items-start print:flex-row-reverse">
        <div>
          <CardTitle className="text-2xl font-bold">{paper.title}</CardTitle>
          <CardDescription>{t('paperGenerator.totalMarks', { marks: paper.totalMarks })}</CardDescription>
        </div>
        <Button variant="outline" size="icon" onClick={handlePrint} className="print:hidden">
          <Printer className="h-4 w-4" />
          <span className="sr-only">{t('paperGenerator.print')}</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Multiple Choice Questions */}
        <section>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">{t('paperGenerator.mcqs')} (5 {t('paperGenerator.marks')})</h3>
          <div className="space-y-4">
            {paper.multipleChoiceQuestions.map((q, index) => (
              <div key={`mcq-${index}`}>
                <p className="font-semibold">{index + 1}. {q.question}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 pl-4">
                  {q.options.map((opt, i) => <p key={i}>({String.fromCharCode(97 + i)}) {opt}</p>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Short Answer Questions */}
        <section>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">{t('paperGenerator.shortAnswer')} (10 {t('paperGenerator.marks')})</h3>
          <div className="space-y-4">
            {paper.shortAnswerQuestions.map((q, index) => (
              <div key={`saq-${index}`}>
                <p className="font-semibold">{index + 1}. {q.question}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Long Answer Questions */}
        <section>
          <h3 className="text-lg font-semibold border-b pb-2 mb-4">{t('paperGenerator.longAnswer')} (10 {t('paperGenerator.marks')})</h3>
          <div className="space-y-4">
            {paper.longAnswerQuestions.map((q, index) => (
              <div key={`laq-${index}`}>
                <p className="font-semibold">{index + 1}. {q.question}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator />
        
        <div className="text-center font-bold text-primary pt-4">{t('paperGenerator.endOfPaper')}</div>

      </CardContent>
    </Card>
  );
}

export function PaperGenerator({ chapter, grade, subject }: { chapter: Chapter; grade: Grade; subject: Subject }) {
  const [state, setState] = useState<CreatePaperState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t, language } = useTranslation();

  const handleGenerate = async () => {
    setIsLoading(true);
    setState(null);
    const result = await createPaperAction(chapter.content, grade.name, subject.name, language);
    setIsLoading(false);
    setState(result);

    if (!result.success) {
      toast({
        variant: 'destructive',
        title: t('paperGenerator.errorTitle'),
        description: result.message,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('paperGenerator.title')}</CardTitle>
        <CardDescription>{t('paperGenerator.description')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6">
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable-paper, .printable-paper * {
              visibility: visible;
            }
            .printable-paper {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}</style>
        
        {!state?.data && (
          <Button onClick={handleGenerate} disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('paperGenerator.creating')}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                {t('paperGenerator.createButton')}
              </>
            )}
          </Button>
        )}

        {isLoading && (
          <div className="flex flex-col items-center text-muted-foreground p-8">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>{t('paperGenerator.generating')}</p>
          </div>
        )}

        {state?.success && state.data && (
          <div className="w-full">
            <div className="text-center">
              <Button onClick={handleGenerate} disabled={isLoading} variant="outline">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('paperGenerator.creatingNew')}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t('paperGenerator.createNew')}
                  </>
                )}
              </Button>
            </div>
            <div className="printable-paper">
              <PaperDisplay paper={state.data} />
            </div>
          </div>
        )}

        {!isLoading && state && !state.success && (
          <Alert variant="destructive" className="w-full max-w-md">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t('paperGenerator.errorTitle')}</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {!isLoading && !state && (
          <div className="flex items-center justify-center h-40 text-muted-foreground text-center p-4 border-2 border-dashed rounded-lg w-full">
            <p>{t('paperGenerator.initialPrompt')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
