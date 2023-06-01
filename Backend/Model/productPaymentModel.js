import mongoose from 'mongoose';

const productPaymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const ProductPayment = mongoose.model('product_payment', productPaymentSchema);

export default ProductPayment;