import React, { createContext, useContext, ReactNode } from 'react';
import { Translator as OriginalTranslator } from 'react-auto-translate';
import { cacheProvider } from '../contexts/translate.context';

interface TranslateProviderProps {
  children: ReactNode;
  googleApiKey: string;
  defaultLanguage: string;
  language: string;
}

interface TranslateContextProps {
  translate: (text: string) => Promise<string>;
}

const TranslateContext = createContext<TranslateContextProps | undefined>(undefined);

export const TranslateProvider: React.FC<TranslateProviderProps> = ({
  children,
  googleApiKey,
  defaultLanguage,
  language,
}) => {
  const translate = async (text: string): Promise<string> => {
    if (!text.trim()) {
      return text;
    }

    const cachedTranslation = cacheProvider.get(language, text);
    if (cachedTranslation) {
      console.log('Using cached translation:', cachedTranslation);
      return cachedTranslation;
    }
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}&q=${encodeURIComponent(
          text,
        )}&target=${language}&source=${defaultLanguage}&format=text`,
      );

      if (!response.ok) {
        console.error('API request failed with status:', response.status, response.statusText);
        return text; // Return the original text if API request fails
      }

      const data = await response.json();
      console.log('API response data:', data);

      if (data.data?.translations[0]?.translatedText) {
        const translatedText = data.data.translations[0].translatedText;
        if (translatedText.trim()) {
          console.log('Caching and returning translated text:', translatedText);
          cacheProvider.set(language, text, translatedText);
          return translatedText;
        }
      }
    } catch (error) {
      console.error('Error fetching translation:', error);
    }

    console.log('Returning original text due to translation failure or empty translation');
    return text; // Return the original text if translation fails or is empty
  };

  return (
    <TranslateContext.Provider value={{ translate }}>
      <OriginalTranslator
        from={defaultLanguage}
        to={language}
        googleApiKey={googleApiKey}
        cacheProvider={cacheProvider}
      >
        {children}
      </OriginalTranslator>
    </TranslateContext.Provider>
  );
};

export const useTranslate = (): TranslateContextProps => {
  const context = useContext(TranslateContext);
  if (context === undefined) {
    throw new Error('useTranslate must be used within a TranslateProvider');
  }
  return context;
};
