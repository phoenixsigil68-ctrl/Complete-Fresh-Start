import { DailyProgress } from '@/components/home/daily-progress';
import { QuotesSlider } from '@/components/home/quotes-slider';
import { SelectionForm } from '@/components/home/selection-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileImage, GraduationCap, Sparkles } from 'lucide-react';
import Link from 'next/link';

function Header() {
  return (
    <header className="relative text-center mb-8 pt-8">
      <div className="absolute top-4 right-4">
        <Button asChild variant="ghost">
          <Link href="/chatbot">ચેટ કરો</Link>
        </Button>
      </div>
      <div className="inline-block bg-primary/10 p-3 rounded-full">
        <div className="inline-block bg-primary/20 p-2 rounded-full">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl font-bold font-headline mt-4 text-primary">વિદ્યાર્થી સહાયક</h1>
      <p className="text-muted-foreground mt-2 text-lg">તમારા અભ્યાસ માટે AI-સંચાલિત માર્ગદર્શક</p>
    </header>
  );
}

export default function Home() {
  return (
    <div
      className="min-h-screen bg-background bg-cover bg-center"
    >
      <div className="min-h-screen bg-background/90 backdrop-blur-sm">
        <main className="container mx-auto p-4 md:p-8">
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border">
              <CardHeader>
                <CardTitle>ચાલો શરૂ કરીએ!</CardTitle>
                <CardDescription>તમારું ધોરણ, વિષય અને પ્રકરણ પસંદ કરો.</CardDescription>
              </CardHeader>
              <CardContent>
                <SelectionForm />
              </CardContent>
            </Card>

            <div className="space-y-8">
              <DailyProgress />
              <Card className="bg-card/80 backdrop-blur-sm shadow-lg border">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Sparkles className="mr-3 text-primary h-5 w-5"/>
                        છબીમાંથી ક્વિઝ બનાવો
                    </CardTitle>
                    <CardDescription>પાઠ્યપુસ્તકના પૃષ્ઠની છબી અપલોડ કરીને ક્વિઝ બનાવો.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="outline">
                        <Link href="/quiz-from-image">
                            અહીં ક્લિક કરો
                        </Link>
                    </Button>
                </CardContent>
              </Card>
              <QuotesSlider />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
