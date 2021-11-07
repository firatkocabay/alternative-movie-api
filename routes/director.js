const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Director = require('../models/Director');

router.post('/', (req, res) => {
  const director = new Director(req.body);
  const createdDirectorPromise = director.save();
  createdDirectorPromise.then((data) => {
    res.json({status: 200, message: 'Created new director.'});
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/', (req, res) => {
  const searchDirectorPromise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind : {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id : '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id : '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }
  ]);
  searchDirectorPromise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:directorId', (req, res) => {
  const searchDirectorPromise = Director.aggregate([
    {
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.directorId)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind : {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id : '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id : '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      }
    }
  ]);
  searchDirectorPromise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
