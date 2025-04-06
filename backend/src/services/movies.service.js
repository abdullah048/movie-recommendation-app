const databaseLayer = require('#utils/databaseLayer');
const Model = require('#models/movies.model');
const { findByExternalId } = require('#services/genre.service');
const config = require('#config/config');

const { find, count, updateOne } = databaseLayer(Model);

const updateMoviesFromTMDB = async (movie) => {
  if (!movie) return;

  const genres = await Promise.all(movie?.genres?.map((genre) => findByExternalId(genre.id)) || []);
  const genreIds = genres?.map((genre) => genre._id);

  const data = await updateOne(
    { externalId: movie.id },
    {
      $set: {
        name: movie.title || movie.original_title,
        externalId: movie.id,
        genres: genreIds,
        description: movie.overview,
        posterPath: `${config.apis.tmdb.imageBaseURL}/${movie.poster_path}`,
        backdropPath: `${config.apis.tmdb.imageBaseURL}/${movie.backdrop_path}`,
        releaseDate: movie.release_date,
        budget: movie.budget,
        homepageUrl: movie.homepage,
        imdbId: movie.imdb_id,
        productionCompanies: movie.production_companies,
        productionCountries: movie.production_countries,
        revenue: movie.revenue,
        runtime: movie.runtime,
        status: movie.status,
        tagline: movie.tagline,
        trailer: movie.trailer,
      },
    },
    {
      upsert: true,
    }
  );

  if (data?.ok === 1) {
    console.log('Movie appended successfully with id: ' + movie.id);
  }
};

const getPaginatedMovies = async (query) => {
  const { page, limit = 12, search } = query;
  const skip = (page - 1) * limit;

  const queryConditions = [];

  if (search) {
    queryConditions.push({ $text: { $search: search } });
  }

  const finalQuery = queryConditions.length ? { $and: queryConditions } : {};

  const projection = search ? { score: { $meta: 'textScore' } } : {};

  const [results, total] = await Promise.all([
    find(finalQuery, projection).populate({ path: 'genres', select: '_id name' }).sort('-createdAt').skip(skip).limit(limit),
    count(finalQuery),
  ]);

  return {
    movies: results,
    pagination: {
      page: +page,
      limit: +limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  updateMoviesFromTMDB,
  getPaginatedMovies,
};
