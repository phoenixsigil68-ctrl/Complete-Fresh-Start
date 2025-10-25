'use client';

import { Chat } from '@/components/chat';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/context/language-context';
import { LanguageToggle } from '@/components/language-toggle';

export default function ChatBotPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
       <header className="w-full max-w-lg mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary">
              {t('chat.title')}
            </h1>
             <p className="text-muted-foreground">
              {t('chat.subtitle')}
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
        <main className="w-full">
            <Chat />
        </main>
    </div>
  );
}
