const Artists = require('../models/artists');

// Function that retrieve all registered artists
exports.getAllArtists = async (req, res) => {
    try 
    {
        const artistsList = await Artists.find();
        res.send(artistsList);
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error retrieving artists", error: error.message });
    }
};

// Function that retrieve a specific artist based on artistId
exports.getArtistById = async (req, res) => {
    try 
    {
        const artist = await Artists.findById(req.params.artistId);

        if (!artist) 
        {
            return res.status(404).send({ message: "Artist not found" });
        }

        res.send(artist);
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error retrieving artist", error: error.message });
    }
};

// Function that add a new artist to the database "artists" in mongoDB
exports.createArtist = async (req, res) => {
    const { _id, name } = req.body;

    if (!_id || !name) 
    {
        return res.status(400).send({ message: "Artist ID and name cannot be null." });
    }

    try 
    {
        const existingArtist = await Artists.findById(_id);

        if (existingArtist) 
        {
            return res.status(400).send({ message: `An artist with the ID ${_id} already exists.` });
        }

        const newArtist = new Artists(req.body);
        await newArtist.save();
        res.status(201).send(newArtist);
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error creating artist", error: error.message });
    }
};

// Function that allow updating the information of a current artist in the database
exports.updateArtist = async (req, res) => {
    const updateData = req.body;

    try 
    {
        const updatedArtist = await Artists.findByIdAndUpdate(req.params.artistId, updateData, { new: true, runValidators: true });
        
        if (!updatedArtist) 
        {
            return res.status(404).send({ message: "Artist not found" });
        }

        res.send(updatedArtist);
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error updating artist", error: error.message });
    }
};

// Function that delete a current artist from the database
exports.deleteArtist = async (req, res) => {
    try 
    {
        const result = await Artists.findByIdAndDelete(req.params.artistId);
        
        if (!result) 
        {
            return res.status(404).send({ message: "Artist not found" });
        }
        
        res.send({ message: "Artist deleted successfully" });
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error deleting artist", error: error.message });
    }
};