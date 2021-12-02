const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _orderid: mongoose.Schema.Types.ObjectId,
    _id: String,
    _productid: Array,
    color: String,
    weight: Number,
    quantity: Number,
});

module.exports = mongoose.model('Order', orderSchema);