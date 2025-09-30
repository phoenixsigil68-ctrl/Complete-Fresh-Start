import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectionForm } from '@/components/home/selection-form';
import placeholderImages from '@/lib/placeholder-images.json';
import { QuotesSlider } from '@/components/home/quotes-slider';
import { DailyProgress } from '@/components/home/daily-progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, GraduationCap, MessageSquare } from 'lucide-react';

export default function Home() {
  const heroImageData = placeholderImages.placeholderImages.find(img => img.id === 'hero-image');

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {heroImageData && (
          <Image
            src={heroImageData.imageUrl}
            alt={heroImageData.description}
            fill
            className="object-cover opacity-10"
            data-ai-hint={heroImageData.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/90 to-background" />
      </div>

      <div className="z-10 text-center px-4 mb-8 mt-20 md:mt-16">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4 animate-fade-in-down flex items-center justify-center">
          <GraduationCap className="w-12 h-12 mr-4" />
          વિદ્યાર્થી સહાયક
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          ધોરણ ૯-૧૨ના વિદ્યાર્થીઓ માટે એક સંપૂર્ણ શૈક્ષણિક પ્લેટફોર્મ.
        </p>
      </div>

      <div className="w-full max-w-xl z-10 mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2">
            <DailyProgress />
        </div>
        
        <Card className="w-full backdrop-blur-md bg-card/80 lg:col-span-2">
            <CardHeader>
            <CardTitle className="text-center text-2xl font-headline">તમારો પાઠ પસંદ કરો</CardTitle>
            </CardHeader>
            <CardContent>
            <SelectionForm />
            </CardContent>
        </Card>
        
        <div className="lg:col-span-2 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-primary/20 hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1">
            <Link href="/quiz-from-image">
              <Sparkles className="mr-2 h-5 w-5 text-primary" />
              Create Quiz with Image
            </Link>
          </Button>
           <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-primary/20 hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1">
            <Link href="/chatbot">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              Chat with AI
            </Link>
          </Button>
        </div>

        <div className="w-full lg:col-span-2 z-10 my-8">
            <QuotesSlider />
        </div>
      </div>

      <footer className="z-10 text-center text-muted-foreground text-sm py-4">
        <p>ગુજરાતના વિદ્યાર્થીઓ માટે પ્રેમથી બનાવેલ.</p>
      </footer>
    </main>
  );
}
