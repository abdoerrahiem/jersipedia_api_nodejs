import mongoose from 'mongoose'

export interface IOrder extends mongoose.Document {
  user: String
  cart: String
  paymentLink: String
  status: String
  estimation: String
  ongkir: Number
  total: Number
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    cart: [{ type: mongoose.Schema.ObjectId, ref: 'Cart' }],
    paymentLink: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    estimation: {
      type: String,
      required: true,
    },
    ongkir: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model<IOrder>('Order', OrderSchema)

export default Order
