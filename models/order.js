const mongoose = require('mongoose');
const productSchema = require('./product')

const orderSchema = mongoose.Schema({
    _orderid: mongoose.Schema.Types.ObjectId,
    _id: String,
    order: Array,
    total: Number,
    createdAt: Date,
    Address: String
})
module.exports = mongoose.model('Order', orderSchema);