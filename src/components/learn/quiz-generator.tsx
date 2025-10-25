'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { createQuizAction, type CreateQuizState } from '@/app/actions';
import type { Chapter, Grade, Subject } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Lightbulb, Sparkles } from 'lucide-react';
import { useTranslation } from '@/context/language-context';

const initialState: CreateQuizState = {
  formKey: 0,
  success: false,
  message: '',
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <Button type="submit" disabled={pending} className="bg-primary hover:bg-primary/90">
      <Sparkles className="mr-2 h-4 w-4" />
      {pending ? t('quizGenerator.loading') : t('quizGenerator.button')}
    </Button>
  );
}

export function QuizGenerator({ chapter, grade, subject }: { chapter: Chapter; grade: Grade; subject: Subject }) {
  const [state, formAction] = useActionState(createQuizAction, initialState);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (state.message) {
      toast({
        variant: state.success ? 'default' : 'destructive',
        title: state.success ? t('quizGenerator.success') : t('quizGenerator.error'),
        description: state.message,
      });
    }
  }, [state, toast, t]);

  return (
    <div className="space-y-4">
      <form key={state.formKey} action={formAction} className="flex flex-col items-start space-y-4">
        <input type="hidden" name="gradeLevel" value={grade.id} />
        <input type="hidden" name="subjectName" value={subject.name} />
        <input type="hidden" name="chapterName" value={chapter.name} />
        <SubmitButton />
      </form>

      {state.data && (
        <div className="mt-6 space-y-6">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>{t('quizGenerator.newQuestionsTitle')}</AlertTitle>
            <AlertDescription>{t('quizGenerator.newQuestionsDescription')}</AlertDescription>
          </Alert>
          {state.data.questions.map((q, index) => (
            <div key={index} className="p-4 border rounded-lg bg-background">
              <p className="font-semibold mb-2">
                {index + 1}. {q.question}
              </p>
              <RadioGroup disabled>
                {q.options.map((option, i) => (
                  <div
                    key={i}
                    className={`flex items-center space-x-2 p-2 rounded-md ${
                      i === q.correctAnswerIndex ? 'bg-green-500/10' : ''
                    }`}
                  >
                    <RadioGroupItem value={String(i)} id={`gen-q${index}-opt${i}`} checked={i === q.correctAnswerIndex} />
                    <Label
                      htmlFor={`gen-q${index}-opt${i}`}
                      className={`${i === q.correctAnswerIndex ? 'font-bold text-primary' : ''}`}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
