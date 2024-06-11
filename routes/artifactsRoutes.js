const express = require('express');
const router = express.Router();
const artifactController = require('../controllers/artifactsControllers');
const passport = require('passport');
const { isAdmin } = require('../middleware/middleware');

// GET endpoint that retrieve all current registered artifacts
router.get('/', artifactController.getAllArtifacts);

// GET endpoint that retrieve a specify artifact based on artifactId
router.get('/:artifactId', artifactController.getArtifactById);

// POST endpoint that allow admin users add a new artifact to the database
router.post('/', passport.authenticate('jwt', {session: false}), isAdmin, artifactController.createArtifact);

// PUT endpoint that allow admin users to update a registered artifact
router.put('/:artifactId', passport.authenticate('jwt', {session: false}), isAdmin, artifactController.updateArtifact);

// DEL endpoint that allow admin users to delete a current artifact based on artifactId
router.delete('/:artifactId', passport.authenticate('jwt', {session: false}), isAdmin, artifactController.deleteArtifact);

module.exports = router;