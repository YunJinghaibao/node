// loader的作用是用来处理动态请求，让一个请求接口对应一个该接口的处理函数
const fs = require("fs");
const globalconfig = require("./config")
const loader = (path) => {
    const fullPath = globalconfig["web_path"] + "/" + path;
    let files = fs.readdirSync(fullPath);
    let pathMap = new Map();
    for(let i = 0; i < files.length; i++){
        let temp = require("./" + fullPath + "/" + files[i]);
        if(temp.path){
            for(let [k,v] of temp.path){
                if(pathMap.get(k) == null){
                    pathMap.set(k, v);
                }else{
                    throw new Error("url path异常，url" + k);
                }
            }
        }
    }
    return pathMap;
}
module.exports = { loader }
