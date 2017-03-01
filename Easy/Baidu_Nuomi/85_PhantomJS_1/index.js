/**
 * Created by Liming on 2017/3/1.
 */
"use strict";
//设置编码
phantom.outputEncoding = 'GB18030';
//引入包
var page = require('webpage').create(),
    system = require('system');

//判断参数
if(system.args.length === 1) {
    console.log('请指定一个或多个关键词作为参数！');
    phantom.exit();
}

//开始计时
var _time = Date.now();

//加载参数
var arg = system.args;
arg.shift();
arg = arg.join(' ');

//处理页面
function processPage() {
    //处理相对链接
    var processLink = function (link, page_link) {
        if(link.substr(0, 8) === 'https://' || link.substr(0, 7) === 'http://') {
            return link;
        } else if(link.substr(0, 2) === '//') {
            return page_link.substr(0, page_link.indexOf('//')) + link;
        } else if(link.substr(0, 1) === '/') {
            return page_link.substr(0, page_link.indexOf('/', 8)) + link;
        }
        var index;
        index = page_link.lastIndexOf('?');
        index > 0 && (page_link = page_link.substr(0, index));
        index = page_link.lastIndexOf('#');
        index > 0 && (page_link = page_link.substr(0, index));
        page_link = page_link.substr(0, page_link.lastIndexOf('/') + 1);
        return page_link + link;
    };

    var json = {
        code: 0,
        msg: '',
        word: '',
        time: 0,
        dataList: []
    };
    try {
        var containers = document.querySelectorAll('.c-container');
        for(var i = 0; i < containers.length; ++i) {
            var container = containers[i];
            var data = {}, dom;
            //标题 title
            dom = container.querySelector('a');
            data.title = dom.innerText;
            //链接 link
            data.link = processLink(dom.href);
            //摘要 info
            dom = container.querySelector('.c-abstract') || container.querySelector('.c-span-last p:first-child');
            dom && (data.info = dom.innerText);
            //缩略图 pic
            dom = container.querySelector('img.c-img6');
            dom && (data.pic = processLink(dom.src));
            json.dataList.push(data);
        }
        json.code = 1;  //成功状态码
        json.msg = '抓取成功';  //成功状态信息
    } catch(e) {
        json.msg = e.message;  //异常信息
    }
    return json;
}

//加载页面
page.open('https://www.baidu.com/s?ie=GBK&wd=' + encodeURI(arg), function(status) {
    var json;
    if(status === 'success') {
        //处理页面
        json = page.evaluate(processPage);
    } else {
        json = {
            code: 0,
            msg: '页面加载失败！',
        };
    }
    //追加数据
    json.word = arg;  //搜索关键字
    json.time = Date.now() - _time;  //处理时间
    //输出结果
    console.log(JSON.stringify(json, null, 4));
    //退出
    phantom.exit();
});
