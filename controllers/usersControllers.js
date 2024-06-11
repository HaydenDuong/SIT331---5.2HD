const User = require('../models/users');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Function that create a new user and add this user to the database
exports.createUser = async (req, res) => {
    try 
    {
        const { _id, name, email, password, role } = req.body;
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ _id, name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).send({ user: newUser, message: 'User successfully created!' });
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error creating user", error: error.message });
    }
};

// Authenticate user based on login information
// Return Jwt upon successfully logged in
exports.loginUser = async (req, res) => {
    try 
    {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user)
        {
            return res.status(401).send({ message: "Invalid email." });
        }

        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword)
        {
            return res.status(401).send({ message: "Wrong password." });
        }
        
        // Issue the JWT to the logged in user
        const token = jwt.sign(
            { id: user._id },
            "sit331-53hdqelol669",
            { expiresIn: '1h' }
        );

        // Send the JWT to the client
        res.send({ token: token, message: "Logged in successfully" });
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Authentication failed", error: error.message });
    }
};

// Function that retrieve all current registered users
exports.getAllUsers = async (req, res) => {
    try 
    {
        const usersList = await User.find();
        res.send(usersList);
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error retrieving users", error: error.message });
    }
};

// Function that only retrieve admins users
exports.getAdminUsers = async (req, res) => {
    try {
        const admins = await User.find({ role: "Admin" });

        if (admins.length === 0) 
        {
            return res.status(404).send({ message: "No admins found." });
        }

        res.send(admins);
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error retrieving admin users", error: error.message });
    }
};

// Function that only retrieve normal users
exports.getNormalUsers = async (req, res) => {
    try 
    {
        const users = await User.find({ role: "User" });

        if (users.length === 0) 
        {
            return res.status(404).send({ message: "No users found." });
        }

        res.send(users);
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error retrieving normal users", error: error.message });
    }
};

// Function that retrieve a specific user based on userId
exports.getUserById = async (req, res) => {
    try 
    {
        const user = await User.findById(req.params.userId);
        if (!user) 
        {
            return res.status(404).send({ message: "User not found" });
        }

        res.send(user);
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error retrieving user", error: error.message });
    }
};

// Function that allow updating information, excluding password, of a current registered user
exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const updateData = { ...req.body };
    delete updateData.password;  // Remove password from update data if present

    try 
    {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

        if (!updatedUser) 
        {
            return res.status(404).send({ message: "User not found" });
        }

        res.send({ user: updatedUser, message: 'User information updated successfully!' });
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error updating user", error: error.message });
    }
};

// Function that allow updating password of a current user
exports.updateUserPassword = async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;

    try 
    {
        const hashedPassword = await argon2.hash(password);
        const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

        if (!updatedUser) 
        {
            return res.status(404).send({ message: "User not found" });
        }

        res.send({ user: updatedUser, message: 'Password updated successfully!' });
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error updating password", error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try 
    {
        const result = await User.findByIdAndDelete(req.params.userId);

        if (!result) 
        {
            return res.status(404).send({ message: "User not found" });
        }

        res.send({ message: "User deleted successfully" });
    } 
    catch (error) 
    {
        res.status(500).send({ message: "Error deleting user", error: error.message });
    }
};