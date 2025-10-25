'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppData } from '@/lib/data';
import type { Subject, Chapter } from '@/lib/types';
import { BookOpen } from 'lucide-react';
import { useTranslation } from '@/context/language-context';

export function SelectionForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    if (selectedGrade) {
      const gradeData = AppData.find(g => g.id === selectedGrade);
      setSubjects(gradeData?.subjects || []);
      setSelectedSubject('');
      setChapters([]);
      setSelectedChapter('');
    }
  }, [selectedGrade]);

  useEffect(() => {
    if (selectedSubject) {
      const subjectData = subjects.find(s => s.id === selectedSubject);
      setChapters(subjectData?.chapters || []);
      setSelectedChapter('');
    }
  }, [selectedSubject, subjects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGrade && selectedSubject && selectedChapter) {
      router.push(`/learn/${selectedGrade}/${selectedSubject}/${selectedChapter}`);
    }
  };

  const availableGrades = AppData.filter(grade => grade.subjects.length > 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Select onValueChange={setSelectedGrade} value={selectedGrade}>
          <SelectTrigger className="w-full h-12 text-base">
            <SelectValue placeholder={t('selectionForm.selectGrade')} />
          </SelectTrigger>
          <SelectContent>
            {availableGrades.map(grade => (
              <SelectItem key={grade.id} value={grade.id} className="text-base">
                {grade.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Select onValueChange={setSelectedSubject} value={selectedSubject} disabled={!selectedGrade}>
          <SelectTrigger className="w-full h-12 text-base">
            <SelectValue placeholder={t('selectionForm.selectSubject')} />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject.id} value={subject.id} className="text-base">
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Select onValueChange={setSelectedChapter} value={selectedChapter} disabled={!selectedSubject}>
          <SelectTrigger className="w-full h-12 text-base">
            <SelectValue placeholder={t('selectionForm.selectChapter')} />
          </SelectTrigger>
          <SelectContent>
            {chapters.map(chapter => (
              <SelectItem key={chapter.id} value={chapter.id} className="text-base">
                {chapter.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary text-lg text-primary-foreground transition-all duration-300 hover:bg-accent hover:shadow-lg hover:-translate-y-1"
        disabled={!selectedGrade || !selectedSubject || !selectedChapter}
      >
        <BookOpen className="mr-2 h-5 w-5" />
        {t('selectionForm.startButton')}
      </Button>
    </form>
  );
}
