const testDao = require('../dao/testDao/testDao');

const test = (req, fn) => {
    let data = {};
    let p = new Promise((resolve, reject) => {
        testDao.test((results) => {
            if(req.body && results){
                console.log('开始 promise');
                console.log('------');
                console.log(results);
                resolve(results);
            }else{
                reject(new Error('查询错误'));
            }
        })
    }).then((reuslts) => {
        console.log(reuslts);
        data.res = reuslts;
    })
    // return data;
    fn(data);
}

module.exports = {
    test,
}
