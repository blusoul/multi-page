var template = require('../tpl/banner.pug');

var data = {
    title: '这是广告位啦~',
    imgList: []
};
var bannerHtml = template(data);

document.getElementById('banner').innerHTML = bannerHtml;