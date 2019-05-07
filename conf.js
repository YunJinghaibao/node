//conf 是用来处理配置文件server.conf的
const fs = require("fs");
let globalConfig = {};

let conf = fs.readFileSync('server.conf');
let configArr = conf.toString().split("\r\n");
for(let i = 0; i < configArr.length; i ++){
    globalConfig[configArr[i].split('=')[0]] = configArr[i].split('=')[1];
}

module.exports = globalConfig;