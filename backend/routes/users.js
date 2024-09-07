const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single user by ID (admin only)
router.get('/:id', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new user (admin only)
router.post('/', authenticateToken, authorizeAdmin, async(req, res) => {
    const { username, password, email, isAdmin } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, isAdmin });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a user (admin only)
router.delete('/:id', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;