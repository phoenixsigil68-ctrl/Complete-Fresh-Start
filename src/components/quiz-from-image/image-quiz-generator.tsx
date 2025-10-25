'use client';

import { useState, useRef, useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createQuizFromImageAction, type CreateQuizFromImageState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { UploadCloud, Sparkles, Loader2, Lightbulb, AlertCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useTranslation } from '@/context/language-context';

const initialState: CreateQuizFromImageState = {
  formKey: 0,
  success: false,
  message: '',
  data: null,
};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <Button type="submit" disabled={pending || disabled} size="lg" className="w-full md:w-auto">
      <Sparkles className="mr-2 h-4 w-4" />
      {pending ? t('imageQuizGenerator.creating') : t('imageQuizGenerator.createButton')}
    </Button>
  );
}

export function ImageQuizGenerator() {
  const [state, formAction, isPending] = useActionState(createQuizFromImageAction, initialState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (state.message && !isPending) {
      toast({
        variant: state.success ? 'default' : 'destructive',
        title: state.success ? t('quizGenerator.success') : t('quizGenerator.error'),
        description: state.message,
      });
    }
     if (state.success) {
      handleRemoveImage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.formKey, state.message, state.success, isPending, toast, t]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
            variant: 'destructive',
            title: t('imageQuizGenerator.fileTooLarge'),
            description: t('imageQuizGenerator.fileSizeHint'),
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        const dataUri = e.target?.result as string;
        setPreviewUrl(dataUri);
        setImageDataUri(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setImageDataUri('');
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }


  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card className="lg:col-span-2">
        <form action={formAction}>
            <input type="hidden" name="imageDataUri" value={imageDataUri} />
            <CardHeader>
            <CardTitle>{t('imageQuizGenerator.uploadTitle')}</CardTitle>
            <CardDescription>
                {t('imageQuizGenerator.uploadDescription')}
            </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                    <label
                    htmlFor="dropzone-file"
                    className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                    >
                    {previewUrl ? (
                        <>
                        <Image src={previewUrl} alt="Image preview" fill className="object-contain rounded-lg p-2" />
                        <button 
                            type="button" 
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 shadow-md hover:bg-destructive/80 z-10"
                            aria-label="Remove image"
                            >
                            <X size={16}/>
                        </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-center text-muted-foreground">
                            <span className="font-semibold">{t('imageQuizGenerator.uploadLabel')}</span> {t('imageQuizGenerator.uploadHint')}
                        </p>
                        <p className="text-xs text-muted-foreground">{t('imageQuizGenerator.uploadValidation')}</p>
                        </div>
                    )}
                    <Input 
                        id="dropzone-file" 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/jpg"
                        disabled={isPending}
                    />
                    </label>
                </div>
                <div className="text-center pt-2">
                    <SubmitButton disabled={!previewUrl || isPending} />
                </div>
                </div>
            </CardContent>
        </form>
      </Card>
      {(isPending || state.data) && (
        <Card className="lg:col-span-2 bg-secondary/50">
            <CardHeader>
            <CardTitle>{t('imageQuizGenerator.resultTitle')}</CardTitle>
            <CardDescription>
                {t('imageQuizGenerator.resultDescription')}
            </CardDescription>
            </CardHeader>
            <CardContent>
            {isPending && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
                    <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
                    <p className="text-lg font-semibold">{t('imageQuizGenerator.generating')}</p>
                    <p>{t('imageQuizGenerator.generatingHint')}</p>
                </div>
            )}

            {state.success && state.data && (
                <div className="space-y-6">
                <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>{t('imageQuizGenerator.quizReady')}</AlertTitle>
                    <AlertDescription>{t('imageQuizGenerator.quizReadyDescription')}</AlertDescription>
                </Alert>
                <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4 -mr-4">
                {state.data.questions.map((q, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-background shadow-sm">
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
                            className={`${i === q.correctAnswerIndex ? 'font-bold text-green-700' : ''}`}
                            >
                            {option}
                            </Label>
                        </div>
                        ))}
                    </RadioGroup>
                    </div>
                ))}
                </div>
                </div>
            )}

            {!isPending && state.message && !state.success && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>{t('imageQuizGenerator.errorOccurred')}</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
            )}
            </CardContent>
        </Card>
      )}
    </div>
  );
}
