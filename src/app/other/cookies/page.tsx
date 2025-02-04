'use client';

import { useTranslationContext } from '@/providers/TranslationProvider';
import UnderConstruction from '@/components/UnderConstruction/UnderConstruction';

export default function CookiesPage() {
  const { t } = useTranslationContext();
  return <UnderConstruction title={t('other.cookies.title')} />;
}
