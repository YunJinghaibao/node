const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
const multer = require('multer');

const color = require('colors');

const config = require('./config');
const log = require('./log');
const interface = require('./interface')

const app = new express();
// app.use(history({})); // vue路由为history模式需配置
// app.use(multer());// 多文件上传配置
app.use(bodyParser.json());// 解析 application/json
app.use(bodyParser.urlencoded({ extended: true }));// 解析 application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static('./page'));
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Method', 'GET,POST');
    res.header('Access-Control-Allow-headers', 'Content-Type, Origin, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('X-Powered-By', 'wudixingyunxing');
    if(req.method === 'OPTIONS'){
        res.send('OPTIONS');
    }else{
        // console.log(new Date().toLocaleString());
        // console.log('query：'); // get请求参数
        // console.log(req.query);
        // console.log('body：');// post请求参数
        // console.log(req.body);
        next();
    }
});
interface(app);//接口文件统一分配
app.listen(config.port, () => {
    // console.log(`
    //     ${' 测试测试测试测试 '.black.bgBlue}
    // `)
    console.log(`
        ${'Sever is running at:'.black.bgGreen} ${'192.168.31.30:'.bgBlue.black + config.port.bgBlue.black}
    `)
});
