'use client';

import { useTranslationContext } from '@/providers/TranslationProvider';
import UnderConstruction from '@/components/UnderConstruction/UnderConstruction';

export default function PlaylistPage() {
  const { t } = useTranslationContext();
  return <UnderConstruction title={t('sidebar.playlists.title')} />;
}
