const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Search books by name, category, or author
router.get('/', async(req, res) => {
    const { search = '', category = '', author = '' } = req.query;

    try {
        // Build the query object
        const query = {
            name: new RegExp(search, 'i'), // Case-insensitive search for book names
            ...(category && { category_id: category }), // Filter by category_id if provided
            ...(author && { author_id: author }) // Filter by author_id if provided
        };

        // Find books with the specified query
        const books = await Book.find(query)
            .populate('category_id', 'name') // Populate the 'name' field of the category
            .populate('author_id', 'name'); // Populate the 'name' field of the author

        // Log the response to check the data format
        console.log('Books response:', books);

        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single book by ID
router.get('/:id', async(req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('category_id', 'name') // Populate the 'name' field of the category
            .populate('author_id', 'name'); // Populate the 'name' field of the author

        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new book (admin only)
router.post('/', authenticateToken, authorizeAdmin, async(req, res) => {
    const { name, photo, category_id, author_id } = req.body;

    if (!name || !category_id || !author_id) {
        return res.status(400).json({ message: 'Name, category_id, and author_id are required' });
    }

    try {
        const newBook = new Book({ name, photo, category_id, author_id });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a book (admin only)
router.delete('/:id', authenticateToken, authorizeAdmin, async(req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;