import { useTranslationContext } from '@/providers/TranslationProvider';

export const useDirection = () => {
  const { dir } = useTranslationContext();

  const getFlexDirection = (defaultDirection: 'row' | 'column' = 'row') => {
    if (defaultDirection === 'row') {
      return dir === 'rtl' ? 'row-reverse' : 'row';
    }
    return defaultDirection;
  };

  const getMarginDirection = (margin: number, side: 'start' | 'end') => {
    let direction: 'left' | 'right';

    if (dir === 'rtl') {
      direction = side === 'start' ? 'right' : 'left';
    } else {
      direction = side === 'start' ? 'left' : 'right';
    }

    return { [`margin-${direction}`]: `${margin}px` };
  };

  return {
    dir,
    isRTL: dir === 'rtl',
    getFlexDirection,
    getMarginDirection,
  };
};
