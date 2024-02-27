const { getAll, create, getOne, remove, update, setGenres } = require('../controllers/artist.controllers');
const express = require('express');

const routeArtist = express.Router();

routeArtist.route('/')
    .get(getAll)
    .post(create);

routeArtist.route('/:id/genres')
    .post(setGenres)

routeArtist.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routeArtist;