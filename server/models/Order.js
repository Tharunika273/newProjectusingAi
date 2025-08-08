import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
    total: { type: Number, required: true },
    status: { type: String, default: 'processing' },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);