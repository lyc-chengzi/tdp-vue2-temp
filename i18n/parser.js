const zh = require('./zh.js');
const en = require('./en.js');
const fs = require('fs');
const path = require('path');

console.log(zh, en);

fs.writeFile(path.join('./i18n', 'zh.json'), JSON.stringify(zh), { encoding: 'utf-8' }, err => {
    if (!err) {
        console.log('zh.json重写成功!');
    } else {
        console.error('zh.json重写失败!');
    }
});

fs.writeFile(path.join('./i18n', 'en.json'), JSON.stringify(en), { encoding: 'utf-8' }, err => {
    if (!err) {
        console.log('en.json重写成功!');
    } else {
        console.error('en.json重写失败!');
    }
});
