'use client';

import { useState, useEffect } from 'react';
import type { QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, Percent, History, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/language-context';

export function QuizTaker({ initialQuestions, chapterId }: { initialQuestions: QuizQuestion[]; chapterId: string }) {
  const [questions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState<number | null>(null);

  const { toast } = useToast();
  const { t } = useTranslation();
  const storageKey = `quiz_progress_${chapterId}`;

  useEffect(() => {
    // This effect runs only on the client
    const savedScore = localStorage.getItem(storageKey);
    if (savedScore) {
      setLastScore(JSON.parse(savedScore));
    }
  }, [storageKey]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswerIndex === userAnswers[index]) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);
    localStorage.setItem(storageKey, JSON.stringify(finalScore));
    toast({
      title: t('quizTaker.quizComplete'),
      description: t('quizTaker.score').replace('{score}', String(finalScore)),
    });
  };

  const resetQuiz = () => {
    setIsSubmitted(false);
    setLastScore(score);
    setUserAnswers(Array(questions.length).fill(-1));
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader className="text-center items-center">
          <Percent className="mx-auto h-12 w-12 text-accent" />
          <CardTitle className="text-2xl font-bold">{t('quizTaker.result')}</CardTitle>
          <p className="text-4xl font-bold text-primary">{score}%</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {questions.map((q, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg ${
                userAnswers[index] === q.correctAnswerIndex ? 'border-green-500/50' : 'border-destructive'
              }`}
            >
              <p className="font-semibold mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-2 mt-2">
                {q.options.map((option, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    {i === userAnswers[index] && i === q.correctAnswerIndex && (
                      <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                    )}
                    {i === userAnswers[index] && i !== q.correctAnswerIndex && (
                      <XCircle className="h-5 w-5 shrink-0 text-destructive" />
                    )}
                    {i !== userAnswers[index] && i === q.correctAnswerIndex && (
                      <CheckCircle className="h-5 w-5 shrink-0 opacity-50" />
                    )}
                    {i !== userAnswers[index] && i !== q.correctAnswerIndex && <div className="h-5 w-5 shrink-0" />}

                    <span className={`${i === q.correctAnswerIndex ? 'font-semibold' : ''}`}>{option}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={resetQuiz}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('quizTaker.tryAgain')}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card>
      {lastScore !== null && (
        <Alert variant="default" className="m-4 border-accent">
          <History className="h-4 w-4" />
          <AlertTitle>{t('quizTaker.lastAttempt')}</AlertTitle>
          <AlertDescription>{t('quizTaker.lastScore').replace('{score}', String(lastScore))}</AlertDescription>
        </Alert>
      )}
      <CardHeader>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {t('quizTaker.questionProgress').replace('{current}', String(currentQuestionIndex + 1)).replace('{total}', String(questions.length))}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <h4 className="text-lg font-semibold">{currentQuestion.question}</h4>
        <RadioGroup onValueChange={val => handleAnswerSelect(Number(val))} value={String(userAnswers[currentQuestionIndex])}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors">
              <RadioGroupItem value={String(index)} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentQuestionIndex(prev => prev - 1)} disabled={currentQuestionIndex === 0}>
          {t('quizTaker.previous')}
        </Button>
        {currentQuestionIndex === questions.length - 1 ? (
          <Button onClick={handleSubmit} disabled={userAnswers[currentQuestionIndex] === -1}>
            {t('quizTaker.finish')}
          </Button>
        ) : (
          <Button onClick={() => setCurrentQuestionIndex(prev => prev + 1)} disabled={userAnswers[currentQuestionIndex] === -1}>
            {t('quizTaker.next')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
