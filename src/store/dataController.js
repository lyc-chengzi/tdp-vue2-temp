import Vue from 'vue';
import { componentTypeApiData } from '../utils/apiDataUtils';
import { getGlobalVariableByKey, setGlobalVariable } from '../utils/functionUtils';
import { extApiData, dealGlobalVariable } from '../utils/apiDataExtUtils';
import { Message } from 'element-ui';
import Axios from 'axios';
import startup from '../startup';
export const state = () => ({
    componentAttr: [],
    refData: [],
    currentIndex: 0,
    stepData: [],
    selectItem: {},
    duanObj: {
        type: 'Web',
        maxWidth: 1920,
        stdWidth: 1920,
    },
    smartData: {
        currentType: {
            id: '',
            type: '',
            events: [],
            currentRecord: {},
            attrs: [],
            apiBasic: {},
            apiData: [],
        },
        list: [],
    },
    headerData: {
        list: [],
    },
    asideData: {
        list: [],
    },
    layoutObj: {
        type: 1,
        layoutData: [
            {
                type: 1,
                container: {
                    main: {},
                },
            },
            {
                type: 2,
                container: {
                    header: {
                        height: 60,
                        background: '#8F9EAB',
                    },
                    main: {},
                },
            },
            {
                type: 3,
                container: {
                    aside: {
                        width: 100,
                        background: '#A3B4C5',
                    },
                    main: {},
                },
            },
            {
                type: 4,
                container: {
                    header: {
                        height: 60,
                        background: '#8F9EAB',
                    },
                    aside: {
                        width: 100,
                        background: '#A3B4C5',
                    },
                    main: {},
                },
            },
        ],
    },
    scriptData: {
        scriptFiles: [],
        scriptContents: [],
    },
    interactiveData: {},
});
const getters = {
    headerData: state => state.headerData,
    asideData: state => state.asideData,
    smartData: state => state.smartData,
    // apiBindInfo: state => state.apiBindInfo,
    events: state => state.smartData.currentType.events,
    currentType: state => state.smartData.currentType,
    list: state => state.smartData.list,
    currentRecord: state => state.smartData.currentType.currentRecord,
    layoutObj: state => state.layoutObj,
    duanMaxWidth: state => state.duanObj.maxWidth,
    stdWidth: state => state.duanObj.stdWidth,
    duanType: state => state.duanObj.type,
    refData: state => state.refData,
    stepData: state => state.stepData,
    selectItem: state => state.selectItem,
    scriptData: state => state.scriptData,
    interactiveData: state => state.interactiveData,
};
const actions = {
    apiHandler({ dispatch }, data) {
        if (!data.apiBasic.apiMethod) return;
        if (data.apiBasic.apiMethod == 'GET') {
            dispatch('getRequestHandler', data);
            return;
        } else {
            dispatch('postRequestHandler', data);
        }
    },
    postRequestHandler({ dispatch, commit, state }, dataInfo) {
        let _this = this;
        var url = `${dataInfo.apiBasic.apiuri}`;
        let { apiResParams, apiHeaderParams } = {};
        let langlocale = '';
        let { reqInfo, headertype } = '';
        if (!dataInfo.apiBasic.isI18n) {
            langlocale = '';
        } else {
            langlocale = this.$router.app._i18n.locale;
        }
        if (dataInfo.apiBasic.contentType == 'x-www-form-urlencoded') {
            if (dataInfo.apiBasic.apiCont.reqBodyForm.length > 0) {
                apiResParams = getReqFromData(dataInfo, _this);
            }
            headertype = 'application/x-www-form-urlencoded';
        } else if (dataInfo.apiBasic.contentType == 'form-data') {
            apiResParams = getReqFromData(dataInfo, _this, 'POST');
            headertype = 'multipart/form-data';
        } else {
            if (dataInfo.apiBasic.apiCont.reqBodyParameter.length > 0) {
                apiResParams = getResParams(dataInfo, _this, 'POST', 'reqBodyParameter');
            } else {
                apiResParams = {};
            }
            headertype = 'application/json';
        }

        if (!!dataInfo.apiBasic.apiCont.reqQuery && dataInfo.apiBasic.apiCont.reqQuery.length > 0) {
            let R = getReqQuery(dataInfo, _this);
            reqInfo = R.substr(1);
        }
        if (
            !!dataInfo.apiBasic.apiCont.reqHeaders &&
            dataInfo.apiBasic.apiCont.reqHeaders.length > 0
        ) {
            apiHeaderParams = getResParams(dataInfo, _this, 'POST', 'reqHeaders');
            apiHeaderParams['Content-Type'] = headertype;
            apiHeaderParams['locale'] = langlocale;
        }
        console.log('head参数111', apiHeaderParams);
        url = getUrlAddress(reqInfo, dataInfo.apiBasic, _this);
        let methods = dataInfo.apiBasic.apiMethod.toLocaleLowerCase();
        let param = {};
        if (methods == 'delete') {
            param = {
                data: apiResParams,
            };
        } else {
            param = apiResParams;
        }
        Axios[methods](`${url}`, param, {
            headers: apiHeaderParams,
        })
            .then(res => {
                let data = {
                    info: dataInfo,
                    resData: res,
                };
                if (dataInfo.apiBasic.apiCont.successCode) {
                    callbackCode(dataInfo.apiBasic.apiCont.successCode, _this, res);
                }
                dispatch('getThenData', data);
            })
            .catch(err => {
                if (
                    !!err.message.split('code')[1] &&
                    err.message.split('code')[1].trim() !== '200'
                ) {
                    if (!!dataInfo.apiBasic.apiCont.faildCode) {
                        callbackCode(dataInfo.apiBasic.apiCont.faildCode, _this, err);
                    } else {
                        Message({
                            message: err.message,
                            type: 'warning',
                        });
                    }
                }
            });
    },
    getRequestHandler({ dispatch, commit, state }, dataInfo) {
        let _this = this;
        let { apiResParams, apiHeaderParams } = '';
        let reqInfo = '';
        let langlocale = '';
        let url = dataInfo.apiBasic.apiuri;
        if (dataInfo.apiBasic.apiCont.reqBodyParameter.length > 0) {
            let P = getResParams(dataInfo, _this, 'GET', 'reqBodyParameter');
            apiResParams = P.substr(1);
        } else {
            apiResParams = '';
        }
        if (!dataInfo.apiBasic.isI18n) {
            langlocale = '';
        } else {
            langlocale = this.$router.app._i18n.locale;
        }

        if (!!dataInfo.apiBasic.apiCont.reqQuery && dataInfo.apiBasic.apiCont.reqQuery.length > 0) {
            let P = getReqQuery(dataInfo, _this, 'GET');
            if (apiResParams == '') {
                reqInfo = P.substr(1);
            } else {
                reqInfo = P;
            }
        }
        if (
            !!dataInfo.apiBasic.apiCont.reqHeaders &&
            dataInfo.apiBasic.apiCont.reqHeaders.length > 0
        ) {
            apiHeaderParams = getResParams(dataInfo, _this, 'POST', 'reqHeaders');
            apiHeaderParams['locale'] = langlocale;
        }
        // console.log('head参数',apiHeaderParams);
        url = getUrlAddress(reqInfo, dataInfo.apiBasic, _this);
        let appId = window.sessionStorage.getItem('appId');
        Axios.get(`${url}`, {
            headers: apiHeaderParams,
        })
            .then(res => {
                let data = {
                    info: dataInfo,
                    resData: res,
                };
                if (dataInfo.apiBasic.apiCont.successCode) {
                    callbackCode(dataInfo.apiBasic.apiCont.successCode, _this, res);
                }
                dispatch('getThenData', data);
            })
            .catch(err => {
                if (
                    !!err.message.split('code')[1] &&
                    err.message.split('code')[1].trim() !== '200'
                ) {
                    if (dataInfo.apiBasic.apiCont.faildCode) {
                        callbackCode(dataInfo.apiBasic.apiCont.faildCode, _this, err);
                    } else {
                        Message({
                            message: err.message,
                            type: 'warning',
                        });
                    }
                }
            });
    },
    getThenData({ dispatch, commit, state }, data) {
        let _this = this;
        let dataInfo = data.info;
        var apiDataCont = data.resData.data.data;
        var resdata;
        let apiItemize = dataInfo.col.apiItemize;
        let colType = apiItemize || dataInfo.col.type;
        console.log('getThenData', dataInfo, colType);
        let colApiBasic = dataInfo.apiBasic;
        if (colApiBasic.providerType !== 'dm') {
            resdata = extApiData(colType, colApiBasic, data.resData.data, dataInfo);
        } else {
            resdata = componentTypeApiData(colType, colApiBasic, apiDataCont, dataInfo.col);
        }
        if (colType.includes('tableCount') || colType.includes('Table')) {
            let list1 = resdata.columns;
            let list2 = JSON.parse(JSON.stringify(dataInfo.col.attrs.tableHeaderList));
            list1.forEach(item => {
                list2.forEach(sitem => {
                    if (item.title === sitem.id) {
                        sitem.field = item.field;
                        // item.title = sitem.title;
                        // // item = sitem;
                        // item.width= sitem.width ? sitem.width : '';
                        // item.id = sitem.id;
                        // item.sortable = sitem.sortable;
                        // item.showOverflow = sitem.showOverflow;
                        // item.editRender = sitem.editRender ? sitem.editRender : {};
                        // if (sitem.translatableKey) {
                        //   item.translatableKey = sitem.translatableKey;
                        // }
                        // if (sitem.treeNode) {
                        //   item.treeNode = sitem.treeNode;
                        // }
                        // if(sitem.slots) {
                        //   item.slots = sitem.slots;
                        // }
                        // if(sitem.labelSetting) {
                        //   item.labelSetting = sitem.labelSetting;
                        // }
                        // if(sitem.labelStatus) {
                        //   item.labelStatus = sitem.labelStatus;
                        // }
                        // if(sitem.labelStyle) {
                        //   item.labelStyle = sitem.labelStyle;
                        // }
                    }
                });
            });
            // Vue.set(dataInfo.col.attrs,'tableHeaderList',list2);
            resdata.columns = list2;
        }
        console.log(resdata, '获取数据啦。。。1', apiDataCont);
        setGlobalVar(colApiBasic, data.resData.data);
        if (resdata) {
            commit('changeCurrentApiData', { resdata, action: dataInfo.action, col: dataInfo.col });
        }
    },
};
const mutations = {
    // 拖拽左侧元件的type， 修改editorType
    changeCurrentType(state, data) {
        // console.log(data, 'data');
        Vue.set(state.smartData.currentType, 'type', data.type);
        Vue.set(state.smartData.currentType, 'id', data.id);
        Vue.set(state.smartData.currentType, 'attrs', data.attrs);
        Vue.set(state.smartData.currentType, 'events', data.events);
        Vue.set(state.smartData.currentType, 'currentRecord', data.record);
        Vue.set(state.smartData.currentType, 'apiBasic', {});
        Vue.set(state.smartData.currentType, 'apiData', []);
    },
    // 应用布局切换，传值给editor
    changeViewFrame(state, data) {
        Vue.set(state.layoutObj, 'type', data);
    },
    // 获取当前元件修改的属性配置
    changeCurrentAttr() {},
    // 修改端type
    changeDuanMaxWidth(state, data) {
        if (data.type) {
            Vue.set(state.duanObj, 'type', data.type);
        }
        Vue.set(state.duanObj, 'maxWidth', data.value);
    },
    //根据api返回数据处理
    changeCurrentApiData(state, dataList) {
        console.log(dataList,'获取数据++++++++++++++++');
        const $ref = Vue.prototype.findComponentsByRef(dataList.col.ref);
        if ($ref.length < 1) return;
        const $$ref = $ref[0];
        const $page = Vue.prototype.findParentPage($$ref);
        if (!$page) return;
        $page[`${dataList.col.ref}_apiData`] = dataList.resdata;
        // Vue.set($$ref, 'apiData', dataList.resdata);
        if (colType.includes('tableCount') || colType.includes('Table')) {
            if (!$$ref.tableHeaderList) {
                $$ref.tableHeaderList = {value: []};
            }
            $$ref.tableHeaderList.value = dataList.resdata.columns;
        }
    },
    //根据选择的api传给元件api配置信息
    changeSelectApiBasic(state, data) {
        Vue.set(state.smartData.currentType.currentRecord.col, 'apiBasic', data);
        Vue.set(state.smartData.currentType, 'apiBasic', data);
    },
    // 解除绑定api信息和apiData
    unSelectApiinfo(state, data) {
        Vue.set(state.smartData.currentType.currentRecord.col, 'apiBasic', data.apiBasic);
        Vue.set(state.smartData.currentType, 'apiBasic', data.apiBasic);
        Vue.set(
            state.smartData.currentType.currentRecord.col,
            'apiData',
            JSON.stringify(data.apiData)
        );
    },
    // from表单提交配置的api信息
    collocateFromApiBasic() {},
    // 保存拖拽的树
    addRefData(state, data) {
        let flag = state.refData.some(item => {
            if (item.value === data.value) {
                return true;
            }
        });
        if (!flag) {
            state.refData.push(data);
        }
    },
    // 删除树
    deleteRefData(state, data) {
        state.refData.forEach((item, index) => {
            if (item.value == data) {
                state.refData.splice(index, 1);
            }
        });
    },
    // .emptyState() is needed by VuexUndoRedo
    emptyState() {
        this.replaceState({ stepData: [] });
    },
    changeSelectItem(state, data) {
        state.selectItem = data.obj;
    },
    addStepData(state, payload) {
        // console.log('stepData');
        state.stepData.push(payload);
        state.currentIndex = state.stepData.length - 1;
    },
    setupScript(state, data) {
        const scriptType = ['content', 'file'];
        if (data.type === scriptType[0]) {
            Vue.set(state.scriptData, 'scriptContents', data.value);
        }
        if (data.type === scriptType[1]) {
            Vue.set(state.scriptData, 'scriptFiles', data.value);
        }
    },
    changeInteractiveData(state, data) {
        Vue.set(state.interactiveData, data.key, data.value);
    },
};
// 获取url地址
function getUrlAddress(reqInfo, apiBasic, that) {
    let _this = that;
    let value = '';
    let dealUrl = JSON.parse(JSON.stringify(apiBasic.apiuri));
    // console.log(regUrlPath(url),'eww1111');
    if (!!apiBasic.apiCont.reqParams) {
        apiBasic.apiCont.reqParams.forEach(item => {
            let placeholderKey = `{${item.key}}`;
            value = commonGetReqParamsValue(item.originType, item.modelValue, _this, item.type);
            dealUrl = dealUrl.replace(placeholderKey, value);
        });
    }
    if (!reqInfo) {
        dealUrl = dealUrl;
    } else {
        dealUrl = `${dealUrl}?${reqInfo}`;
    }
    return dealUrl;
}
//处理URL后面拼接的逻辑
function getReqQuery(info, that) {
    let _this = that;
    let apiBasic = info.apiBasic;
    let reqList = '';
    apiBasic.apiCont.reqQuery.forEach(item => {
        let value = '';
        if (!item.hasOwnProperty('modelValue')) {
            item['modelValue'] = item.value;
        }
        value = commonGetReqParamsValue(item.originType, item.modelValue, _this, item.type);
        if (value !== '') {
            reqList += `&${item.key}=${value}`;
        }
    });
    return reqList;
}
function callbackCode(code, that, resData) {
    //接口返回code
    // console.log(resData,111);
    try {
        let scriptContent = JSON.stringify(`try{${code}}catch(e){console.error(e)}`);
        let fun = new Function('responseData', eval(scriptContent)).bind(that);
        fun(resData);
    } catch (e) {
        console.error(e);
    }
}
//处理from-data请求data
function getReqFromData(info, that) {
    const app = startup.getGlobalVal('app');
    let _this = that;
    let apiBasic = info.apiBasic;
    let resfrom = {};
    apiBasic.apiCont.reqBodyForm.forEach(item => {
        let value = '';
        value = commonGetReqParamsValue(item.originType, item.modelValue, _this, item.type);
        resfrom[item.key] = value;
    });
    if (apiBasic.contentType == 'form-data') {
        let files = new FormData();
        for (let item in resfrom) {
            if (toString.call(resfrom[item]) == '[object Array]') {
                for (let i = 0; i < resfrom[item].length; i++) {
                    files.append(item, resfrom[item][i]);
                }
            } else {
                files.append(item, resfrom[item]);
            }
        }
        return files;
    } else {
        return app.$root.$qs.stringify(resfrom);
    }
}
//处理api参数逻辑
function getResParams(info, that, methods, apiData) {
    //解析参数
    let _this = that;
    let ResParams = {};
    let apiBasic = info.apiBasic;
    if (apiBasic.providerType == 'dm') {
        ResParams = {
            param: {},
        };
    } else {
        ResParams = {};
    }
    apiBasic.apiCont[apiData].forEach(item => {
        let value = '';
        if (!item.hasOwnProperty('modelValue')) {
            item['modelValue'] = item.value;
        }
        value = commonGetReqParamsValue(item.originType, item.modelValue, _this, item.type);
        if (methods !== 'GET') {
            if (value !== '' && apiBasic.providerType == 'dm') {
                ResParams.param[item.key] = value;
            } else if (value !== '') {
                ResParams[item.key] = value;
            }
        } else if (value !== '') {
            ResParams += `&${item.key}=${value}`;
        }
    });
    return ResParams;
}
//根据选择的参数类型，固定值，组件变量，全局变量类型来获取value
function commonGetReqParamsValue(originType, modelValue, _this, type) {
    const app = startup.getGlobalVal('app');
    let value;
    if (originType == 1) {
        value = !app.findComponentsByRef(modelValue)
            ? ''
            : app.findComponentsByRef(modelValue).getValue();
    } else if (originType == 2) {
        value = modelValue;
    } else if (originType == 3) {
        value = getGlobalVariableByKey(modelValue, true);
    }
    if (type == 'number') {
        value = Number(value);
    }
    return value;
}
//根据api返回数据设置全局变量
function setGlobalVar(api, data) {
    let dataCont = JSON.parse(JSON.stringify(data));
    if (api.apiCont.globalVariableBasic.length == 1 && !api.apiCont.globalVariableBasic[0].key)
        return;
    api.apiCont.globalVariableBasic.forEach(item => {
        let value = dealGlobalVariable(item.key, dataCont);
        setGlobalVariable(item.name, value);
    });
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
