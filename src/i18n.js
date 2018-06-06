import { addLocaleData } from 'react-intl';

import enLocale from 'react-intl/locale-data/en';
import frLocale from 'react-intl/locale-data/fr';

import enTranslationMessages from './i18n/en.json';
import frTranslationMessages from './i18n/fr.json';


addLocaleData(enLocale);
addLocaleData(frLocale);


const DEFAULT_LOCALE = 'fr';
export const formatTranslationMessages = (locale, messages) => {
    const defaultFormattedMessages = locale !== DEFAULT_LOCALE ?
            formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) :
            {};
    const formattedMessages = {};
    const messageKeys = Object.keys(messages);

    messageKeys.forEach((messageKey) => {
        if (window && window.location && window.location.href.indexOf('debug=none') > -1) {
            formattedMessages[messageKey] = messageKey;
        } else if (locale === DEFAULT_LOCALE) {
            formattedMessages[messageKey] = messages[messageKey];
        } else {
            formattedMessages[messageKey] = messages[messageKey] || defaultFormattedMessages[messageKey];
        }
    });

    return formattedMessages;
};

export const translationMessages = {
    en: formatTranslationMessages('en', enTranslationMessages),
    fr: formatTranslationMessages('fr', frTranslationMessages),
};

export const translator = id => intl => intl.formatMessage({ id, defaultMessage: id });
