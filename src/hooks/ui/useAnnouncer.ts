import { useCallback, useRef } from 'react';
import { useAccessibility } from '@/hooks/settings/useAccessibility';

export const useAnnouncer = () => {
  const { voiceMessages } = useAccessibility();
  const synth = useRef(
    typeof window !== 'undefined' ? window.speechSynthesis : null
  );
  const voices = useRef<SpeechSynthesisVoice[]>([]);

  const getVoices = useCallback(() => {
    if (!synth.current) return;
    voices.current = synth.current.getVoices();
  }, []);

  if (typeof window !== 'undefined') {
    speechSynthesis.onvoiceschanged = getVoices;
  }

  const announce = useCallback(
    (message: string) => {
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.classList.add('sr-only');
      document.body.appendChild(announcer);

      setTimeout(() => {
        announcer.textContent = message;
        setTimeout(() => {
          document.body.removeChild(announcer);
        }, 1000);
      }, 100);

      if (voiceMessages && synth.current) {
        const utterance = new SpeechSynthesisUtterance(message);

        const lang = document.documentElement.lang || 'fr-FR';
        const voice = voices.current.find(v =>
          v.lang.startsWith(lang.split('-')[0])
        );
        if (voice) {
          utterance.voice = voice;
        }

        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        synth.current.cancel();
        synth.current.speak(utterance);
      }
    },
    [voiceMessages]
  );

  return { announce };
};
