'use client';

import useTranslation from '@/hooks/useTranslation';

export default function Home() {
  const { t, locale, changeLanguage } = useTranslation();

  return (
    <div>
      <h1>{t('common.welcome')}</h1>

      <select value={locale} onChange={e => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
        <option value="pt">Português</option>
      </select>

      <nav>
        <ul>
          <li>{t('common.home')}</li>
          <li>{t('common.search')}</li>
          <li>{t('common.library')}</li>
        </ul>
      </nav>
    </div>
  );
}
