const Artifacts = require('../models/artifacts');

// Function that retrieve all registered artifacts
exports.getAllArtifacts = async (req, res) => {
    try {
        const artifactsList = await Artifacts.find();
        res.send(artifactsList);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving artifacts", error: error.message });
    }
};

// Function that retrieve a specific artifact by artifactId
exports.getArtifactById = async (req, res) => {
    try {
        const artifact = await Artifacts.findById(req.params.artifactId);
        if (!artifact) {
            return res.status(404).send({ message: "Artifact not found" });
        }
        res.send(artifact);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving artifact", error: error.message });
    }
};

// Function for adding a new artifact to the database
exports.createArtifact = async (req, res) => {
    const { _id, title } = req.body;
    if (!_id || !title) {
        return res.status(400).send({ message: "Artifact ID and title cannot be null." });
    }
    try {
        const existingArtifact = await Artifacts.findById(_id);
        if (existingArtifact) {
            return res.status(400).send({ message: `An artifact with the ID ${_id} already exists.` });
        }
        const newArtifact = new Artifacts(req.body);
        await newArtifact.save();
        res.status(201).send(newArtifact);
    } catch (error) {
        res.status(500).send({ message: "Error creating artifact", error: error.message });
    }
};

// Function for updating the information of a registered artifact
exports.updateArtifact = async (req, res) => {
    const updateData = req.body;
    try {
        const updatedArtifact = await Artifacts.findByIdAndUpdate(req.params.artifactId, updateData, { new: true, runValidators: true });
        if (!updatedArtifact) {
            return res.status(404).send({ message: "Artifact not found" });
        }
        res.send(updatedArtifact);
    } catch (error) {
        res.status(500).send({ message: "Error updating artifact", error: error.message });
    }
};

// Function that deleting a registered artifact
exports.deleteArtifact = async (req, res) => {
    try {
        const result = await Artifacts.findByIdAndDelete(req.params.artifactId);
        if (!result) {
            return res.status(404).send({ message: "Artifact not found" });
        }
        res.send({ message: "Artifact deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting artifact", error: error.message });
    }
};