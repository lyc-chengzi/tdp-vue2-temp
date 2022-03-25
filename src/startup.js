import dataController from './store/dataController';
// 1.初始化vuex数据
const startup = {
    startupApp: function (app) {
        app.$store.commit('commonController/addNewPage', {
            id: 'Page-U5QM7N16481121406450824',
            label: 'Page1',
            ifCopy: '2',
            ifFromPage: '2',
            pageId: '',
            type: '1',
        });
        app.$store.commit('commonController/switchPage', {
            id: 'Page-U5QM7N16481121406450824',
        });
        app.$store.registerModule('Page-U5QM7N16481121406450824', dataController);
    },
};
export default startup;
