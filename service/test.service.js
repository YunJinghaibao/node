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

const test1 = (req, fn) => {
    tempFn1 = setTimeout(() => {
        console.log('tempFn1');
    }, 1000)
    tempFn2 = setTimeout(() => {
        console.log('tempFn2');
    }, 1000)
    tempFn3 = setTimeout(() => {
        console.log('tempFn3');
    }, 1000)
    tempFn4 = setTimeout(() => {
        console.log('tempFn4');
    }, 1000)
    testDao.test1([tempFn1, tempFn2, tempFn3, tempFn4], (error, results) => {

    })
}

module.exports = {
    test,
}
