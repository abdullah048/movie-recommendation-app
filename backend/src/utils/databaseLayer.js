// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

/**
 * @param {mongoose.Model} Model
 * @returns
 */
module.exports = (Model) => {
  const model = Model;

  /**
   *
   * @param {*} doc
   * @returns {Promise}
   */
  const create = (doc) => model.create(doc);

  /**
   *
   * @param {mongoose.AnyObject | mongoose.AnyKeys<any>} docs
   * @param {mongoose.InsertManyOptions} options
   * @returns {Promise<mongoose.InsertManyResult>}
   */
  const insertMany = (docs, options) => model.insertMany(docs, options);

  /**
   *
   * @param {mongoose.FilterQuery<any>=} filter
   * @param {*=} projection
   * @param {mongoose.QueryOptions=} options
   * @returns {mongoose.Query<any[], any, {}, any>}
   */
  const find = (filter, projection, options) => model.find(filter, projection, options);

  /**
   *
   * @param {mongoose.FilterQuery<any>=} filter
   * @param {*=} projection
   * @param {mongoose.QueryOptions=} options
   * @returns {mongoose.Query<any, any, {}, any>}
   */
  const findOne = (filter, projection, options) => model.findOne(filter, projection, options);

  /**
   *
   * @param {mongoose.FilterQuery<any>} filter - The filter query to match documents.
   * @param {mongoose.UpdateQuery<any>} update - The update operations to be applied to the document.
   * @param {mongoose.QueryOptions=} options - Optional query options to control the behavior of the query.
   * @param {*=} projection - Optional projection to specify which fields to include or exclude.
   * @returns {mongoose.Query<any, any, {}, any>}
   */
  const findOneAndUpdate = (filter, update, options = {}, projection = null) => {
    return model.findOneAndUpdate(filter, update, { ...options, projection });
  };

  /**
   *
   * @param {*=} id
   * @param {mongoose.UpdateQuery<any>=} update
   * @param {mongoose.QueryOptions=} options
   * @returns {mongoose.Query<any, any, {}, any>}
   */
  const findById = (id, projection, options) => model.findById(id, projection, options);

  /**
   *
   * @param {*} id
   * @param {*} update
   * @param {*} options
   * @returns {mongoose.Query<any, any, {}, any>}
   */
  const update = (id, update, options = {}) =>
    model.findByIdAndUpdate(id, update, { new: true, runValidators: true, ...options });

  /**
   *
   * @param {mongoose.FilterQuery<any>} [filter]
   * @param {mongoose.UpdateWithAggregationPipeline | mongoose.UpdateQuery<any>} [update]
   * @param {mongoose.QueryOptions=} options
   * @returns {mongoose.Query<any, any, {}, any>}
   */
  const updateOne = (filter, update, options = {}) =>
    model.updateOne(filter, update, { new: true, runValidators: true, ...options });

  /**
   *
   * @param {*=} id
   * @param {mongoose.QueryOptions=} options
   * @returns {mongoose.Query<any, any, {}, any>}
   */
  const remove = (id, options) => model.findByIdAndDelete(id, options);

  /**
   *
   * @param {mongoose.FilterQuery<any>=} filter
   * @param {mongoose.QueryOptions=} options
   * @returns {mongoose.Query}
   */
  const removeMany = (filter, options) => model.deleteMany(filter, options);

  /**
   *
   * @param {mongoose.FilterQuery<any>=} filter
   * @param {mongoose.QueryOptions=} options
   * @returns {mongoose.Query<number, any, {}, any>}
   */
  const count = (filter, options) => model.countDocuments(filter, options);

  /**
   *
   * @param {mongoose.PipelineStage[]} pipeline
   * @param {mongoose.Aggregate.} options
   * @returns {mongoose.Aggregate}
   */
  const aggregate = (pipeline, options) => model.aggregate(pipeline, options);

  const updateMany = (filter, update, options = {}) => model.updateMany(filter, update, { ...options, runValidators: true });

  const bulkWrite = (writes, options) => model.bulkWrite(writes, options);
  return {
    create,
    insertMany,
    find,
    findOne,
    findById,
    update,
    updateOne,
    remove,
    removeMany,
    count,
    aggregate,
    findOneAndUpdate,
    updateMany,
    bulkWrite,
  };
};
