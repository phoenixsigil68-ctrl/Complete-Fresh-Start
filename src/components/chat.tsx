'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatAction, type ChatState } from '@/app/actions';
import { Loader2, Send, Bot, Copy, Check, Volume2, StopCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Message } from 'genkit';
import { useTranslation } from '@/context/language-context';

const initialChatState: ChatState = {
  formKey: 0,
  messages: [],
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">{t('chat.sendMessage')}</span>
    </Button>
  );
}

function MessageActions({ message }: { message: Message }) {
    const [isCopied, setIsCopied] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const { toast } = useToast();
    const audioRef = useRef<HTMLAudioElement>(null);
    const { t } = useTranslation();

    const messageText = message.content.map(part => part.text).join('');
    const audioPart = message.content.find(part => part.data?.uri);
    const audioUri = audioPart?.data?.uri;
    
    const handleCopy = () => {
        navigator.clipboard.writeText(messageText).then(() => {
            setIsCopied(true);
            toast({ title: t('chat.messageCopied'), description: t('chat.copyDescription') });
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    const handleToggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };
    
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const onEnded = () => setIsPlaying(false);
            audio.addEventListener('ended', onEnded);
            return () => {
                audio.removeEventListener('ended', onEnded);
            };
        }
    }, []);


    return (
        <div className="absolute top-1 right-1 flex items-center space-x-1">
            {audioUri && (
                <>
                    <audio ref={audioRef} src={audioUri} className="hidden" preload="auto" />
                    <Button
                        onClick={handleToggleAudio}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:bg-background/50 hover:text-foreground"
                    >
                        {isPlaying ? <StopCircle className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span className="sr-only">{isPlaying ? t('chat.stopAudio') : t('chat.playAudio')}</span>
                    </Button>
                </>
            )}
            <Button
                onClick={handleCopy}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:bg-background/50 hover:text-foreground"
            >
                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">{t('chat.copyResponse')}</span>
            </Button>
        </div>
    );
}

export function Chat() {
  const [state, formAction, isPending] = useActionState(chatAction, initialChatState);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  useEffect(() => {
    if (state.error) {
        toast({ variant: 'destructive', title: t('chat.chatError'), description: state.error });
    }
  }, [state.error, toast, t]);

  useEffect(() => {
    if (state.formKey > 0) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }, [state.formKey]);
  
  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [state.messages, isPending]);

  return (
    <Card className="w-full max-w-lg mx-auto bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot />
          {t('chat.botName')}
        </CardTitle>
        <CardDescription>{t('chat.botGreeting')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full pr-4" viewportRef={viewportRef}>
          <div className="space-y-4">
            {state.messages.map((message, index) => {
              const messageText = message.content.map(part => part.text).join('');
              return (
              <div
                key={index}
                className={cn(
                  'relative flex flex-col gap-2 rounded-lg px-3 py-2 text-sm animate-fade-in-down',
                  message.role === 'user'
                    ? 'ml-auto bg-primary text-primary-foreground max-w-[85%]'
                    : 'bg-muted max-w-[85%]'
                )}
              >
                <p className="whitespace-pre-wrap break-words pr-16">
                    {messageText}
                </p>
                {message.role === 'model' && <MessageActions message={message} />}
              </div>
            )})}
             {isPending && (
                <div className="flex items-center space-x-2 animate-fade-in-down">
                    <div className="flex-shrink-0 p-2 bg-muted rounded-full">
                        <Bot className="h-5 w-5"/>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form ref={formRef} key={state.formKey} action={formAction} className="flex w-full items-center space-x-2">
          <input type="hidden" name="history" value={JSON.stringify(state.messages)} />
          <Input name="message" ref={inputRef} placeholder={t('chat.inputPlaceholder')} className="flex-1" autoComplete="off" />
          <SubmitButton />
        </form>
      </CardFooter>
    </Card>
  );
}
