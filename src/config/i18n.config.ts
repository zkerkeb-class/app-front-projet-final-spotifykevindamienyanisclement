export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

export const getDirection = (locale: string): 'ltr' | 'rtl' => {
  return RTL_LANGUAGES.includes(locale) ? 'rtl' : 'ltr';
};
