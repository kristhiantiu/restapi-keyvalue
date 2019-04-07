const _ = require('lodash');
var mongoose = require('mongoose');

class ObjectError extends Error {
    constructor(message) {
      super(message);
      this.name = "ObjectError";
    }
};

var ObjectSchema = new mongoose.Schema({
  key: String,
  value: {
      type: String,
      required: true
  },
  timestamp: {
      type: Number,
      required: true
  }
});

ObjectSchema.methods.toJSON = function() {
    var caseObject = this.toObject();
    return _.pick(caseObject, ['key', 'value', 'timestamp']);
};

var ObjectModel = mongoose.model('ObjectV1', ObjectSchema);

module.exports = {
  ObjectModel,
  ObjectError
};