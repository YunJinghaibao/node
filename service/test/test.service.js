const { NoAdaptation } = require('../util');
const testDao = require('../../dao/testDao/testDao');

const test = NoAdaptation(testDao.test);
const testo = NoAdaptation(testDao.testo);
const test1 = NoAdaptation(testDao.test1);
const test2 = NoAdaptation(testDao.test2);

module.exports = {
    test,
    testo,
    test1,
    test2,
}
