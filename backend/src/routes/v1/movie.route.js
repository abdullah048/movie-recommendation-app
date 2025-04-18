const express = require('express');
const validate = require('#middlewares/validate');
const movieValidation = require('#validations/movie.validation');
const movieController = require('#controllers/movie.controller');

const router = express.Router();

router.get('/', validate(movieValidation.getMovies), movieController.getMovies);
router.get('/:id', validate(movieValidation.getMovie), movieController.getMovie);

module.exports = router;
