const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');
const Category = require('../models/Category');

// Get popular books
router.get('/books', async(req, res) => {
    try {
        const books = await Book.find().sort({ rating: -1 }).limit(5).populate('author_id').populate('category_id');
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get popular authors
router.get('/authors', async(req, res) => {
    try {
        const authors = await Author.find().sort({ 'books.length': -1 }).limit(5);
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get popular categories
router.get('/categories', async(req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;