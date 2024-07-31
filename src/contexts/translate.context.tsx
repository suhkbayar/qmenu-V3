export const cacheProvider = {
  get: (language, key) => {
    try {
      const translations = JSON.parse(localStorage.getItem('translations') || '{}');
      return translations[key]?.[language] || null;
    } catch (error) {
      return null;
    }
  },
  set: (language, key, value) => {
    try {
      const translations = JSON.parse(localStorage.getItem('translations') || '{}');
      const existing = translations[key] || {};
      existing[language] = value;
      translations[key] = existing;
      localStorage.setItem('translations', JSON.stringify(translations));
    } catch (error) {
      // Handle error if needed
    }
  },
};
