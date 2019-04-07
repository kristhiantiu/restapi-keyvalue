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


router.get('/:mykey', (req, res) => {
  const mykey = req.params.mykey;
  const wanted_tstamp = _.get(req.query, 'timestamp');
  let pipeline = [{ $match : { key : mykey } }];
  if(wanted_tstamp) {
    const wanted_tstamp_nmber = Number(wanted_tstamp);
    if(isNaN(wanted_tstamp_nmber)){
      return res.status(400).send({
        "code": "400",
        "errors": [],
        "userMessage": "Please enter a valid timestamp.",
        "internalMessage": "Timestamp in UTC and in milliseconds."
      });
    }
    // With timestamp, check key vs the nearest timestamp query
    pipeline.push({
      $project : { key: 1, value: 1,
        difference : {
          $abs : {
            $subtract : [wanted_tstamp_nmber, "$timestamp"]
          }
        }
      }
    });
    pipeline.push({ $sort : {difference : 1} });
  } else {
    // No timestamp, only check key vs the latest entered value
    pipeline.push({ $project : { key: 1, value: 1, timestamp: 1}});
    pipeline.push({ $sort : {timestamp : -1} });
  }
  pipeline.push({ $limit : 1 });

  ObjectModel.aggregate(pipeline).exec((err, result) => {
    if(err) {
      return res.status(500).send('Not yet implemented');
    }
    if(result.length > 0) {
      return res.status(200).send({
        [result[0].key]: result[0].value
      });
    } else {
      return res.status(404).send('Can not find resource.');
    }
  });
});

module.exports = router