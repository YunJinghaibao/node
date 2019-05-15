const testDao = require('../dao/testDao/testDao');

const test = (req, fn) => {
    new Promise((resolve, reject) => {
        testDao.test((error ,results) => {
            if (req.body && !error) {
                resolve(results);
            } else {
                reject('查询错误');
            }
        })
    }).then((reuslts) => {
        fn(reuslts);
    }).catch(error => {
        fn(error, 400);
    })
}
module.exports = {
    test,
}
