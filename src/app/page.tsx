"use client";

import { DailyProgress } from "@/components/home/daily-progress";
import { QuotesSlider } from "@/components/home/quotes-slider";
import { SelectionForm } from "@/components/home/selection-form";
import MagicBento from "@/components/MagicBento";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileImage, GraduationCap, Sparkles } from "lucide-react";
import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import RotatingText from "@/components/RotatingText";
import { useTranslation } from "@/context/language-context";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";

function Header() {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const { t } = useTranslation();
  return (
    <header className="relative text-center mb-8 pt-8">
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <LanguageToggle />
      </div>
      <div className="inline-block bg-primary/10 p-3 rounded-full">
        <div className="inline-block bg-primary/20 p-2 rounded-full">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl font-bold font-headline mt-4 text-primary">
        {t("home.title")}
      </h1>
      <p className="text-muted-foreground mt-2 text-lg">{t("home.subtitle")}</p>
    </header>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background bg-cover bg-center">
      <div className="min-h-screen bg-background/90 backdrop-blur-sm">
        <main className="container mx-auto p-4 md:p-8">
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg border">
              <CardHeader>
                <CardTitle>{t("home.selectionCard.title")}</CardTitle>
                <CardDescription>
                  {t("home.selectionCard.description")}
                </CardDescription>
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
                    <Sparkles className="mr-3 text-primary h-5 w-5" />
                    {t("home.imageQuizCard.title")}
                  </CardTitle>
                  <CardDescription>
                    {t("home.imageQuizCard.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline">
                    <Link href="/quiz-from-image">
                      {t("home.imageQuizCard.button")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              <QuotesSlider />
            </div>
          </div>
          <div className="mt-5 text-3xl flex justify-center items-center gap-5">
            Do Something
            <RotatingText
              texts={["Creative", "Productive", "Cool!"]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-[#5227FF] text-white font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center items-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </div>
          <div className="mt-10">
            <p className="text-sm text-gray-300 text-center">
              The AI can response some inaccurate information so double-check
              the resopnse
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
