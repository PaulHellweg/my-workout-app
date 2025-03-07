import 'react-i18next';
import enTranslation from './locales/en/translation.json';

type DefaultResources = typeof enTranslation;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: DefaultResources;
    };
  }
}
