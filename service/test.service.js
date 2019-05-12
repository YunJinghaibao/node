const testDao = require('../dao/testDao/testDao');

const test = (req, fn) => {
    new Promise((resolve, reject) => {
        testDao.test((results) => {
            if (req.body && results) {
                resolve(results);
            } else {
                reject('查询错误');
            }
        })
    }).then((reuslts) => {
        let data = {};
        data.res = reuslts;
        fn(data);
    }).catch(error => {
        fn(error, 400);
    })
}

module.exports = {
    test,
}
