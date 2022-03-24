var jp = require('jsonpath');
import { arrPop } from './apiDataUtils';
export function extApiData(colType, apiB, ApidataList) {
    let apiBasic = JSON.parse(JSON.stringify(apiB));
    var typeApiData;
    if (
        colType == 'line' ||
        colType == 'bar' ||
        // colType == 'stackBar' ||
        colType == 'polar' ||
        colType == 'pie' ||
        colType == 'donut' ||
        // colType == 'stackLine' ||
        colType == 'barLine' ||
        colType == 'polar' ||
        colType == 'chartBase'
    ) {
        let key = apiBasic.apiCont.checkDataKey.checkKeyX.pop();
        let resCont = jp.query(ApidataList, `$..${key}`);
        typeApiData = {
            measures: [],
            dimensions: {
                name: key,
                data: resCont,
            },
        };
        if (['pie', 'donut'].includes(colType)) {
            let listY = apiBasic.apiCont.checkDataKey.checkKeyY;
            let key = listY[listY.length - 1];
            let itemYData = {
                name: key,
                data: jp.query(ApidataList, `$..${key}`),
            };
            typeApiData.measures.push(itemYData);
        } else {
            apiBasic.apiCont.checkDataKey.checkKeyY.forEach(listY => {
                let key = listY[listY.length - 1];
                let itemYData = {
                    name: key,
                    data: jp.query(ApidataList, `$..${key}`),
                };
                typeApiData.measures.push(itemYData);
            });
        }
        console.log(typeApiData, '全部的数据');
        return typeApiData;
    }
    if (colType == 'stackBar' || colType == 'stackLine') {
        let xKey = apiBasic.apiCont.checkDataKey.checkKeyX.pop();
        var xData = jp.query(ApidataList, `$..${xKey}`);
        var xAxis = [...new Set(xData)];
        typeApiData = {
            measures: [],
            dimensions: {
                name: xKey,
                data: xAxis,
            },
        };
        apiBasic.apiCont.checkDataKey.checkKeyY.forEach(ydata => {
            var yKey = ydata[ydata.length - 1];
            var yData = jp.query(ApidataList, `$..${yKey}`);
            var zKey = apiBasic.apiCont.checkDataKey.checkKeyZ.pop();
            var zData = jp.query(ApidataList, `$..${zKey}`);
            var yAxis = [...new Set(yData)];
            yAxis.forEach(y => {
                let z = new Array(xAxis.length).fill(0);
                xAxis.forEach((x, index) => {
                    for (let i = 0; i < xData.length; i++) {
                        if (xData[i] == x && yData[i] == y) {
                            z[index] = z[index] + parseInt(zData[i]);
                        }
                    }
                });
                let item = {
                    name: y,
                    data: z,
                };
                typeApiData.measures.push(item);
            });
        });
        console.log('折叠图数据...', typeApiData);
        return typeApiData;
    }
    if (colType == 'loop' || colType == 'flex' || colType == 'card' || colType == 'initial') {
        let key = spliceKey(apiBasic.apiCont.loopDataBasic[0].key);
        typeApiData = jp.query(ApidataList, `$..${key}`);
        if (Array.isArray(typeApiData) && typeApiData.length > 0) {
            return typeApiData[0];
        }
        return typeApiData;
    } else if (colType == 'singleWeek' || colType == 'BasicDatePicker') {
        typeApiData = jp.query(ApidataList, `$..${apiBasic.apiCont.checkDataKey.checkKeyX.pop()}`);
        return typeApiData;
    } else if (
        colType == 'text' ||
        colType == 'title' ||
        colType == 'input' ||
        colType == 'liquidfill' ||
        colType == 'gauge' ||
        colType == 'tree' ||
        colType == 'Progress' ||
        colType == 'singleValue'
    ) {
        if (apiBasic.apiCont.checkDataKey.checkKeyX.length == 1) {
            typeApiData = jp.query(ApidataList, `$..${apiBasic.apiCont.checkDataKey.checkKeyX}`);
        } else {
            typeApiData = jp.query(
                ApidataList,
                `$..${apiBasic.apiCont.checkDataKey.checkKeyX.pop()}`
            );
        }
        return typeApiData[0];
    } else if (colType == 'textarea') {
        let yInfo = apiBasic.apiCont.checkDataKey.checkKeyY;
        let primaryKey = spliceKey(yInfo[0]);
        let apiData = jp.query(ApidataList, `$..${primaryKey}`);
        typeApiData = '';
        if (Array.isArray(apiData) && apiData.length > 0) {
            if (Array.isArray(apiData[0])) {
                // 处理数据返回值
                typeApiData = [];
                apiData[0].forEach(item => {
                    let content = '';
                    yInfo.forEach(ele => {
                        content += item[ele[ele.length - 1]];
                    });
                    typeApiData.push(content);
                });
            } else {
                // 处理对象返回值
                yInfo.forEach(ele => {
                    typeApiData += apiData[0][ele[ele.length - 1]];
                });
            }
        }
        return typeApiData;
    } else if (
        colType == 'select' ||
        colType == 'combobox' ||
        colType == 'scrollList' ||
        colType == 'map' ||
        colType == 'checkbox' ||
        colType == 'radio' ||
        colType == 'treemap'
    ) {
        var optionData = [];
        var keyValue = {};
        // apiBasic.apiCont.loopDataBasic.push({key:['data','ironman_l1categoryid'],value: 'key'})
        // apiBasic.apiCont.loopDataBasic.push({key:['data','ironman_l1categoryname'],value: 'value'})
        var keyMap = apiBasic.apiCont.loopDataBasic.filter(ele => ele.name == 'key');
        var valueMap = (valueMap = apiBasic.apiCont.loopDataBasic.filter(
            ele => ele.name == 'value'
        ));
        var keyLength;
        if (keyMap.length > 0 && valueMap.length > 0) {
            apiBasic.apiCont.loopDataBasic.forEach(ele => {
                if (['key', 'value'].includes(ele.name)) {
                    var arrLen = ele.key.length;
                    keyValue[ele.name] = ele.key[arrLen - 1];
                }
            });
            keyLength = apiBasic.apiCont.loopDataBasic[0].key.length - 2;
        } else {
            keyLength = apiBasic.apiCont.loopDataBasic[0].key.length - 1;
        }

        let key = apiBasic.apiCont.loopDataBasic[0].key[keyLength];
        console.log(2222, keyValue, key);
        typeApiData = jp.query(ApidataList, `$..${key}`);
        if (typeApiData.length > 0 && typeApiData[0].length > 0) {
            typeApiData[0].forEach(ele => {
                if (Object.keys(keyValue).length == 0) {
                    var params = Object.keys(ele);
                    optionData.push({
                        key: ele[params[1]],
                        value: ele[params[2]],
                    });
                } else {
                    optionData.push({
                        key: ele[keyValue.key],
                        value: ele[keyValue.value],
                    });
                }
            });
        }
        return optionData;
    } else if (
        colType == 'baseTable' ||
        colType == 'sortTable' ||
        colType == 'selectRowTable' ||
        colType == 'editTable' ||
        colType == 'tableCount'
    ) {
        let resCont;
        resCont = reqData(ApidataList, apiBasic.apiCont.loopDataBasic[0].key);
        typeApiData = {
            columns: [],
            data: resCont,
        };
        // console.log(resCont,'所有数据')
        if (apiBasic.apiCont.loopDataBasic.length == 1 && !apiBasic.apiCont.loopDataBasic[0].key) {
            // resCont = reqData(ApidataList,apiBasic.apiCont.loopDataBasic[0].key);
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
            apiBasic.apiCont.loopDataBasic.forEach(itemy => {
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
                    itemList = {
                        field: itemKey,
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
    } else if (colType == 'scatter') {
        let typeApiData = {
            measures: [],
            dimensions: {
                data: [],
            },
        };
        let key = spliceKey(apiBasic.apiCont.checkDataKey.checkKeyX);
        let resCont = jp.query(ApidataList, `$..${key}`);
        let dimensKeys = arrPop(apiBasic.apiCont.checkDataKey.checkKeyX).concat(
            arrPop(apiBasic.apiCont.checkDataKey.checkKeyY)
        );
        typeApiData.dimensions.data = dimensKeys;
        let ylist = {
            data: [],
        };
        for (let item of resCont) {
            for (let itemKey in item) {
                if (dimensKeys.includes(itemKey)) {
                    ylist.data.push(item[itemKey]);
                }
            }
        }
        typeApiData.measures.push(ylist);
        return typeApiData;
    } else if (colType == 'world') {
        let typeApiData = [];
        let key = spliceKey(apiBasic.apiCont.checkDataKey.checkKeyX);
        let resCont = jp.query(ApidataList, `$..${key}`);
        let x = arrPop(apiBasic.apiCont.checkDataKey.checkKeyX);
        let y = arrPop(apiBasic.apiCont.checkDataKey.checkKeyY);
        for (let item of resCont[0]) {
            let itemLocalList = {};
            itemLocalList[item[x]] = item[y];
            typeApiData.push(itemLocalList);
        }
        return typeApiData;
    } else if (colType == 'Steppers') {
        let typeApiData = [];
        let key = spliceKey(apiBasic.apiCont.checkDataKey.checkKeyX);
        let resCont = jp.query(ApidataList, `$..${key}`);
        let x = arrPop(apiBasic.apiCont.checkDataKey.checkKeyX);
        let y = arrPop(apiBasic.apiCont.checkDataKey.checkKeyY);
        let z = arrPop(apiBasic.apiCont.checkDataKey.checkKeyZ);
        resCont.forEach(item => {
            let steppers = {};
            steppers['status'] = item[z];
            steppers['name'] = item[y];
            steppers['message'] = item[x];
            typeApiData.push(steppers);
        });
        return typeApiData;
    } else if (colType == 'flow') {
        let typeApiData = {
            nodes: [],
            edges: [],
        };
        let key = spliceKey(apiBasic.apiCont.checkDataKey.checkKeyX);
        let resCont = jp.query(ApidataList, `$..${key}`);
        let xInfo = arrPop(apiBasic.apiCont.checkDataKey.checkKeyX);
        let yInfo = arrPop(apiBasic.apiCont.checkDataKey.checkKeyY);
        let zInfo = arrPop(apiBasic.apiCont.checkDataKey.checkKeyZ);
        resCont.forEach((item, index) => {
            let itemNode = {};
            let itemEdge = {};
            itemNode = {
                id: item[xInfo].toString(),
                name: item[yInfo],
                x: index + 10,
                y: 0,
                category: 0,
            };
            typeApiData.nodes.push(itemNode);
            if (index < resCont.length - 1) {
                itemEdge = {
                    id: index,
                    source: item[xInfo].toString(),
                    // target: item[Xinfo.toString()],
                    target: resCont[index + 1][xInfo].toString(),
                    edgeType: item[zInfo.toString()],
                };
                typeApiData.edges.push(itemEdge);
            }
        });
        return typeApiData;
    }
}

export function dealGlobalVariable(globalApi, ApidataList) {
    let apiInfo = JSON.parse(JSON.stringify(globalApi));
    var globalData;
    if (typeof ApidataList == 'string') {
        ApidataList = JSON.parse(ApidataList);
    }
    globalData = jp.query(ApidataList, `$..${apiInfo.pop()}`);
    return globalData;
}

function reqData(data, keys) {
    var finalData = data;
    if (typeof keys == 'string') {
        return finalData[keys];
    } else if (Array.isArray(keys) && keys.length > 0) {
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (Object.prototype.hasOwnProperty.call(finalData, key)) {
                finalData = finalData[key];
            } else {
                return finalData;
            }
        }
        return finalData;
    }
}

export function spliceKey(keyList) {
    //获取可视化选择字段倒数第二个
    let key = '';
    var keys = JSON.parse(JSON.stringify(keyList));
    key = keys[keys.length - 2];
    return key;
}
