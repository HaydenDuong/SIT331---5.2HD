const mongoose = require('mongoose');

const artifactsSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    year_of_creation: Number,
    medium: String,
    art_type: String,
    year_of_creation: Number,
    description: String,
    artist_id: String
});

const Artifacts = mongoose.model('Artifacts', artifactsSchema);
module.exports = Artifacts;