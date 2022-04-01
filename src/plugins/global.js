import dataController from '../store/dataController';
import pageJson from '../startup.json';

export class AppManager {
    static getApp() {
        if (window.$tdp_cli_app) {
            return window.$tdp_cli_app;
        } else {
            window.$tdp_cli_app = new AppManager();
            return window.$tdp_cli_app;
        }
    }
    constructor() {
        this.pageJson = pageJson;
        this.dataController = dataController;
        this.globalVal = {};
    }
    startupApp(app) {
        this.pageJson.forEach(page => {
            app.$store.commit('commonController/addNewPage', page.commonPage);
            app.$store.registerModule(page.id, this.dataController);
        });
    }
    registerGlobalVal(ops) {
        this.globalVal = {
            ...this.globalVal,
            ...ops,
        };
        return this.globalVal;
    }
    getGlobalVal(key) {
        const global = this.globalVal;
        if (global && Object.prototype.hasOwnProperty.call(global, key)) {
            return global[key];
        } else {
            return undefined;
        }
    }
}
