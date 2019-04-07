'use strict';

const _ = require('lodash');
const request = require('request');
var express = require('express')
var router = express.Router();

var {ObjectModel, ObjectError} = require('../server/models/object');

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/', (req, res) => {
  const keys = Object.keys(req.body);
  if(keys.length == 0 || keys.length > 1) {
    return res.status(400).send({
      "code": "400",
      "errors": [],
      "userMessage": "Please enter one key-value pair.",
      "internalMessage": "None or Multiple key-value pair not supported for simplicity"
    });
  }

  const key = keys[0];
  if(typeof(key) !== 'string') {
    return res.status(400).send({
      "code": "400",
      "errors": [],
      "userMessage": "Please enter only a string key.",
      "internalMessage": "String keys are the only supported format"
    });
  }

  new ObjectModel({
    key: key,
    value: req.body[key],
    timestamp: new Date().getTime()
  }).save().then((saved_object) => {
    console.log(saved_object);
    return res.status(200).send(saved_object);
  }).catch((error) => {
    if (error instanceof ObjectError) {
        return res.status(400).send("Please check your inputs.");
    } else {
        console.log(error);
        return res.status(500).send("Something went wrong. Please contact administrator.");
    }
  });
});

router.get('/:id', (req, res) => {
  res.status(500).send('Not yet implemented');
});

module.exports = router