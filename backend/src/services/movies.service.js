const databaseLayer = require('#utils/databaseLayer');
const Model = require('#models/movies.model');
const { findByExternalId, findByName } = require('#services/genre.service');
const config = require('#config/config');
const ApiError = require('#utils/ApiError');
const httpStatus = require('http-status');
const { jobsQueue } = require('#queues/job.queue');
const tmdbApi = require('#apis/tmdb.api');
const { getHomepageBuckets } = require('#utils/dailyBuckets');
const moment = require('moment');

const { find, count, updateOne, findById, aggregate, removeMany } = databaseLayer(Model);

const findMovieById = async (movieId) => {
  return findById(movieId).populate('genres', 'name');
};

const findMoviesPosterPathByViewCount = async (limit = 6) => {
  return find({}, 'posterPath', {
    sort: '-viewCount',
    limit,
  });
};

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
  const { page = 1, limit = 12, search } = query;
  const skip = (page - 1) * limit;

  // If no search term, show homepage data instead
  if (!search) {
    const homepageData = await getHomepageMovies();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = homepageData.slice(startIndex, endIndex);

    return {
      movies: paginatedData,
      pagination: {
        page: +page,
        limit: +limit,
        total: homepageData.length,
        totalPages: Math.ceil(homepageData.length / limit),
      },
    };
  }

  // Build search-based DB query
  const queryConditions = [{ $text: { $search: search } }];
  const finalQuery = { $and: queryConditions };
  const projection = { score: { $meta: 'textScore' } };

  // Fetch paginated results and total count
  const [dbResults, total] = await Promise.all([
    find(finalQuery, projection)
      .populate({ path: 'genres', select: '_id name' })
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit),
    count(finalQuery),
  ]);

  // If nothing found, trigger background TMDB fetch
  if (dbResults.length === 0) {
    const result = await tmdbApi.searchMovieByName(search);
    await jobsQueue.add('addSearchedMoviesToDB', result);
  }

  return {
    movies: dbResults,
    pagination: {
      page: +page,
      limit: +limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getMovieDetail = async (params) => {
  const { id } = params;
  return await findMovieById(id);
};

const incrementMovieSearchCount = async (body) => {
  const { id } = body;
  const viewCount = 1;
  const movie = await findMovieById(id);
  if (!movie) throw new ApiError(httpStatus.NOT_FOUND, 'No movie found for provided id');
  return updateOne({ _id: id }, { $inc: { viewCount } });
};

const fetchTrendingMoviePosters = async () => {
  return findMoviesPosterPathByViewCount();
};

const getMoviesFromBucket = async (bucket) => {
  const { query = {}, sort, useSample, isGenreBased } = bucket;
  let movieQuery = { ...query };

  if (isGenreBased && query.genres) {
    const genreFilter = query.genres;
    const genreNames =
      typeof genreFilter === 'string' ? [genreFilter] : Array.isArray(genreFilter.$in) ? genreFilter.$in : [];
    const genres = await findByName(genreNames);
    const genreIds = genres.map((g) => g._id);
    movieQuery.genres = { $in: genreIds };
  }

  if (useSample) {
    return await aggregate([
      { $match: movieQuery },
      { $sample: { size: 12 } },
      {
        $lookup: {
          from: 'genres',
          localField: 'genres',
          foreignField: '_id',
          as: 'genres',
        },
      },
    ]);
  }

  return await find(movieQuery).sort(sort).limit(12).populate({ path: 'genres', select: '_id name' });
};

const getHomepageMovies = async () => {
  const moviesSet = new Map();
  const buckets = await getHomepageBuckets();
  for (const bucket of buckets) {
    const movies = await getMoviesFromBucket(bucket);
    for (const movie of movies) {
      moviesSet.set(String(movie.id), movie);
    }
  }
  const uniqueMovies = Array.from(moviesSet.values());
  return uniqueMovies;
};

const deleteFiveYearOldMovies = async (batchSize = 1000) => {
  const fiveYearsAgo = moment().subtract(5, 'years').format('YYYY-MM-DD');
  console.log(`🗓️  Deleting movies released before: ${fiveYearsAgo}`);
  const deletedResult = await removeMany({ releaseDate: { $lt: fiveYearsAgo } }, { batchSize });
  const deletedCount = deletedResult?.deletedCount || 0;
  console.log(`🗑️  Deleted ${deletedCount} movies older than 5 years.`);
  return deletedCount;
};

module.exports = {
  updateMoviesFromTMDB,
  getPaginatedMovies,
  getMovieDetail,
  incrementMovieSearchCount,
  fetchTrendingMoviePosters,
  getMoviesFromBucket,
  getHomepageMovies,
  deleteFiveYearOldMovies,
};
