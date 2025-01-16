'use client';

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import styles from './MainLayout.module.scss';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {/* <Player /> */}
    </div>
  );
}
