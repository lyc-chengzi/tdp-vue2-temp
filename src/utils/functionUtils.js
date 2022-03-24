import CryptoJS from 'crypto-js';

const VARIABLEKEY = 'designerGlobalVariable';
/**
 * 向上查找组件 context为当前组件上下文对象，componentName为组件名
 * @param context
 * @param componentName
 * @returns {Vue}
 */
export const findUpwardComponent = (context, componentName) => {
    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || !name.includes(componentName))) {
        console.log(parent);
        if (parent && parent.$children) {
            findDownwardComponent(parent, componentName);
            // findBrotherComponents(parent,componentName)
        }
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
};

/**
 * 查找兄弟组件
 * @param ctx
 * @param componentName
 * @param exceptMe
 * @returns {Vue[]}
 */
export const findBrotherComponents = (ctx, componentName, exceptMe = true) => {
    const $brothers = ctx.$parent.$children.filter(item => {
        return item.$options.name && item.$options.name.includes(componentName);
    });
    console.log($brothers);
    const index = $brothers.findIndex(item => item._uid === ctx._uid);
    if (exceptMe && index > -1) $brothers.splice(index, 1);
    return $brothers;
};

/**
 * 向下查找
 * @param context
 * @param componentName
 * @returns {null}
 */
export const findDownwardComponent = (context, componentName) => {
    const $children = context.$children;
    let bean = null;
    if ($children.length) {
        for (const child of $children) {
            const name = child.$options.name;
            if (name && name.includes(componentName)) {
                bean = child;
                break;
            } else {
                bean = findDownwardComponent(child, componentName);
                if (bean) break;
            }
        }
    }
    return bean;
};
function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

// 深拷贝
export const cloneDeeOwn = (source, hash = new WeakMap()) => {
    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source); // 查哈希表
    let target = Array.isArray(source) ? [] : {};
    hash.set(source, target); // 哈希表设值
    let symKeys = Object.getOwnPropertySymbols(source); // 查找
    if (symKeys.length) {
        // 查找成功
        symKeys.forEach(symKey => {
            if (isObject(source[symKey])) {
                target[symKey] = cloneDeeOwn(source[symKey], hash); // 传入哈希表
            } else {
                target[symKey] = source[symKey];
            }
        });
    }
    for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                target[key] = cloneDeeOwn(source[key], hash);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
};
// 生成key
function newNameFun() {
    let refDataValue = JSON.parse(sessionStorage.getItem('refDataValue')) || [];
    let maxPos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    let newName = '';
    for (let i = 0; i < 6; i++) {
        newName += maxPos.charAt(Math.floor(Math.random() * maxPos.length));
    }
    newName += new Date().getTime();
    newName += String(Math.floor(Math.random() * 1000)).padStart(4, '0');
    // console.log(String(Math.floor(Math.random() * 1000)).padStart(4, '0'));
    if (refDataValue.includes(newName)) {
        console.log('key重复，重新生成');
        newName = newNameFun();
    }
    return newName;
}
export const newName = () => {
    return newNameFun();
};

// 复制key
export const copyKey = key => {
    console.log(key);
    let transfer = document.createElement('input');
    document.body.appendChild(transfer);
    transfer.value = key; // 这里表示想要复制的内容
    transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    transfer.blur();
    document.body.removeChild(transfer);
};

Array.prototype.removeByIndex = function (index) {
    const newArray = [];
    this.forEach((item, i) => {
        if (index !== i) {
            newArray.push(item);
        }
    });
    return newArray;
};
/**
 *
 * @param src The script URL . example: htttps://xxx.com/api.js
 * @param position The script put in where. only limit head/body
 * @param key The script belong of page id. user can customize
 * @constructor
 */
export const AddScriptWithFile = function (src, position, key) {
    const positions = ['body', 'head'];
    const query = `script[src='${src}']`;
    if (document.querySelector(query) || !positions.includes(position)) {
        return;
    }
    let script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('key', key);
    document[position].appendChild(script);
};
/**
 * Add Script with script content
 * @param content  script content
 * @param position
 * @param key
 * @constructor
 */
