'use client';

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.mainContent}>{children}</div>
        </main>
      </div>
      {/* TODO: Add player */}
      {/* <div className={styles.playerPlaceholder} /> */}
    </div>
  );
}
