export function getResponseJson(data, apiId) {
    switch (apiId) {
    case 242:
            return data;
            break;
        default:
            return data;
            break;
    }
}

export function setDisplayAttr(data, dataMap, item) {
    var displayFlag = true;
    let keys = [];
    if (Array.isArray(dataMap) && dataMap.length > 0) {
        keys = dataMap.filter(ele => item.key.startsWith(ele.value));
    }
    if (keys.length > 0) {
        if (typeof data == 'object' && Array.isArray(keys[0].key) && keys[0].key.length >= 2) {
            let processData = data;
            for (var i = 2; i < keys[0].key.length; i++) {
                // 暂定：教育从2开始，其他从0开始，暂没有区分标记
                if (processData.hasOwnProperty(keys[0].key[i])) {
                    processData = processData[keys[0].key[i]];
                } else {
                    displayFlag = true; // 需改为false
                    break;
                }
            }
        }
    }
    return displayFlag;
}

export function processApiFieldMap(data, key, apiId) {
    switch (apiId) {
        case 242:
            let finalData = data;
            for (var i = 2; i < 4; i++) {
                if (finalData.hasOwnProperty(key[i])) {
                    finalData = finalData[key[i]];
                    if (key[i] == 'options') {
                        var items = [];
                        if (finalData.length > 0) {
                            Object.keys(finalData[0]).forEach(key => {
                                items.push({
                                    itemKey: finalData[0][key],
                                    itemValue: key + ' ' + finalData[0][key],
                                });
                            });
                    }
                        finalData = items;
                    }
                }
        }
            return finalData;
            break;
        default:
            if (typeof key == 'string') {
                return data[key];
            } else if (Array.isArray(key)) {
                let finalData = data;
                for (var i = 0; i < key.length; i++) {
                    if (finalData.hasOwnProperty(key[i])) {
                        finalData = finalData[key[i]];
                    }
                }
                return finalData;
            }
    }
}

export function processCardApiFieldMap(data, keys, apiId) {
    if (Array.isArray(keys) && keys.length > 0) {
        if (data.hasOwnProperty(keys[keys.length - 1])) {
            return data[keys[keys.length - 1]];
        }
    }
    return '';
}

export default {
    getResponseJson,
    processApiFieldMap,
    processCardApiFieldMap,
    setDisplayAttr,
};
