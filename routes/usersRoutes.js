const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');
const passport = require('passport');
const { isAdmin } = require('../middleware/middleware');

// GET endpoint to get all current users
router.get('/', userController.getAllUsers);

// GET endpoint to get all current admin users
router.get('/admins', userController.getAdminUsers);

// GET enpoint to get all current normal users
router.get('/users', userController.getNormalUsers);

// GET enpoint to get a specify user by on userId
router.get('/:userId', userController.getUserById);

// POST endpoint to create a new user
router.post('/', userController.createUser);

// POST endpoint to authenticate a user
router.post('/login', userController.loginUser);

// PUT endpoint to update info of a current user based on userId without changing the password
router.put('/:userId', passport.authenticate('jwt', {session: false }), isAdmin, userController.updateUser);

// PUT endpoint to update the current password of a user based on userId
router.put('/:userId/password', passport.authenticate('jwt', {session: false}), isAdmin, userController.updateUserPassword);

// DEL endpoint to delete a current user based on userId
router.delete('/:userId', passport.authenticate('jwt', { session: false}), isAdmin, userController.deleteUser);

module.exports = router;