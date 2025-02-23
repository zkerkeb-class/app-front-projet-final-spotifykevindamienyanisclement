import NextImage from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslationContext } from '@/providers/TranslationProvider';
import { useTheme } from '@/hooks/settings/useTheme';
import logger from '@/utils/logger';
import styles from './Image.module.scss';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const ImageComponent = ({
  src,
  alt,
  width = 300,
  height = 300,
  className = '',
  priority = false,
}: ImageProps) => {
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(src);
  const { theme } = useTheme();
  const { t } = useTranslationContext();
  const cdnUrl = 'https://spotify-api-0gmj.onrender.com';

  useEffect(() => {
    const checkImageSupport = async () => {
      const baseUrl = src.startsWith('http') ? src : `${cdnUrl}${src}`;
      const imageUrl = new URL(baseUrl);
      const extension = imageUrl.pathname.split('.').pop()?.toLowerCase();

      // Vérifier le support AVIF
      if (extension !== 'avif') {
        try {
          const avifUrl = baseUrl.replace(`.${extension}`, '.avif');
          const avifResponse = await fetch(avifUrl, { method: 'HEAD' });
          if (avifResponse.ok) {
            setImageSrc(avifUrl);
            return;
          }
        } catch (e) {
          logger.warn('AVIF not supported or not available');
        }
      }

      // Vérifier le support WebP
      if (extension !== 'webp') {
        try {
          const webpUrl = baseUrl.replace(`.${extension}`, '.webp');
          const webpResponse = await fetch(webpUrl, { method: 'HEAD' });
          if (webpResponse.ok) {
            setImageSrc(webpUrl);
            return;
          }
        } catch (e) {
          logger.warn('WebP not supported or not available');
        }
      }

      if (extension === 'jpg') {
        setImageSrc(baseUrl);
      }

      // Fallback vers l'image originale
      setImageSrc(baseUrl);
    };

    checkImageSupport();
  }, [src, cdnUrl]);

  return (
    <div className={`${styles.imageContainer} ${className}`}>
      {!error ? (
        <NextImage
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={styles.image}
          onError={() => setError(true)}
          priority={priority}
        />
      ) : (
        <div className={styles.fallback} style={{ width, height }}>
          <span>{t('common.image.unavailable')}</span>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
