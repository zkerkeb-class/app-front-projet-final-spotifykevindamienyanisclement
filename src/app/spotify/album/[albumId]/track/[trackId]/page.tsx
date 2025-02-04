// 'use client';

import UnderConstruction from '@/components/UnderConstruction/UnderConstruction';

// import { useParams } from 'next/navigation';
// import { useTranslationContext } from '@/providers/TranslationProvider';
// import MainLayout from '@/components/Layout/MainLayout';
// import Image from 'next/image';
// import { usePlayerControls } from '@/hooks/ui/usePlayer';
// import { useState } from 'react';
// import { useTrackById } from '@/hooks/api/useTracks';
// import { normalizeImageUrl } from '@/utils/tools';
// import { useTheme } from '@/hooks/settings/useTheme';
// import styles from './page.module.scss';

// export default function TrackPage() {
//   const { t } = useTranslationContext();
//   const { theme } = useTheme();
//   const { trackId, albumId } = useParams();
//   const { isPlaying, play, pause, loadTrackFull } = usePlayerControls();
//   const [imageError, setImageError] = useState(false);

//   const { track, loading, error } = useTrackById(Number(trackId));

//   const handlePlay = () => {
//     if (track) {
//       loadTrackFull(track);
//       play();
//     }
//   };

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className={styles.loading}>{t('common.loading')}</div>
//       </MainLayout>
//     );
//   }

//   if (error || !track) {
//     return (
//       <MainLayout>
//         <div className={styles.error}>{t('common.error')}</div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className={styles.container}>
//         <div className={styles.header}>
//           <Image
//             src={normalizeImageUrl(track.album?.image?.formattedImageURL)}
//             alt={`${track.title} - ${track.album?.title}`}
//             width={232}
//             height={232}
//             className={styles.cover}
//             onError={() => setImageError(true)}
//           />
//           <div className={styles.info}>
//             <span className={styles.type}>{t('track.title')}</span>
//             <h1 className={styles.title}>{track.title}</h1>
//             <div className={styles.meta}>
//               <Image
//                 src={normalizeImageUrl(track.artist?.image?.formattedImageURL)}
//                 alt={track.artist?.name || ''}
//                 width={28}
//                 height={28}
//                 className={styles.artistImage}
//               />
//               <span className={styles.artist}>{track.artist?.name}</span>
//               <span className={styles.dot}>•</span>
//               <span className={styles.album}>{track.album?.title}</span>
//             </div>
//           </div>
//         </div>

//         <div className={styles.content}>
//           <div className={styles.controls}>
//             <button
//               type="button"
//               className={styles.playButton}
//               onClick={isPlaying ? pause : handlePlay}
//               aria-label={isPlaying ? t('player.pause') : t('player.play')}
//             >
//               <Image
//                 src={`/assets/icons/${isPlaying ? 'pause' : 'play'}${
//                   theme === 'dark' ? '-white' : ''
//                 }.svg`}
//                 alt={isPlaying ? 'Pause' : 'Play'}
//                 width={24}
//                 height={24}
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

export default function TrackPage() {
  return <UnderConstruction />;
}
