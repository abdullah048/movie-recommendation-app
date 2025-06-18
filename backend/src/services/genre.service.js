const databaseLayer = require('#utils/databaseLayer');
const Model = require('#models/genre.model');

const { create, find, count, findOne, update, bulkWrite } = databaseLayer(Model);

const updateGenresFromTMDB = async (genres = []) => {
  if (!genres.length) return;
  const bulkOps = genres.map((genre) => ({
    updateOne: {
      filter: { externalId: genre.id },
      update: {
        $set: {
          name: genre.name,
          externalId: genre.id,
        },
      },
      upsert: true,
    },
  }));

  const { result } = await bulkWrite(bulkOps);
  const { nUpserted, nMatched, nModified, writeErrors } = result;
  const summary = `
✅ Genre Sync Summary:
- Total genres processed: ${genres.length}
- Inserted (new): ${nUpserted}
- Updated (existing): ${nModified}
- Matched but unchanged: ${nMatched - nModified}
- Errors: ${writeErrors.length}

${
  writeErrors.length > 0
    ? `❌ Write Errors:\n${writeErrors.map((e) => `- ${e.errmsg}`).join('\n')}`
    : '🎉 All operations completed successfully!'
}
`;
  console.log(summary);
};

const findByExternalId = async (externalId) => {
  return findOne({ externalId });
};

const findByName = async (names = []) => {
  return find({ name: { $in: names } });
};

module.exports = {
  create,
  find,
  count,
  update,
  updateGenresFromTMDB,
  findByExternalId,
  findByName,
};
