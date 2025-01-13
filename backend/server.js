// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/library_management';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define port
const PORT = process.env.PORT || 5000;

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactInfo: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true }
});

const User = mongoose.model('User', userSchema);

// Book Schema & Model
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  availability: { type: Boolean, default: true }
});

const Book = mongoose.model('Book', bookSchema);

// Transaction Schema & Model (for Borrow/Return)
const transactionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ['borrow', 'return'], required: true },
  date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Middleware to authenticate token and authorize admin or user
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
}

// Example API endpoint to add a book
app.post('/api/books', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    const { title, author, publicationYear } = req.body;
    const newBook = new Book({ title, author, publicationYear });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error });
  }
});

// Example API endpoint to get all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// Example API endpoint to borrow a book
app.put('/api/books/borrow/:id', authenticateToken, async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (!book.availability) return res.status(400).json({ message: 'Book already borrowed' });

    book.availability = false;
    await book.save();
    await Transaction.create({ bookId, userId: req.user._id, action: 'borrow' });

    res.status(200).json({ message: 'Book borrowed successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error borrowing book', error });
  }
});

// Example API endpoint to return a book
app.put('/api/books/return/:id', authenticateToken, async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.availability) return res.status(400).json({ message: 'Book already returned' });

    book.availability = true;
    await book.save();
    await Transaction.create({ bookId, userId: req.user._id, action: 'return' });

    res.status(200).json({ message: 'Book returned successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error });
  }
});

// Authentication endpoint for login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { name, role } = req.body;
    const user = await User.findOne({ name, role });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
