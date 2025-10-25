'use client';

import { useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { askDoubtAction, type AskDoubtState } from '@/app/actions';
import type { Chapter } from '@/lib/types';
import { HelpCircle, Loader2, Send } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useTranslation } from '@/context/language-context';

const initialAskDoubtState: AskDoubtState = {
  formKey: 0,
  question: '',
  answer: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('askDoubt.loading')}
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          {t('askDoubt.button')}
        </>
      )}
    </Button>
  );
}

export function AskDoubt({ chapter }: { chapter: Chapter }) {
  const [state, formAction, isPending] = useActionState(askDoubtAction, initialAskDoubtState);
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-xl font-bold font-headline mb-3 text-primary flex items-center">
        <HelpCircle className="mr-3 h-6 w-6" />
        {t('askDoubt.title')}
      </h3>
      <p className="mb-4 text-muted-foreground text-sm">
        {t('askDoubt.description')}
      </p>

      <form ref={formRef} key={state.formKey} action={formAction} className="flex flex-col items-start space-y-4">
        <input type="hidden" name="chapterContent" value={chapter.content} />
        <Textarea
          name="question"
          placeholder={t('askDoubt.placeholder')}
          className="bg-background"
          rows={3}
          required
        />
        <SubmitButton />
      </form>

      {isPending && state.question && (
        <Card className="mt-4 bg-muted/50">
          <CardContent className="p-4 space-y-2">
            <p className="font-semibold text-sm text-primary">{state.question}</p>
            <div className="flex items-center text-muted-foreground text-sm">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>{t('askDoubt.generating')}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {state.answer && !isPending && (
         <Card className="mt-6 bg-background shadow-inner">
          <CardContent className="p-4 space-y-3">
             <p className="font-semibold text-sm text-primary">{state.question}</p>
             <div className="border-t pt-3 mt-3">
                 <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground/90">{state.answer}</p>
             </div>
          </CardContent>
        </Card>
      )}

      {state.error && (
        <Card className="mt-4 bg-destructive/10 border-destructive">
          <CardContent className="p-4">
            <p className="text-sm text-destructive-foreground">{state.error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
