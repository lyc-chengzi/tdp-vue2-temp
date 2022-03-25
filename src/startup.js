import dataController from './store/dataController';
// 1.初始化vuex数据
const startup = {
    startupApp: function (app) {
        const pageList = [
            {
                id: 'Page-U5QM7N16481121406450824',
                label: 'Page1',
                ifCopy: '2',
                ifFromPage: '2',
                pageId: '',
                type: '1',
            },
            {
                id: 'Page-Igz6eu16481756305570751',
                label: 'Page2',
                ifFromPage: '2',
                ifCopy: '2',
                pageId: '',
                type: '1',
            },
        ];
        pageList.forEach(page => {
            app.$store.commit('commonController/addNewPage', page);
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
