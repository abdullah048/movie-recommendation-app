const express = require('express');
const authRoute = require('#routes/v1/auth.route');
const movieRoute = require('#routes/v1/movie.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/movies',
    route: movieRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
