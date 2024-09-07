const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Make sure dotenv is required
const app = express();
app.use(express.json());
app.use(cors());
// Route handling
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const authorRoutes = require('./routes/authors');
const categoryRoutes = require('./routes/categories');
const popularRoutes = require('./routes/popular');
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/categories', categoryRoutes);
app.use('/popular', popularRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));