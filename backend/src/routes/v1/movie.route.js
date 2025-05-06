const express = require('express');
const validate = require('#middlewares/validate');
const movieValidation = require('#validations/movie.validation');
const movieController = require('#controllers/movie.controller');

const router = express.Router();

router.get('/', validate(movieValidation.getMovies), movieController.getMovies);
router.get('/trending-posters', movieController.getTrendingPosters);
router.patch('/search-count', validate(movieValidation.increaseSearchCount), movieController.increaseMovieSearchCount);
router.get('/:id', validate(movieValidation.getMovie), movieController.getMovie);

module.exports = router;
