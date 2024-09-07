const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Book = require('../models/Book');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const mongoose = require('mongoose');

// Get all categories or search categories
router.get('/', async(req, res) => {
    const { search = '' } = req.query;

    try {
        const query = search ? { name: new RegExp(search, 'i') } : {};
        const categories = await Category.find(query);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new category (admin only)
router.post('/', authenticateToken, authorizeAdmin, async(req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a category (admin only)
router.delete('/:id', authenticateToken, authorizeAdmin, async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Category ID' });
    }

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get category details including books
router.get('/:id', async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Category ID' });
    }

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const books = await Book.find({ category_id: id }).populate('author_id', 'name');

        const categoryDetails = {
            ...category.toObject(),
            books: books.map(book => ({
                _id: book._id,
                name: book.name,
                author: book.author_id ? book.author_id.name : 'Unknown',
                photo: book.photo
            }))
        };

        res.json(categoryDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;