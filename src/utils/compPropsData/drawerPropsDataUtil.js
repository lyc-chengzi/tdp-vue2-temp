/* eslint-disable */
const drawerPropsGetters = {
    drawerShowModal: attrsObj => {
        const allAttrs = attrsObj || {};
        const prop = allAttrs['drawerShowModal'] || {};
        return prop.hasOwnProperty('value') ? prop.value : undefined;
    },
    drawerDirection: attrsObj => {
        const allAttrs = attrsObj || {};
        const prop = allAttrs['drawerDirection'] || {};
        return prop.hasOwnProperty('value') ? prop.value : undefined;
    },
    drawerSize: attrsObj => {
        const allAttrs = attrsObj || {};
        const prop = allAttrs['drawerSize'] || {};
        return prop.hasOwnProperty('value') ? prop.value : undefined;
    },
};

export default drawerPropsGetters;
