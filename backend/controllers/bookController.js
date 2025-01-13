const Book = require('../models/Book');

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a book
const addBook = async (req, res) => {
    const { title, author, publicationYear } = req.body;
    try {
        const book = new Book({ title, author, publicationYear });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Borrow a book
const borrowBook = async (req, res) => {
    // Implement logic for borrowing
};

// Return a book
const returnBook = async (req, res) => {
    // Implement logic for returning
};

module.exports = { getBooks, addBook, updateBook, deleteBook, borrowBook, returnBook };
