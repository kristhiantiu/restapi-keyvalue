const newman = require('newman');

// call newman.run to pass `options` object and wait for callback
newman.run({
  collection: require('./apikeyvaluetest.postman_collection.json'),
  environment: require('./apikeyvaluenv.postman_environment.json'),
  reporters: 'cli'
}, function (err) {
if (err) { throw err; }
  console.log('collection run complete!');
});