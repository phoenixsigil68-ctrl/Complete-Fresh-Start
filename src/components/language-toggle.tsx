'use client';

import { useLanguage } from '@/context/language-context';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = (checked: boolean) => {
    setLanguage(checked ? 'en' : 'gu');
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="language-toggle" className={language === 'gu' ? 'text-primary' : 'text-muted-foreground'}>
        GU
      </Label>
      <Switch
        id="language-toggle"
        checked={language === 'en'}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="language-toggle" className={language === 'en' ? 'text-primary' : 'text-muted-foreground'}>
        EN
      </Label>
    </div>
  );
}
