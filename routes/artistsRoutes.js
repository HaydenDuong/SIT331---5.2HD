const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistsControllers');
const passport = require('passport');
const { isAdmin } = require('../middleware/middleware');

// GET endpoint that retrieve all current users
router.get('/', artistController.getAllArtists);

// GET endpoint that retrieve a registered artist by artistId
router.get('/:artistId', artistController.getArtistById);

// POST endpoint that allow admin users add a new artist to the database
router.post('/', passport.authenticate('jwt', {session: false}), isAdmin, artistController.createArtist);

// PUT endpoint that allow admin users to update a registered artists
router.put('/:artistId', passport.authenticate('jwt', {session: false}), isAdmin, artistController.updateArtist);

// DEL endpoint that allow admin users to delete a current artists based on artistId
router.delete('/:artistId', passport.authenticate('jwt', {session: false}), isAdmin, artistController.deleteArtist);

module.exports = router;