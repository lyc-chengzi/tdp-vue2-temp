import Vue from 'vue';
import SearchForm from '@smartplatform/ui-components/src/index';
import VeCharts from '@smartplatform/ui-components/src/ve-chart/index';
import FunctionalComponent from '@smartplatform/ui-components/src/functional/index';
import axios from 'axios';
import qs from 'qs';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import ref from 'vue-ref';
import _ from 'lodash';
import { AppManager } from './global';
import draggable from 'vuedraggable';

Vue.component('draggable', draggable);

// import Custom from '@smartplatform/ui-components/src/custom/index';
Vue.use(ref);
Vue.use(VXETable);
VXETable.setup({
    keepSource: true,
    table: {
        autoResize: true,
    },
});

Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.prototype.$XModal = VXETable.modal;
Vue.use(SearchForm);
Vue.use(VeCharts);
Vue.use(FunctionalComponent);
Vue.component('SchemaFormItem', SearchForm.SchemaFormItem);
Vue.component('VeChartItem', VeCharts.VeChartItem);
Vue.component('FunctionalItem', FunctionalComponent.FunctionalItem);

function findComponents(componentName, rootContext) {
    let context = rootContext || this;
    const app = AppManager.getApp().getGlobalVal('app');
    if (!rootContext && app) {
        context = app;
    }
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponents(componentName, child);
        return components.concat(foundChilds);
    }, []);
}

Vue.prototype.findComponents = findComponents;

function findComponentsByRef(ref) {
    let _this = this;
    let currentPageAllComponent = _this
        .findComponents('SchemaFormItem')
        .concat(_this.findComponents('VeChartItem'))
        .concat(_this.findComponents('CustomItem'));
    return _.filter(currentPageAllComponent, function (component) {
        return component.$vnode.data.ref === ref;
    });
}

Vue.prototype.findComponentsByRef = findComponentsByRef;

function findParentPage(vueInstance) {
    if (vueInstance.$el && vueInstance.$el.className.indexOf('tdp-page') > -1) {
        return vueInstance;
    } else {
        return Vue.prototype.findParentPage(vueInstance.$parent);
    }
}
Vue.prototype.findParentPage = findParentPage;
