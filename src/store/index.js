import Vue from 'vue';
import Vuex from 'vuex';
import commonController from './commonController';
import appSettingsController from './appSettingsController';
Vue.use(Vuex);
export default new Vuex.Store({
    strict: false,
    modules: {
        commonController,
        appSettingsController,
    },
});

// export default store;
