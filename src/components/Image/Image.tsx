import Image from 'next/image';
import { useState } from 'react';

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
  const cdnUrl = 'https://spotify-api-0gmj.onrender.com';

  const imageUrl = src.startsWith('http') ? src : `${cdnUrl}${src}`;

  return (
    <div className={`relative ${className}`}>
      {!error ? (
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover ${className}`}
          onError={() => setError(true)}
          priority={priority}
        />
      ) : (
        <div
          className={`bg-gray-200 flex items-center justify-center ${className}`}
          style={{ width, height }}
        >
          <span className="text-gray-400">Image non disponible</span>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
