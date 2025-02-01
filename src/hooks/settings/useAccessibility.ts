import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccessibilityState {
  highContrast: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  voiceMessages: boolean;
  toggleHighContrast: () => void;
  toggleScreenReader: () => void;
  toggleKeyboardNavigation: () => void;
  toggleVoiceMessages: () => void;
}

export const useAccessibility = create<AccessibilityState>()(
  persist(
    set => ({
      highContrast: false,
      screenReader: false,
      keyboardNavigation: true,
      voiceMessages: false,
      toggleHighContrast: () =>
        set(state => {
          const newValue = !state.highContrast;
          document.documentElement.setAttribute(
            'data-high-contrast',
            newValue.toString()
          );
          return { highContrast: newValue };
        }),
      toggleScreenReader: () =>
        set(state => {
          const newValue = !state.screenReader;
          document.documentElement.setAttribute(
            'data-screen-reader',
            newValue.toString()
          );
          return { screenReader: newValue };
        }),
      toggleKeyboardNavigation: () =>
        set(state => {
          const newValue = !state.keyboardNavigation;
          document.documentElement.setAttribute(
            'data-keyboard-nav',
            newValue.toString()
          );
          return { keyboardNavigation: newValue };
        }),
      toggleVoiceMessages: () =>
        set(state => {
          const newValue = !state.voiceMessages;
          return { voiceMessages: newValue };
        }),
    }),
    {
      name: 'accessibility-storage',
    }
  )
);
