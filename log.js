let fs = require("fs");
let globalConfig = require("./conf");
let time = require('./util/date');

function serviceLog(txt){
    let logName = globalConfig.log_path + '/' + 'serviceLog.log';
    let data = txt + ' ' +'时间为：' + time.logTime() + '\r\n';
    fs.writeFile(logName, data, {flag : 'a'}, function(){});
};
function productLog(txt){
    let logName = globalConfig.log_path + '/' + 'productLog.log';
    let data = txt + ' ' +'时间为：' + time.logTime() + '\r\n';
    fs.writeFile(logName, data, {flag : 'a'}, function(){});
}

const test = (txt) => {
    let logName = globalConfig.log_path + '/' + 'test.log';
    let data = txt + ' ' +'时间为：' + time.logTime() + '\r\n';
    fs.writeFile(logName, data, {flag : 'a'}, function(){});
}

const dao = (error) => {
    let logName = globalConfig.log_path + '/' + 'dao.log';
    let data = error + ' ' +'时间为：' + time.logTime() + '\r\n';
    fs.writeFile(logName, data, {flag : 'a'}, function(){});
}

module.exports = {
    serviceLog : serviceLog,
    productLog : productLog,
    test,
    dao,
}
