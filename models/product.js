const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    description: String,
    image: String,
    description: String,
    category: String,
    rate: String,
    availability: Boolean,
});

module.exports = mongoose.model('Product', productSchema);