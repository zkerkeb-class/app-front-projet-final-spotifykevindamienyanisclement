'use client';

import { useTranslationContext } from '@/providers/TranslationProvider';
import UnderConstruction from '@/components/UnderConstruction/UnderConstruction';

export default function PodcastPage() {
  const { t } = useTranslationContext();
  return <UnderConstruction title={t('sidebar.podcasts.title')} />;
}
