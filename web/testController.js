const testDao = require('../dao/testDao/testDao');
let path = new Map();

test = (req, res) => {
    testDao.test((results) => {
        res.send(results);
    })
}
testo = (req, res) => {
    testDao.test((results) => {
        res.header('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        if (req.body.name == 'haibao' && req.body.age == 1) {
            res.send(results);
        } else {
            res.send('error');
        }
    })
}

path.set(test, test);
path.set(testo, testo);

module.exports.path = path;