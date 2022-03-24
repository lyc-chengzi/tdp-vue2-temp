/**
 * The file is for smart platform ui-designer internationalization.
 */
let op = require('object-path');
/**
 * Handle Component Attribute Initialization
 * @param key  The unique language key of the component
 * @param value component attribute value
 * @param I18n $i18n
 * @param locale  Language to be set (en,cn,....)
 */
export const handleComponentLocale = function (key, value, I18n, locale) {
    let currentLocale = locale || I18n.locale || window.localStorage.getItem('LANGUAGE_STATUS');
    let localeCodes = I18n.localeCodes;
    let defaultLocaleCode = 'zh';
    let zhLanguages = I18n.getLocaleMessage(defaultLocaleCode);
    localeCodes.forEach(localeCode => {
        if (localeCode === currentLocale) {
            let currentLanguage = I18n.getLocaleMessage(currentLocale);
            op.set(currentLanguage, key, value);
            I18n.setLocaleMessage(currentLocale, currentLanguage);
        } else if (localeCode === defaultLocaleCode && !op.get(zhLanguages, key)) {
            op.set(zhLanguages, key, '');
            I18n.setLocaleMessage(defaultLocaleCode, zhLanguages);
        }
        // else {
        //   // let otherLanguage = I18n.getLocaleMessage(localeCode);
        //   // let otherValue = op.empty(otherLanguage,key);
        //   // if(otherValue === undefined){
        //   //   op.set(otherLanguage,key,'');
        //   //   I18n.setLocaleMessage(localeCode,otherLanguage);
        //   }
        // }
    });
};
/**
 * The function will get current app language to object.
 * @param I18n
 * @returns {*[]}
 */
export const generateAllLocale = function (I18n) {
    console.log(I18n);
    let localeCodes = I18n.localeCodes;
    let appLocaleResource = [];
    localeCodes.forEach(localeCode => {
        // console.log(localeCode, 'localeCode');
        // console.log(I18n.getLocaleMessage(localeCode));
        let currentLanguageLocale = I18n.getLocaleMessage(localeCode)['app'];
        if (currentLanguageLocale) {
            let language = {};
            language.name = localeCode;
            language.app = I18n.getLocaleMessage(localeCode)['app'];
            appLocaleResource.push(language);
        }
    });
    console.log(appLocaleResource);
    return appLocaleResource;
};
/**
 * Flatten language values
 * @param appLocaleResource
 * @param I18n $i18n Object
 */
export const flattenAppLocales = function (appLocaleResource, I18n) {
    appLocaleResource.forEach(localeResource => {
        let localeMessage = I18n.getLocaleMessage(localeResource.name);
        if (localeMessage.app) {
            _.merge(localeMessage.app, localeResource.app);
        } else {
            localeMessage.app = localeResource.app;
        }
        I18n.setLocaleMessage(localeResource.name, localeMessage);
    });
};
export const handleComponentType = function (component) {};
/**
 *
 */
export const setAttributeLanguageValue = function (compType, locale) {
    console.log(compType, locale);
};
/**
 * Delete language value by component id
 * @param type
 */
export const delAttributeLanguageByCompId = function (id, I18n) {
    let localeCodes = I18n.localeCodes;
    localeCodes.forEach(localeCode => {
        let currentLanguageLocale = I18n.getLocaleMessage(localeCode);
        I18n.setLocaleMessage(localeCode, _.omit(currentLanguageLocale, id));
    });
};
