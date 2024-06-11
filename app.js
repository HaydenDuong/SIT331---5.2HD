const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport');

// Importing routes
const artistsRoutes = require('./routes/artistsRoutes');
const artifactsRoutes = require('./routes/artifactsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://HaydenYeung:qelol669@sit233.zmy2qc7.mongodb.net/SIT331-ARTGallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

app.use(express.json());

// Initialize Passport middleware
app.use(passport.initialize());

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/artists', artistsRoutes);
app.use('/artifacts', artifactsRoutes);
app.use('/users', usersRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});