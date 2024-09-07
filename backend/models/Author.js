const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: { type: String, required: true },
    photo: { type: String },
    dateOfBirth: { type: Date }
});

module.exports = mongoose.model('Author', authorSchema);