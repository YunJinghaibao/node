const interface = require('express').Router();
const loader = require('../../loader');

interface.get('/test', loader.get(test));
interface.post('/testo', loader.get(testo))
module.exports = interface;
