// loader的作用是用来处理动态请求，让一个请求接口对应一个该接口的处理函数
const fs = require("fs");
const globalconfig = require("./conf")

let controllerSet = [];
let pathMap = new Map();
let files = fs.readdirSync(globalconfig["web_path"]);
for(let i = 0; i < files.length; i ++){
    let temp = require("./" + globalconfig["web_path"] + "/" + files[i]);
    if(temp.path){
        for(let [k,v] of temp.path){
            if(pathMap.get(k) == null){
                pathMap.set(k, v);
            }else{
                throw new Error("url path异常，url" + k);
            }
            controllerSet.push(temp);
        }
    }
}

module.exports = pathMap;
