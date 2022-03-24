/* eslint-disable */
import tabsPropsGetters from './compPropsData/tabsPropsDataUtil';
import drawerPropsGetters from './compPropsData/drawerPropsDataUtil';

/**
 * 属性生成器
 * @param 属性集合 attrsObj
 * @returns
 */
const propsGenerator = (attrsObj, getAttrsList) => {
    return function () {
        const result = {};
        if (attrsObj) {
            getAttrsList.forEach(attrName => {
                const attrValue = propsGetters[attrName]
                    ? propsGetters[attrName](attrsObj)
                    : undefined;
                if (attrValue !== undefined || attrValue !== '') {
                    result[attrName] = attrValue;
                }
            });
        }
        return result;
    };
};

/**
 * 各个属性getter方法
 */
const propsGetters = {
    borderRadius: attrsObj => {
        const allAttrs = attrsObj || {};
        const borderRadius = allAttrs['border-radius'] || {};
        if (borderRadius.value) {
            return borderRadius.value + 'px';
        } else {
            return '';
        }
    },
    borderStyle: attrsObj => {
        const allAttrs = attrsObj || {};
        const borderStyle = allAttrs['border-style'] || {};
        return borderStyle.value || '';
    },
    borderColor: attrsObj => {
        const allAttrs = attrsObj || {};
        const borderColor = allAttrs['border-color'] || {};
        return borderColor.value || '';
    },
    borderWidth: attrsObj => {
        const allAttrs = attrsObj || {};
        const borderWidth = allAttrs['border-width'] || {};
        return borderWidth.value ? `${borderWidth.value}px` : '';
    },
    backgroundColor: attrsObj => {
        const allAttrs = attrsObj || {};
        const backgroundColor = allAttrs['bgcolor'] || {};
        return backgroundColor.value || '';
    },
    margin: attrsObj => {
        const allAttrs = attrsObj || {};
        const marginPadding = allAttrs['margin-padding'] || {};
        const margin = marginPadding.value && marginPadding.value.margin;
        if (margin && margin.length) {
            return margin.map(c => `${c}px`).join(' ');
        } else {
            return '';
        }
    },
    padding: attrsObj => {
        const allAttrs = attrsObj || {};
        const marginPadding = allAttrs['margin-padding'] || {};
        const padding = marginPadding.value && marginPadding.value.padding;
        if (padding && padding.length) {
            return padding.map(c => `${c}px`).join(' ');
        } else {
            return '';
        }
    },
    compAlign: attrsObj => {
        const allAttrs = attrsObj || {};
        const compAlign = allAttrs['comp-align'] || {};
        return compAlign.value || '';
    },
    selectOptions: attrsObj => {
        const allAttrs = attrsObj || {};
        const selectOptions = allAttrs['select-options'] && allAttrs['select-options'].value;
        return selectOptions || [];
    },
    ...tabsPropsGetters,
    ...drawerPropsGetters,
};

/**
 *
 * @param {string} key 组件唯一id
 * @param {Array[className]} classNameList ['.tabs', '.tabs .v-tab'] 要添加几个class名
 * @param {Array[cssObject]} cssBodyList [{position: 'relative'}, {backgroundColor: '#000'}] 根据下标分别对应class
 * @returns
 */
const createDynamicClass = (key, classNameList, cssBodyList) => {
    const head = document.getElementsByTagName('head')[0];
    if (!head) return false;

    const styleKey = 'style_' + key;
    let style = document.getElementById(styleKey);
    if (!style) {
        style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.setAttribute('id', styleKey);
        head.appendChild(style);
    }
    let cssText = '';
    classNameList.forEach((c, i) => {
        cssText += c + '' + object2cssText(cssBodyList[i]) + '\r';
    });
    style.innerText = cssText;
};

const object2cssText = object => {
    const body = document.body;
    const puppetElementId = 'tdp___puppetElement';
    let puppetElement = document.getElementById(puppetElementId);
    if (!puppetElement) {
        puppetElement = document.createElement('div');
        puppetElement.setAttribute('id', puppetElementId);
        puppetElement.setAttribute('style', 'display: none; width: 0; height: 0;');
        body.appendChild(puppetElement);
    }
    let result = '{';
    const regx = /[A-Z]/;
    for (let k in object) {
        if (puppetElement.style.hasOwnProperty(k) && object[k]) {
            result += `${k.replace(regx, word => '-' + word.toLocaleLowerCase())}: ${object[k]};`;
        }
    }
    result += '}';
    return result;
};

export default propsGenerator;

export { propsGenerator, propsGetters, createDynamicClass, object2cssText };
