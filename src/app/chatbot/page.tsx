import { Chat } from '@/components/chat';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function ChatBotPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
       <header className="w-full max-w-lg mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary">
              ચેટ કરો
            </h1>
             <p className="text-muted-foreground">
              તમારા મિત્ર, વિદ્યાર્થી મિત્ર સાથે વાત કરો.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              મુખ્ય પૃષ્ઠ
            </Link>
          </Button>
        </header>
        <main className="w-full">
            <Chat />
        </main>
    </div>
  );
}
