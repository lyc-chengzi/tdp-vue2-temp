import Vue from 'vue';
import SearchForm from '@smartplatform/ui-components/src/index';
import VeCharts from '@smartplatform/ui-components/src/ve-chart/index';
import axios from 'axios';
import qs from 'qs';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';

// import Custom from '@smartplatform/ui-components/src/custom/index';

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
Vue.component('SchemaFormItem', SearchForm.SchemaFormItem);
Vue.component('VeChartItem', VeCharts.VeChartItem);
console.log('SearchForm', Vue.options);
