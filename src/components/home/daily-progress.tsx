'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';
import { useLearningTracker } from '@/hooks/use-learning-tracker';
import { useTranslation } from '@/context/language-context';

const DAILY_GOAL_MINUTES = 45;

export function DailyProgress() {
  const { t } = useTranslation();
  const [progress, setProgress] = useState({ learnedMinutes: 0, goalMinutes: DAILY_GOAL_MINUTES });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedProgress = useLearningTracker.getState();
      setProgress(storedProgress);
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Initial load

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const percentage = Math.min((progress.learnedMinutes / progress.goalMinutes) * 100, 100);

  const getProgressText = () => {
    if (percentage >= 100) {
      return t('home.dailyProgress.goalComplete');
    }
    return t('home.dailyProgress.goalProgress').replace('{percentage}', String(Math.floor(percentage)));
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-lg border">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-xl font-headline">
          <Target className="mr-2 text-primary" />
          {t('home.dailyProgress.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-primary">{Math.floor(progress.learnedMinutes)}
            <span className="text-lg font-medium text-muted-foreground"> / {progress.goalMinutes} {t('home.dailyProgress.minutes')}</span>
          </p>
        </div>
        <Progress value={percentage} className="w-full h-2.5" />
         <p className="text-sm text-center text-muted-foreground mt-3">
            {getProgressText()}
        </p>
      </CardContent>
    </Card>
  );
}
