import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './plugins/i18n';
import vuetify from './plugins/vuetify';
import { ssrWindow, extend } from 'ssr-window';
import _ from 'lodash';
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

Vue.prototype.findComponents = function findComponents(componentName, rootContext) {
    let context = rootContext || this;
    if (!rootContext && this === window) {
        context = ssrWindow.appVue.$root;
    }
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponents(componentName, child);
        return components.concat(foundChilds);
    }, []);
};

Vue.prototype.findComponentsByRef = function findComponentsByRef(ref) {
    let _this = this;
    let currentPageAllComponent = _this
        .findComponents('SchemaFormItem')
        .concat(_this.findComponents('VeChartItem'))
        .concat(_this.findComponents('CustomItem'));
    return _.filter(currentPageAllComponent, function (component) {
        return component.$vnode.data.ref === ref;
    });
};

const appVue = new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App),
}).$mount('#app');

extend(ssrWindow, {
    appVue: appVue,
});
