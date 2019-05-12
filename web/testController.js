const testDao = require('../dao/testDao/testDao');
const testService = require('../service/test.service');
let path = new Map();

test = (req, res) => {
    testDao.test((results) => {
        res.send(results);
    })
}
testo = (req, res) => {
    testService.test(req, (results, status) => {
        if(status){
            res.status(status).send(results)
        } else{
            res.status(200).send(results);
        }
    })
}

path.set(test, test);
path.set(testo, testo);

module.exports.path = path;
