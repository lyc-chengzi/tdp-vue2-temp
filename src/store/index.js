import Vue from 'vue'
import Vuex from 'vuex'
import commonController from "./commonController";
import dataController from "./dataController";
import appSettingsController from "./appSettingsController";
Vue.use(Vuex)
export default new Vuex.Store({
  // strict: false,
  modules: {
    commonController,
    dataController,
    appSettingsController
  }
});
