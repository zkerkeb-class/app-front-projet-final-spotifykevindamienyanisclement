'use client';

import { useTranslationContext } from '@/providers/TranslationProvider';
import UnderConstruction from '@/components/UnderConstruction/UnderConstruction';

export default function PrivacyPolicyPage() {
  const { t } = useTranslationContext();
  return <UnderConstruction title={t('other.privacyPolicy.title')} />;
}
