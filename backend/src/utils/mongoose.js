const mongoose = require('mongoose');

class Schema extends mongoose.Schema {
  /**
   *
   * @param {mongoose.SchemaDefinition} definition
   * @param {mongoose.SchemaOptions} options
   */
  constructor(definition, options = {}) {
    super(definition, { timestamps: true, ...options });
  }
}

const createModel = (...args) => {
  return mongoose.models[args[0]] || mongoose.model(...args);
};

const schemaTypes = mongoose.Schema.Types;
const types = mongoose.Types;

const connect = mongoose.connect;

module.exports = { connect, Schema, createModel, schemaTypes, types };
