const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    cloudinary_id: String
})
module.exports = mongoose.model('Category', categorySchema);