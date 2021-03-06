import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import en from './languages/en';
import ru from './languages/ru';
// import {I18nManager} from 'react-native';

export const getLocaleToI18n = () => {
  // I18nManager.forceRTL(true);
  // I18nManager.allowRTL(true);
  // console.warn('I18nManager.isRTL', I18nManager.isRTL);
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales)) {
    const codISO3166 = locales[0].languageTag.slice(0, 2);
    if (
      codISO3166 === 'ru' ||
      codISO3166 === 'uk' ||
      codISO3166 === 'by' ||
      codISO3166 === 'md' ||
      codISO3166 === 'kz' ||
      codISO3166 === 'am' ||
      codISO3166 === 'az' ||
      codISO3166 === 'kg' ||
      codISO3166 === 'tj' ||
      codISO3166 === 'uz' ||
      codISO3166 === 'tm'
    ) {
      // console.log('RU ', locales[0].languageTag);
      // I18n.locale = 'ru';
      return 'ru';
    } else {
      // console.log('NOT RU ', locales[0].languageTag);
      // I18n.locale = locales[0].languageTag;
      return 'en';
    }
    // }
  }
};

export const getCountry = () => {
  const countryName = RNLocalize.getCountry();
  // console.log('countryName.toLowerCase()', countryName.toLowerCase());
  return countryName.toLowerCase();
};

I18n.fallbacks = true;
I18n.translations = {
  en,
  ru,
};

export default I18n;