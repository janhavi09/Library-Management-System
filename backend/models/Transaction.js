const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
});

module.exports = mongoose.model('Transaction', transactionSchema);
