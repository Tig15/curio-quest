import enTranslations from './en.json'; // Import the translation file

export const translate = (key: any) => {
  return enTranslations[key] || key;
};
