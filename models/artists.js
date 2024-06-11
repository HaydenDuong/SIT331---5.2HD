const mongoose = require('mongoose');

const artistsSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true
    },

    biography: String,
    year_of_birth: Number,
    art_styles: String,
    artifact_id: String
});

const Artists = mongoose.model('Artists', artistsSchema);
module.exports = Artists;