export const AddScriptWithContent = function (content, position, key) {
    // const positions = ['body','head'];
    // const query = `script[contentKey='${key}']`;
    // if(document.querySelector(query) || !positions.includes(position)){ return; };
    let script = document.createElement('script');
    script.text = content;
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('contentKey', key);
    document[position].appendChild(script);
};
/**
 * Remove script by src
 * @param src
 * @constructor
 */
export const DelScriptBySrc = function (src) {
    const query = `script[src='${src}']`;
    let allScript = document.querySelectorAll(query);
    allScript.forEach(el => {
        el.remove();
    });
};
/**
 * Remove script by key
 * @param key
 * @constructor
 */
export const DelScriptByKey = function (key) {
    const query = `script[key='${key}'],script[contentKey='${key}']`;
    let allScript = document.querySelectorAll(query);
    allScript.forEach(el => {
        el.remove();
    });
};

export const setGlobalVariable = function (key, value) {
    let variableList = JSON.parse(window.sessionStorage.getItem(VARIABLEKEY));
    if (variableList) {
        let sameKey = variableList.queue.filter(item => item.id === key);
        if (sameKey.length > 0) {
            variableList.queue.forEach(item => {
                if (item.id === key) {
                    item.value = value;
                }
            });
        } else {
            let item = { id: key, value };
            variableList.queue.push(item);
        }
    } else {
        variableList = {};
        variableList.queue = [];
        let item = { id: key, value };
        variableList.queue.push(item);
    }
    // console.log(3222, variableList)
    window.sessionStorage.setItem(VARIABLEKEY, JSON.stringify(variableList));
};
export const delGlobalVariable = function (key) {
    let variableList = JSON.parse(window.sessionStorage.getItem(VARIABLEKEY));
    variableList.queue.forEach((item, index) => {
        if (item.id === key) {
            variableList.queue.splice(index, 1);
        }
    });
    window.sessionStorage.setItem(VARIABLEKEY, JSON.stringify(variableList));
};
export const getGlobalVariableByKey = function (key, onlyValue) {
    let variableList = JSON.parse(window.sessionStorage.getItem(VARIABLEKEY));
    let variable = undefined;
    if (variableList && variableList.queue) {
        variableList.queue.forEach(item => {
            if (item.id === key) {
                variable = item;
            }
        });
    }
    return (onlyValue == null || onlyValue) && variable ? variable.value : variable;
};

export const getGlobalVariableKey = function () {
    let variableList = JSON.parse(window.sessionStorage.getItem(VARIABLEKEY));
    let variableKeys = [];
    if (!variableList || !variableList.queue) {
        return variableKeys;
    }
    variableList.queue.forEach(item => {
        variableKeys.push(item.id);
    });
    return variableKeys;
};
/**
 * Exec Component API invoke
 * @param component The Component instance
 * @param parameter Api parameter
 * @constructor
 */
export const ApiCall = function (component, parameter) {
    try {
        var apiBasic = component.apiBasic;
        if (component.$options.name == 'layoutItem') {
            apiBasic = component.record.col.apiBasic;
        }
        let copyApiBasic = JSON.parse(JSON.stringify(apiBasic));
        if (copyApiBasic) {
            if (parameter) {
                let apiBodyParameter = copyApiBasic.apireqBodyParameter;
                let apiReqQuery = copyApiBasic.apiCont.reqQuery;
                let paramKeys = Object.keys(parameter);
                if (apiBodyParameter) {
                    apiBodyParameter.forEach(bodyParameter => {
                        bodyParameter.modelValue = parameter[bodyParameter.key];
                        bodyParameter.originType = '2';
                    });
                }
                apiReqQuery.forEach(reqQuery => {
                    if (paramKeys.includes(reqQuery.key)) {
                        reqQuery.modelValue = parameter[paramKeys];
                        reqQuery.originType = '2';
                    }
                });
            }
            let page = component.$store.getters['commonController/activePage'];
            component.$store.dispatch(page + '/apiHandler', {
                col: component._props.record,
                apiBasic: copyApiBasic,
                action: 'runtime',
            });
        } else {
            console.warn('Sorry, current component not bind a API !');
        }
    } catch (e) {
        console.error(e);
    }
};
if (window) {
    window.getVariableByKey = getGlobalVariableByKey;
    window.setVariable = setGlobalVariable;
    window.delVariableByKey = delGlobalVariable;
    window.ApiCall = ApiCall;
}

