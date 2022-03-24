import cloneDeep from 'lodash/cloneDeep';

export function addFieldsInAPI(resBody, apiInfo) {
    if (apiInfo.path.endWith('/v1/tw/search')) {
        var imageSrc = cloneDeep(resBody[2].children[4].children[0].children[8]);
        imageSrc.key = imageSrc.label = imageSrc.name = imageSrc.value = 'ImageSrc';
        imageSrc.type = 'string';
        resBody[2].children[4].children[0].children.push(imageSrc);
    }
    return resBody;
}

export default {
    addFieldsInAPI,
};
