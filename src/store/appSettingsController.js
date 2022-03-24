import Vue from 'vue';

export const state = () => ({
  appSettings:{
    // currentLanguage:'zh_CN',
    languageCollection: [],
    appLanguages: [
    ],
    appDefaultLanguage: {},
    appSettingCode:'authenticationSettings',//应用设置页面
    appAuthBasic:''//应用认证的信息
  }
});

const getters = {
  appSettings: state => state.appSettings,
  currentLanguage: state => state.appSettings.currentLanguage,
  languageCollection: state => state.appSettings.languageCollection,
  appLanguages: state => state.appSettings.appLanguages,
  appDefaultLanguage: state => state.appSettings.appDefaultLanguage,
  appSettingCode: state => state.appSettings.appSettingCode,
  appAuthBasic: state => state.appSettings.appAuthBasic
};

const actions = {

};

const mutations = {
  changeAppAuthBasic(state,data){
    Vue.set(state.appSettings, 'appAuthBasic', data);
  },
  changeAppSettingCode(state,data) {
    Vue.set(state.appSettings, 'appSettingCode', data);
  },
  changeCurrentLanguage(state, data) {
    Vue.set(state.appSettings, 'currentLanguage', data);
  },
  addLanguageCollection(state, data) {
    state.appSettings.languageCollection.push(data);
  },
  addAppLanguages(state, data) {
    state.appSettings.appLanguages.push(data);
  },
  delAppLanguages(state, data) {
    state.appSettings.appLanguages.forEach((item, index) => {
      if (item.code == data.code) {
        state.appSettings.appLanguages.splice(index, 1);
      }
    });
  },
  changeAppDefaultLanguage(state, data) {
    this.$i18n.defaultLocale = _.get(data,'code');
    Vue.set(state.appSettings, 'appDefaultLanguage', data);
  },
  changeAppSettings(state,data) {
    state.appSettings = data;
  },
};

export  default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
