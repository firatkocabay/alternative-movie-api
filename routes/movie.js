const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();

router.post('/', (req, res, next) => {
  const movie = new Movie(req.body);
  const promise = movie.save();
  promise.then((data) => {
    res.json({status: 200, message: 'Created new movie.'});
  }).catch((err) => {
    res.json(err)
  });
});

router.get('/', (req, res) => {
  const allMoviesPromise = Movie.find({});
  allMoviesPromise.then((movies) => {
    res.json(movies);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id', (req, res, next) => {
  const movieById = Movie.findById(req.params.movie_id);
  movieById.then((movie) => {
    if (!movie)
      return res.send({ message: 'This movie was not found.', code: 99 });
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/:movie_id', (req, res, next) => {
  const movieById = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    { 
      new: true
    });+
  movieById.then((movie) => {
    if (!movie)
      return res.send({ message: 'This movie was not found.', code: 99 });
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:movie_id', (req, res) => {
  const movieByIdPromise = Movie.findByIdAndRemove(req.params.movie_id);+
  movieByIdPromise.then((movie) => {
    if (!movie)
      return res.send({ message: 'This movie was not found.', code: 99 });
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/top/:limit', (req, res) => {
  const topNMoviesPromise = Movie.find({}).limit(req.params.limit).sort({ imdbScore : -1 });
  topNMoviesPromise.then((movies) => {
    res.json(movies);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/between/:startYear/:endYear', (req, res) => {
  const { startYear, endYear } = req.params;
  const betweenGivenYearsMoviesPromise = Movie.find(
    {
      year: { 
        '$gte': parseInt(startYear), 
        '$lte': parseInt(endYear)
      }
    }
  );
  betweenGivenYearsMoviesPromise.then((movies) => {
    res.json(movies);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
