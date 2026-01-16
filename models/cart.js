const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
});

cartSchema.methods.addToCart = function (product) {
  console.log('addToCart method called for product:', product._id);
  const cartProductIndex = this.products.findIndex(cp => {
    // Check if cp.product exists to avoid crash if bad data in DB
    return cp.product && cp.product._id.toString() === product._id.toString();
  });
  let newQuantity = 1;

  if (cartProductIndex >= 0) {
    newQuantity = this.products[cartProductIndex].quantity + 1;
    this.products[cartProductIndex].quantity = newQuantity;
  } else {
    // Store as plain object to avoid Mongoose schema conflicts
    const productData = product.toObject ? product.toObject() : product;
    this.products.push({
      product: productData,
      quantity: newQuantity
    });
  }

  this.totalPrice = this.totalPrice + product.price;

  // Explicitly tell Mongoose that the 'products' array has changed
  // This is often required for Arrays of Objects/Mixed types
  this.markModified('products');

  console.log('Saving cart. Total items:', this.products.length, 'Total Price:', this.totalPrice);
  return this.save();
};

cartSchema.methods.removeFromCart = function (productId, price) {
  const updatedProducts = this.products.filter(item => {
    if (item.product._id.toString() === productId.toString()) {
      this.totalPrice = this.totalPrice - (item.quantity * price); // reduce total price
      return false;
    }
    return true;
  });
  this.products = updatedProducts;
  // ensure no negative price
  if (this.totalPrice < 0) this.totalPrice = 0;
  return this.save();
};

cartSchema.methods.clearCart = function () {
  this.products = [];
  this.totalPrice = 0;
  return this.save();
};

module.exports = mongoose.model('Cart', cartSchema);
