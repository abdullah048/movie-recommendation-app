const databaseLayer = require('#utils/databaseLayer');
const Model = require('#models/genre.model');

const { create, find, count, update } = databaseLayer(Model);

module.exports = {
  create,
  find,
  count,
  update,
};
