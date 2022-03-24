// import { object } from "underscore";
var jp = require('jsonpath');
import { spliceKey } from './apiDataExtUtils';
export function componentTypeApiData(colType, apiBasic, ApidataList) {
    // debugger
    let apiInfo = JSON.parse(JSON.stringify(apiBasic));
    // console.log(apiBasic,'获取api');
    let { Xinfo, Yinfo, Zinfo, resCont } = '';
    if (apiInfo.providerType == 'dm' && apiInfo.providerVersion == 'v2') {
        Xinfo = arrPop(apiInfo.apiCont.checkDataKey.checkKeyX);
        Yinfo = arrPop(apiInfo.apiCont.checkDataKey.checkKeyY);
        Zinfo = arrPop(apiInfo.apiCont.checkDataKey.checkKeyZ);
    } else {
        Xinfo = apiInfo.apiCont.checkDataKey.checkKeyX;
        Yinfo = apiInfo.apiCont.checkDataKey.checkKeyY;
        Zinfo = apiInfo.apiCont.checkDataKey.checkKeyZ;
    }
    if (apiInfo.providerType == 'dm') {
        resCont = ApidataList.rows;
    } else {
        resCont = ApidataList;
    }
    if (
        colType == 'line' ||
        colType == 'bar' ||
        colType == 'polar' ||
        colType == 'pie' ||
        colType == 'donut' ||
        colType == 'stackLine' ||
        colType == 'stackBar' ||
        colType == 'barLine' ||
        colType == 'negativeBar' ||
        colType == 'polar' ||
        colType == 'chartBase'
    ) {
        Xinfo = JSON.stringify(Xinfo);
        let typeApiData = {
            measures: [],
            dimensions: {
                name: Xinfo,
                data: [],
            },
        };
        let Ytype = typeof Yinfo;
        if (Ytype == 'object') {
            //折线图和柱状图都可以是多选
            Yinfo.forEach(listY => {
                let itemYData = {
                    name: listY,
                    data: [],
                };
                let itemXlist = [];

                resCont.forEach(listData => {
                    for (let itemKey in listData) {
                        if (listY == itemKey) {
                            itemYData.data.push(listData[itemKey]);
                        }
                        if (Xinfo.includes(itemKey)) {
                            itemXlist.push(listData[itemKey]);
                        }
                    }
                });
                typeApiData.dimensions.data = itemXlist;
                typeApiData.measures.push(itemYData);
            });
        } else {
            //饼图y轴单选
            let itemYData = {
                name: Yinfo,
                data: [],
            };
            let itemXlist = [];
            resCont.forEach(listData => {
                for (let itemKey in listData) {
                    if (Yinfo == itemKey) {
                        itemYData.data.push(listData[itemKey]);
                    }
                    if (Xinfo.includes(itemKey)) {
                        itemXlist.push(listData[itemKey]);
                    }
                }
            });
            typeApiData.dimensions.data = itemXlist;
            typeApiData.measures.push(itemYData);
        }

        return typeApiData;
    } else if (colType == 'scatter') {
        let typeApiData = {
            measures: [],
            dimensions: {
                data: [],
            },
        };
        typeApiData.dimensions.data.push(Xinfo);
        typeApiData.dimensions.data.push(Yinfo);
        let ylist = {
            data: [],
        };
        resCont.forEach(listData => {
            let itemData = [];
            for (let itemKey in listData) {
                if (Xinfo == itemKey) {
                    itemData.push(listData[itemKey]);
                }
                if (Yinfo == itemKey) {
                    itemData.push(listData[itemKey]);
                }
            }
            ylist.data.push(itemData);
        });
        typeApiData.measures.push(ylist);
        return typeApiData;
    } else if (colType == 'bar3D') {
        let typeApiData = {
            yAxis: [], //x轴
            xAxis: [], //y轴
            zAxis: [], //z轴
        };
        let zlist = [];

        resCont.forEach(listData => {
            for (let itemKey in listData) {
                if (Xinfo == itemKey) {
                    typeApiData.yAxis.push(listData[itemKey]);
                }
                if (Yinfo == itemKey) {
                    typeApiData.xAxis.push(listData[itemKey]);
                }
                if (Zinfo == itemKey) {
                    zlist.push(listData[itemKey]);
                }
            }
        }); //先把x，y，z的数据取出来生成数组
        let zValue = [];
        zlist.forEach((item, index) => {
            let zitem = [];
            zitem[0] = typeApiData.yAxis[index];
            zitem[1] = typeApiData.xAxis[index];
            zitem[2] = item;
            zValue.push(zitem);
        });
        // 去重以后计算下标
        let xIndex = Array.from(new Set(typeApiData.yAxis));
        let yIndex = Array.from(new Set(typeApiData.xAxis));
        let xIndexCont = [];
        let yIndexCont = [];
        xIndex.forEach((v, i) => {
            xIndexCont.push({
                index: i,
                value: v,
            });
        });
        yIndex.forEach((v, i) => {
            yIndexCont.push({
                index: i,
                value: v,
            });
        });
        zValue.forEach(item => {
            xIndexCont.forEach(xitem => {
                if (xitem.value == item[0]) {
                    item[0] = xitem.index;
                }
            });
            yIndexCont.forEach(yitem => {
                if (yitem.value == item[1]) {
                    item[1] = yitem.index;
                }
            });
        });
        typeApiData.yAxis = xIndex;
        typeApiData.xAxis = yIndex;
        typeApiData.zAxis = zValue;

        return typeApiData;
    } else if (
        colType == 'map' ||
        colType == 'select' ||
        colType == 'combobox' ||
        colType == 'treemap' ||
        colType == 'radio' ||
        colType == 'checkbox' ||
        colType == 'scrollList'
    ) {
        let typeApiData = [];
        let { data, dealkey1, dealkey2, key1, key2 } = '';
        // let loopKey  = apiBasic.apiCont.loopDataBasic;
        if (typeof apiInfo.apiCont.loopDataBasic[0].key == 'string') {
            key1 = apiInfo.apiCont.loopDataBasic[0].key;
            key2 = apiInfo.apiCont.loopDataBasic[1].key;
            data = resCont;
        } else {
            apiInfo.apiCont.loopDataBasic[0].key.splice(0, 2); //先去掉data和rows;
            apiInfo.apiCont.loopDataBasic[1].key.splice(0, 2); //先去掉data和rows;
            dealkey1 = apiInfo.apiCont.loopDataBasic[0].key;
            dealkey2 = apiInfo.apiCont.loopDataBasic[1].key;
            if (dealkey1.length <= 1) {
                data = resCont;
                key1 = dealkey1[0];
                key2 = dealkey2[0];
            } else {
                let key = spliceKey(dealkey1);
                data = jp.query(resCont, `$..${key}`);
                key1 = dealkey1.pop();
                key2 = dealkey2.pop();
            }
        }
        if (data.length > 0) {
            if (Array.isArray(data[0])) {
                data = data[0];
            }
        }
        if (colType == 'treemap') {
            for (var ob of data) {
                typeApiData.push({
                    name: ob[key1],
                    value: ob[key2],
                });
            }
        } else {
            for (let ob of data) {
                typeApiData.push({
                    key: ob[key1],
                    value: ob[key2],
                    label: ob[key2],
                    name: ob[key2],
                    itemKey: ob[key1],
                    itemValue: ob[key2],
                });
            }
        }
        return typeApiData;
    } else if (colType == 'singleWeek' || colType == 'BasicDatePicker') {
        let typeApiData = [];
        typeApiData = resCont[Xinfo];
        return typeApiData;
    } else if (
        colType === 'tabs' ||
        colType == 'tree' ||
        colType == 'loop' ||
        colType == 'flex' ||
        colType == 'initial' ||
        colType == 'treeSelect'
    ) {
        let typeApiData = resCont[0][Xinfo] || resCont;
        return typeApiData;
    } else if (colType === 'textarea' || colType === 'paragraph') {
        let data = resCont[Xinfo] || resCont;
        let typeApiData = [];
        data.forEach(item => {
            let itm = '';
            Yinfo.forEach(key => {
                itm = itm + item[key];
            });
            typeApiData.push(itm);
        });
        return typeApiData;
    } else if (
        colType == 'tableCount' ||
        colType == 'baseTable' ||
        colType == 'sortTable' ||
        colType == 'selectRowTable' ||
        colType == 'editTable'
    ) {
        var typeApiData = {
            columns: [],
            data: resCont,
        };
        if (apiInfo.apiCont.loopDataBasic.length == 1 && !apiInfo.apiCont.loopDataBasic[0].key) {
            for (let key in resCont[0]) {
                let itemList = {};
                if (colType == 'sortTable') {
                    itemList = {
                        field: key,
                        title: key,
                        sortable: true,
                    };
                } else if (colType == 'editTable') {
                    itemList = {
                        field: key,
                        title: key,
                        // editRender: {
                        //   name: 'input',
                        // },
                    };
                } else {
                    itemList = {
                        field: key,
                        title: key,
                    };
                }
                typeApiData.columns.push(itemList);
            }
        } else {
            apiInfo.apiCont.loopDataBasic.forEach(itemy => {
                let itemKey = '';
                if (toString.call(itemy.key) == '[object String]') {
                    itemKey = itemy.key;
                } else {
                    itemKey = arrPop(itemy.key);
                }
                let itemList = {};
                if (colType == 'sortTable') {
                    itemList = {
                        field: itemKey,
                        title: itemy.name,
                        sortable: true,
                    };
                } else if (colType == 'editTable') {
                    // console.log('itemKeya', itemKey, itemy);
                    itemList = {
                        field: Array.isArray(itemKey) ? itemKey[0] : itemKey,
                        title: itemy.name,
                        // editRender: {
                        //   name: 'input',
                        // },
                    };
                } else {
                    itemList = {
                        field: itemKey,
                        title: itemy.name,
                    };
                }
                typeApiData.columns.push(itemList);
            });
        }
        if (colType == 'selectRowTable') {
            typeApiData.columns.unshift({
                type: 'checkbox',
                with: 60,
            });
        }
        return typeApiData;
    } else if (colType == 'radar') {
        let typeApiData = {
            measures: [],
            dimensions: [],
        };

        Yinfo.forEach(itemy => {
            typeApiData.dimensions.push({
                name: itemy,
                max: null,
            });
        });

        resCont.forEach(item => {
            let xlist = {
                name: '',
                data: [],
            };
            xlist.name = item[Xinfo];
            for (let ikey in item) {
                Yinfo.forEach(itemy => {
                    if (itemy == ikey) {
                        xlist.data.push(item[ikey]);
                    }
                });
            }
            typeApiData.measures.push(xlist);
        });
        return typeApiData;
    } else if (colType == 'chartBase3D' || colType == 'barto3D' || colType == 'scatter3D') {
        let typeApiData = [];
        resCont.forEach(item => {
            let itemArray = [];
            for (let iData in item) {
                if (Zinfo.includes(iData)) {
                    itemArray.push(item[iData]);
                }
                if (Yinfo.includes(iData)) {
                    itemArray.push(item[iData]);
                }
                if (Xinfo.includes(iData)) {
                    itemArray.push(item[iData]);
                }
            }
            typeApiData.push(itemArray);
        });
        let unshiftData = Zinfo.concat(Yinfo);
        typeApiData.unshift(unshiftData.concat(Xinfo));
        return typeApiData;
    } else if (
        colType == 'singleValue' ||
        colType == 'text' ||
        colType == 'title' ||
        colType == 'input' ||
        colType == 'liquidfill' ||
        colType == 'gauge' ||
        colType == 'Progress'
    ) {
        let typeApiData = resCont[0][Xinfo];
        return typeApiData;
    } else if (colType == 'Itemgroups') {
        // colType == 'radio' ||
        let contlist = resCont;
        let typeApiData = [];
        var key1 = Object.keys(resCont[0])[0];
        let key2 = Object.keys(resCont[0])[1];
        contlist.forEach(item => {
            typeApiData.push({
                itemKey: item[key1],
                itemValue: item[key2], // `${item[key1]}( ${item[key2]} )`
            });
        });
        return typeApiData;
    } else if (colType == 'Steppers') {
        let typeApiData = [];
        resCont.forEach(item => {
            let steppers = {};
            steppers['status'] = item[Zinfo.toString()];
            steppers['name'] = item[Yinfo.toString()];
            steppers['message'] = item[Xinfo.toString()];
            typeApiData.push(steppers);
        });
        return typeApiData;
    } else if (colType == 'flow') {
        let typeApiData = {
            nodes: [],
            edges: [],
        };
        resCont.forEach((item, index) => {
            let itemNode = {};
            let itemEdge = {};
            itemNode = {
                id: item[Xinfo.toString()].toString(),
                name: item[Yinfo.toString()],
                x: index + 10,
                y: 0,
                category: 0,
            };
            typeApiData.nodes.push(itemNode);
            if (index < resCont.length - 1) {
                itemEdge = {
                    id: index,
                    source: item[Xinfo.toString()].toString(),
                    // target: item[Xinfo.toString()],
                    target: resCont[index + 1][Xinfo.toString()].toString(),
                    edgeType: item[Zinfo.toString()],
                };
                typeApiData.edges.push(itemEdge);
            }
        });
        return typeApiData;
    } else if (colType == 'card') {
        let key = spliceKey(apiBasic.apiCont.loopDataBasic[0].key);
        typeApiData = jp.query(ApidataList, `$..${key}`);
        if (Array.isArray(typeApiData) && typeApiData.length > 0) {
            if (
                Object.prototype.toString.call(typeApiData[0]) == '[object Object]' &&
                Object.keys(typeApiData[0]).length > 0
            ) {
                return typeApiData[0];
            } else if (
                Object.prototype.toString.call(typeApiData[0]) == '[object Array]' &&
                Object.keys(typeApiData[0]).length > 0
            ) {
                return typeApiData[0][0];
            }
        }
        return typeApiData;
    } else if (colType == 'world') {
        let typeApiData = [];
        if (typeof Xinfo !== 'string') {
            Xinfo.toString();
            Yinfo.toString();
        }
        resCont.forEach(item => {
            let itemLocalList = {};
            itemLocalList[item[Xinfo]] = item[Yinfo];
            typeApiData.push(itemLocalList);
        });
        return typeApiData;
    }
}

export function arrPop(str) {
    let info = [];
    if (toString.call(str[0]) == '[object String]') {
        info.push(str.pop());
    } else {
        str.forEach(item => {
            info.push(item.pop());
        });
    }
    return info;
}