const TDP_UID_MAGIC_V10 = { magic: 'TDP.UID.V10', paddingLength: 24 };
/**
 * Encrypt data
 * @param The plaintext to be encrypted
 * @return The encrypted data in string
 */
export const encryptData = function (data) {
    //In development or Test mode, return the plaintext.
    if (process.env.DEVELOPMENT || process.env.TEST) return data;

    const PADDING = 'QmFkIGZvcm1hdCFEYW5nZXIh';
    let encrypted = '' + CryptoJS.TripleDES.encrypt(data, PADDING + TDP_UID_MAGIC_V10.magic);
    return TDP_UID_MAGIC_V10.magic + PADDING + encrypted;
};

/**
 * Decrypt data that has been encrypted by the encryptData function
 * @param The encrypted data returned by the encryptData function
 * @return The plaintext in utf8
 */
export const decryptData = function (data) {
    if (data.startsWith(TDP_UID_MAGIC_V10.magic)) {
        let padding = data.substr(TDP_UID_MAGIC_V10.magic.length, TDP_UID_MAGIC_V10.paddingLength);
        let descrypted = CryptoJS.TripleDES.decrypt(
            data.substring(TDP_UID_MAGIC_V10.magic.length + TDP_UID_MAGIC_V10.paddingLength),
            padding + TDP_UID_MAGIC_V10.magic
        );
        return descrypted.toString(CryptoJS.enc.Utf8);
    } else {
        return data;
    }
};

function updateLocaleResourceForPage(appJson, changedJson, pageID) {
    let localeArray = appJson[0].appLocaleResource;
    let changedArray = changedJson[0].appLocaleResource;
    for (let index = 0; index < localeArray.length; index++) {
        let chanedIdx = changedArray.findIndex(obj => obj.name == localeArray[index].name);
        if (chanedIdx >= 0) {
            localeArray[index].app[pageID] = changedArray[chanedIdx].app[pageID];
        }
    }
}

function appendNewResource(appJson, changedJson) {
    let localeArray = appJson[0].appLocaleResource;
    let changedArray = changedJson[0].appLocaleResource;
    for (let index = 0; index < changedArray.length; index++) {
        let foundIdx = localeArray.findIndex(obj => obj.name == changedArray[index].name);
        if (foundIdx < 0) {
            localeArray.push(changedArray[index]);
        }
    }
}

export const mergeAppJson = function (appJson, jsonToSave) {
    let pagesToSave = [];
    jsonToSave.forEach(obj => {
        //page object
        if (obj.id) {
            pagesToSave.push(obj);
        }
    });

    //update pages include locale resource
    for (let index = 0; index < appJson.length; index++) {
        let pageID = appJson[index].id;
        let findIdx = -1;
        if (pageID && (findIdx = pagesToSave.findIndex(obj => obj && obj.id == pageID)) >= 0) {
            console.log(appJson[index].id);
            appJson[index] = pagesToSave[findIdx];
            delete pagesToSave[findIdx];
            updateLocaleResourceForPage(appJson, jsonToSave, pageID);
        }
    }

    //append new pages
    pagesToSave.forEach(obj => {
        if (obj) {
            appJson.splice(appJson.lastIndex, 0, obj);
            updateLocaleResourceForPage(appJson, jsonToSave, obj.id);
        }
    });

    //append new Locale resource
    appendNewResource(appJson, jsonToSave);

    return appJson;
};

export const dateFormatter = function (time) {
    if (time.length == 13) {
        time = Number(time);
        return new Date(time).toLocaleString();
    } else {
        return new Date(time).toLocaleDateString();
    }
};
