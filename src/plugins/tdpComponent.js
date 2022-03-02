import Vue from 'vue';
import SearchForm from '@smartplatform/ui-components/src/index';
import VeCharts from '@smartplatform/ui-components/src/ve-chart/index';
import axios from 'axios';
import qs from 'qs';
// import Custom from '@smartplatform/ui-components/src/custom/index';

Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.use(SearchForm);
Vue.use(VeCharts);
// Vue.use(Custom);
