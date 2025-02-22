const { toJSON } = require('./plugins/toJSON.plugin');
const { Schema, createModel } = require('#utils/mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  externalId: {
    type: Number,
    required: true,
  },
});

schema.plugin(toJSON);

const model = createModel('genres', schema);

module.exports = model;
