import dataController from './store/dataController';
import pageJson from './startup.json';
// 1.初始化vuex数据
const startup = {
    startupApp: function (app) {
        pageJson.forEach(page => {
            app.$store.commit('commonController/addNewPage', page.commonPage);
            app.$store.registerModule(page.id, dataController);
        });
    },
    registerGlobalVal(ops) {
        if (window.tdp_cli_generator) {
            window.tdp_cli_generator = {
                ...window.tdp_cli_generator,
                ...ops,
            };
        } else {
            window.tdp_cli_generator = ops;
        }
    },
    getGlobalVal(key) {
        const global = window.tdp_cli_generator;
        if (global && Object.prototype.hasOwnProperty.call(global, key)) {
            return global[key];
        } else {
            return undefined;
        }
    },
};
export default startup;
