"use client";

import type { Chapter, Grade, Subject } from "@/lib/types";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import placeholderImages from "@/lib/placeholder-images.json";
import { BookMarked, ExternalLink, Youtube, Bot } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ContentSummarizer } from "./content-summarizer";
import { useTranslation } from "@/context/language-context";
import { useState } from "react";

export function ContentDisplay({
  chapter,
  grade,
  subject,
}: {
  chapter: Chapter;
  grade: Grade;
  subject: Subject;
}) {
  const { t } = useTranslation();
  const chapterImage = placeholderImages.placeholderImages.find(
    (img) => img.id === chapter.imageUrl
  );
  const youtubeSearchQuery = encodeURIComponent(
    `${grade.name} ${subject.name} ${chapter.name}`
  );
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${youtubeSearchQuery}`;

  const [created, setCreated] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
        <CardContent className="p-6">
          <ContentSummarizer chapter={chapter} />
        </CardContent>
      </Card>

      <Card className="row-span-1 md:row-span-2">
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold font-headline mb-3 text-primary flex items-center">
              <BookMarked className="mr-3 h-6 w-6" />
              {t("contentDisplay.textbook")}
            </h3>
            <p className="mb-4 text-muted-foreground text-sm">
              {t("contentDisplay.textbookDescription")}
            </p>
            <Button asChild className="w-full">
              <Link
                href={chapter.textbookUrl || "https://www.selfstudys.com/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("contentDisplay.openTextbook")}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-bold font-headline mb-3 text-primary flex items-center">
              <Youtube className="mr-3 h-6 w-6" />
              {t("contentDisplay.videoLecture")}
            </h3>
            <p className="mb-4 text-muted-foreground text-sm">
              {t("contentDisplay.videoLectureDescription")}
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("contentDisplay.searchOnYouTube")}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {chapterImage && (
        <Card className="overflow-hidden aspect-video">
          <Image
            src={chapterImage.imageUrl}
            alt={chapterImage.description}
            fill
            className="object-cover"
            data-ai-hint={chapterImage.imageHint}
          />
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <div>
            <h3 className="text-xl font-bold font-headline mb-3 text-primary flex items-center">
              <Bot className="mr-3 h-6 w-6" />
              {t("contentDisplay.chatbotTitle")}
            </h3>
            <p className="mb-4 text-muted-foreground text-sm">
              {t("contentDisplay.chatbotDescription")}
            </p>
            <Button asChild className="w-full">
              <Link
                href={created ? "http://localhost:5173/chatbot" : "/not-found"}
                target="_parent"
                rel="noopener noreferrer"
              >
                {t("contentDisplay.chatbotButton")}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {chapter.videoUrl && (
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold font-headline mb-4 text-primary">
              {t("contentDisplay.videoLecture")}
            </h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full border-0"
                src={chapter.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
