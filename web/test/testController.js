const { controllerCreator } = require('../util');
const testService = require('../../service/test/test.service');

let path = new Map();

test = controllerCreator(testService.test);
testo = controllerCreator(testService.testo);
test1 = controllerCreator(testService.test1);
test2 = controllerCreator(testService.test2);

path.set(test, test);
path.set(testo, testo);
path.set(test1, test1);
path.set(test2, test2);

module.exports.path = path;
