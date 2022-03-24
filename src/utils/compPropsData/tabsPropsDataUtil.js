/* eslint-disable */
const tabsPropsGetters = {
    tabsCenter: attrsObj => {
        const allAttrs = attrsObj || {};
        const tabsCenter = allAttrs['tabsCenter'] || {};
        return tabsCenter.hasOwnProperty('value') ? tabsCenter.value : undefined;
    },
    tabsRight: attrsObj => {
        const allAttrs = attrsObj || {};
        const tabsRight = allAttrs['tabsRight'] || {};
        return tabsRight.hasOwnProperty('value') ? tabsRight.value : undefined;
    },
    tabsCentered: attrsObj => {
        const allAttrs = attrsObj || {};
        const tabsCentered = allAttrs['tabsCentered'] || {};
        return tabsCentered.hasOwnProperty('value') ? tabsCentered.value : undefined;
    },
    tabsVertical: attrsObj => {
        const allAttrs = attrsObj || {};
        const tabsVertical = allAttrs['tabsVertical'] || {};
        return tabsVertical.hasOwnProperty('value') ? tabsVertical.value : undefined;
    },
    tabsDynamic: attrsObj => {
        const allAttrs = attrsObj || {};
        const tabsDynamic = allAttrs['tabsDynamic'] || {};
        return tabsDynamic.hasOwnProperty('value') ? tabsDynamic.value : undefined;
    },
    tabsHeadBgColor: attrsObj => {
        const allAttrs = attrsObj || {};
        const tabsHeadBgColor = allAttrs['tabsHeadBgColor'] || {};
        return tabsHeadBgColor.hasOwnProperty('value') ? tabsHeadBgColor.value : undefined;
    },
    tabsTitleColor: attrsObj => {
        const allAttrs = attrsObj || {};
        const tabsTitleColor = allAttrs['tabsTitleColor'] || {};
        return tabsTitleColor.hasOwnProperty('value') ? tabsTitleColor.value : undefined;
    },
    tabsActiveColor: attrsObj => {
        const allAttrs = attrsObj || {};
        const tabsActiveColor = allAttrs['tabsActiveColor'] || {};
        return tabsActiveColor.hasOwnProperty('value') ? tabsActiveColor.value : undefined;
    },
    tabsBodyBgColor: attrsObj => {
        const allAttrs = attrsObj || {};
        const tabsBodyBgColor = allAttrs['tabsBodyBgColor'] || {};
        return tabsBodyBgColor.hasOwnProperty('value') ? tabsBodyBgColor.value : undefined;
    },
    fontFamily: attrsObj => {
        const allAttrs = attrsObj || {};
        const fontFamily = allAttrs['font-family'] || {};
        return fontFamily.hasOwnProperty('value') ? fontFamily.value : undefined;
    },
    textSize: attrsObj => {
        const allAttrs = attrsObj || {};
        const textSize = allAttrs['textSize'] || {};
        return textSize.hasOwnProperty('value') ? textSize.value : undefined;
    },
};

export default tabsPropsGetters;
