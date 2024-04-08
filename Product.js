const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;