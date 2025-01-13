const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
