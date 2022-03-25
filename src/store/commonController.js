import { _ } from 'core-js';
import Vue from 'vue';
import { setGlobalVariable } from '../utils/functionUtils.js';
export const state = () => ({
    app: {
        appId: '', //新建应用的ID
        appName: '',
        projectInfo: [], //工程的信息
        tabsDy: [], //动态菜单page信息
        apiAllList: [], //app应用拖拽元件绑定api的列表
        version: '1.0.0', // 版本
        disabledUseAttr: [], // 被遗弃的属性 'tooltip', 'legend'
        id: '',
        applyStatus: true, //true打包状态
        edit: true, // 编辑(true)和预览(false)状态标识
        description: '',
        name: '',
        currentPageHasHeader: false,
        currentPageHasAside: false,
        asideStatus: false,
        creator: '',
        currentDevice: 'Web',
        devicePreviewWidth: {
            Web: 1920,
            Pad: 960,
            Phone: 600,
        },
        copyCol: {},
        activePage: '',
        viewUpdate: '',
        pages: [
            // {
            //   id: 'common',
            //   label: 'Common Page',
            //   ifCopy: '2',
            //   pageId: '',
            //   type: '1',
            // },
        ],
        imageUrlList: [],
        tableRowList: {},
        menuList: [], //各个应用导航地址
        commonComponentList: [],
    },
});
const getters = {
    appId: state => state.app.appId,
    appName: state => state.app.appName,
    apiAllList: state => state.app.apiAllList,
    projectInfo: state => state.app.projectInfo,
    version: state => state.app.version,
    pages: state => state.app.pages,
    currentDevice: state => state.app.currentDevice,
    devicePreviewWidth: state => state.app.devicePreviewWidth,
    activePage: state => state.app.activePage,
    currentKey: state => state.app.currentKey,
    disabledUseAttr: state => state.app.disabledUseAttr,
    currentPageHasHeader: state => state.app.currentPageHasHeader,
    currentPageHasAside: state => state.app.currentPageHasAside,
    asideStatus: state => state.app.asideStatus,
    imageUrlList: state => state.app.imageUrlList,
    tableRowList: state => state.app.tableRowList,
    copyCol: state => state.app.copyCol,
    viewUpdate: state => state.app.viewUpdate,
    menuList: state => state.app.copyCol,
    applyStatus: state => state.app.applyStatus,
    edit: state => state.app.edit,
    commonComponentList: state => state.app.commonComponentList,
    tabsDy: state => state.app.tabsDy,
};
const actions = {};
const mutations = {
    /**
     * Add a new page
     * @param state
     * @param data
     */
    changeTableHeaderParam(state, data) {
        if (data.record.type.includes('Table')) {
            if (data.record.col && data.record.col.tableHeaderList) {
                let list = data.record.col.tableHeaderList.value;
                list.forEach(item => {
                    if (item.showColumn) {
                        item.showColumn = false;
                    }
                });
            }
        }
    },
    saveMenuList(state, data) {
        Vue.set(state.app, 'menuList', data);
    },
    imageListData(state, data) {
        state.app.imageUrlList = data;
    },
    imageListData(state, data) {
        state.app.imageUrlList = data;
    },
    setTabsDy(state, data) {
        state.app.tabsDy.forEach((item, index) => {
            if (item.id == data) {
                state.app.tabsDy.splice(index, 1);
            }
        });
    },
    tableRowFun(state, data) {
        state.app.tableRowList = data;
    },
    changeViewUpdate(state, data) {
        Vue.set(state.app, 'viewUpdate', data);
    },
    changeAppId(state, data) {
        Vue.set(state.app, 'appId', data);
    },
    changeAppName(state, data) {
        Vue.set(state.app, 'appName', data);
    },
    changeProjectInfo(state, data) {
        Vue.set(state.app, 'projectInfo', data);
    },
    addNewPage(state, data) {
        state.app.pages.forEach(item => {
            if (data.ifFromPage == '1') {
                Vue.set(item, 'ifFromPage', '2');
            }
        });
        if (state.app.pages.length === 0) state.app.activePage = data.id;
        state.app.pages.push(data);
    },
    switchPage(state, data) {
        if (data.id) {
            state.app.activePage = data.id;
            let flag = state.app.tabsDy.some(item => {
                if (item.id === data.id) {
                    return true;
                }
            });
            if (!flag) {
                state.app.tabsDy.push(data);
                _.map(state.app.pages, page => {
                    _.map(state.app.tabsDy, tab => {
                        if (page.id == tab.id) {
                            tab.label = page.label;
                        }
                    });
                });
            }
            const router = startup.getGlobalVal('router');
            if (router) {
                router.push(`/views/${data.id}`);
            }
        }
    },
    changePages(state, data) {
        Vue.set(state.app, 'pages', data);
    },
    setVariable(state, data) {
        if (data.key) {
            setGlobalVariable(data.key, data.value);
        }
    },
    deletePage(state, data) {
        state.app.pages.splice(data.index, 1);
        if (data.id == state.app.activePage)
            if (data.index > 0) state.app.activePage = state.app.pages[data.index - 1].id;
            else state.app.activePage = state.app.pages[data.index].id;
    },
    changeAside(state, data) {
        return (state.app.currentPageHasAside = data);
    },
    changeHeader(state, data) {
        return (state.app.currentPageHasHeader = data);
    },
    handleAside(state, data) {
        if (state.app.asideStatus === data) state.app.asideStatus = !data;

        return state.app.asideStatus;
    },
    changeDevice(state, data) {
        switch (data.name) {
            case 'xs':
                return (state.app.currentDevice = 'Phone');
            case 'sm':
                return (state.app.currentDevice = 'Phone');
            case 'md':
                return (state.app.currentDevice = 'Pad');
            case 'lg':
                return (state.app.currentDevice = 'Web');
            case 'xl':
                return (state.app.currentDevice = 'Web');
        }
    },
    editPageName(state, data) {
        state.app.pages.forEach(item => {
            if (data.ifFromPage == '1') {
                Vue.set(item, 'ifFromPage', '2');
            }
            if (item.id === (data.id ? data.id : state.app.activePage)) {
                Vue.set(item, 'label', data.label);
                Vue.set(item, 'ifFromPage', data.ifFromPage);
                Vue.set(item, 'ifCopy', data.ifCopy);
                Vue.set(item, 'pageId', data.pageId);
                Vue.set(item, 'type', data.type);
            }
        });
    },
    changeViewFrame(state, data) {
        state.app.pages.forEach(item => {
            if (item.id == state.app.activePage) Vue.set(item, 'type', String(data));
        });
    },
    // 绑定，解除绑定api，更新api列表
    changeApiAllList(state, data) {
        if (data.status == 'new') state.app.apiAllList.push(data);
        else if (data.status == 'del') {
            if (state.app.apiAllList.length == 0) return;

            state.app.apiAllList.forEach(item => {
                if (item.apiId == data.apiId) {
                    state.app.apiAllList.splice(item, 1);
                    return;
                }
            });
        } else if (data.status == 'updata')
            if (state.app.apiAllList.length == 0) state.app.apiAllList.push(data);
            else {
                state.app.apiAllList.push(data);
                state.app.apiAllList.forEach(item => {
                    if (item.apiId == data.oldapiId) {
                        state.app.apiAllList.splice(item, 1);
                        return;
                    }
                });
            }
    },
    // copy对象
    copyColFun(state, data) {
        state.app.copyCol = data.copyCol;
    },
    changeEditStatus(state, data) {
        console.log(data);
        Vue.set(state.app, 'edit', data);
    },
    // 赋值
    commonComponentListFun(state, data) {
        state.app.commonComponentList = data;
    },
    // 添加commonComponentList
    setCommonComponentList(state, data) {
        console.log(data);
        let flag = state.app.commonComponentList.some(item => {
            if (item.key === data.key) {
                return true;
            }
        });
        if (!flag) {
            state.app.commonComponentList.push(data);
        }
        console.log(state.app.commonComponentList);
    },
    // 删除commonComponentList
    deleteCommonComponentList(state, data) {
        state.app.commonComponentList.forEach((item, index) => {
            if (item.key == data.key) {
                state.app.commonComponentList.splice(index, 1);
            }
        });
        console.log(state.app.commonComponentList);
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
