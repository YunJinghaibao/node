const interface = require('express').Router();
const { loader } = require('../../loader');

interface.get('/test', loader('test').get(test));
interface.post('/testo', loader('test').get(testo));
interface.get('/test1', loader('test').get(test1));
interface.get('/test2', loader('test').get(test2));


module.exports = interface;
