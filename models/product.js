const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    description: String,
    salestax: Number,
    category: String,
    rate: Number,
    availability: Boolean,
});

module.exports = mongoose.model('Product', productSchema);