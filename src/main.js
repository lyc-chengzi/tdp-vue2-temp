import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './plugins/i18n';
import vuetify from './plugins/vuetify';
import { AppManager } from './plugins/global';
import './plugins/bootstrap-vue';
import './plugins/globalFunctions';
import './plugins/elementUI';
import './plugins/tdpComponent';

import './assets/styles/main.less';
import './assets/font/iconfont.css';
import './assets/font.css';
import './assets/form-design.css';
import './assets/iconfont/icon.css';
import './assets/iconfont/iconfont.js';

Vue.config.productionTip = false;
Vue.prototype.AppManager = AppManager;

const appManager = AppManager.getApp();

const appVue = new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App),
});

appManager.registerGlobalVal({
    app: appVue,
    router,
});

appVue.$mount('#app');
