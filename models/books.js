const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: true,
    },
    bookPrice: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Book = mongoose.model("Book", taskSchema);
module.exports = Book;