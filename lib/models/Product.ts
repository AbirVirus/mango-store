import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Variety/Jat name
  description: { type: String },
  basePricePerKg: { type: Number, required: true },
  varieties: [{
    jat: { type: String, required: true },
    description: { type: String },
  }],
  sizes: [{
    label: { type: String, required: true }, // e.g., "Small", "Medium", "Premium"
    priceMultiplier: { type: Number, default: 1 }, // Multiplier for base price
  }],
  stock: { type: Number, default: 0 },
  images: [String],
  category: { type: String, enum: ['Premium', 'Standard', 'Mixed'], default: 'Standard' },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
