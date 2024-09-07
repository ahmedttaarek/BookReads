const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }
});

module.exports = mongoose.model('Book', BookSchema);