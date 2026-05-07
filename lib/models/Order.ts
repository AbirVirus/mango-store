import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: {
      district: { type: String, required: true },
      area: { type: String, required: true },
      fullAddress: { type: String, required: true },
    },
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    variety: { type: String, required: true }, // Jat
    size: { type: String, required: true },
    weight: { type: Number, required: true }, // in kg
    pricePerKg: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['bKash', 'Nagad', 'Rocket', 'COD'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  customNotes: { type: String },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
