'use strict';

const _ = require('lodash');
const request = require('request');
var express = require('express')
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/', (req, res) => {
  res.status(500).send('Not yet implemented');
});

router.get('/:id', (req, res) => {
  res.status(500).send('Not yet implemented');
});

module.exports = router