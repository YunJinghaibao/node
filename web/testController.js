const testDao = require('../dao/testDao/testDao');
const testService = require('../service/test.service');
let path = new Map();

test = (req, res) => {
    testDao.test((results) => {
        res.send(results);
    })
}
testo = (req, res) => {
    // testDao.test((results) => {
    //     res.send(results);
    // })
    testService.test(req, (res) => {
        res.send(res);
    })
}

path.set(test, test);
path.set(testo, testo);

module.exports.path = path;
