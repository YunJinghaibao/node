const testDao = require('../dao/testDao/testDao');
let path = new Map();

test = (req, res) => {
    testDao.test((results) => {
        res.send(results);
    })
}
testo = (req, res) => {
    console.log('111');
    console.log(req.body[0]);
    testDao.test((results) => {
        res.send(results);
    })
}

path.set(test, test);
path.set(testo, testo);

module.exports.path = path;
