'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function FloatingChat() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button asChild size="lg" className="rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-transform hover:scale-110">
        <Link href="/chatbot">
            <MessageSquare className="mr-2 h-5 w-5" />
            Chat with an Expert
        </Link>
      </Button>
    </div>
  );
}
