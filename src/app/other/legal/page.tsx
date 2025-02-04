'use client';

import { useTranslationContext } from '@/providers/TranslationProvider';
import UnderConstruction from '@/components/UnderConstruction/UnderConstruction';

export default function LegalPage() {
  const { t } = useTranslationContext();
  return <UnderConstruction title={t('other.legal.title')} />;
}
