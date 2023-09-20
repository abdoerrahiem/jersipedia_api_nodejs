import mongoose from 'mongoose'

export interface ICart extends mongoose.Document {
  user: String
  jersey: {
    _id: String
    league: String
    title: String
    images: String[]
    price: Number
    type: String
    weight: Number
    stock: Number
    size: String[]
  }
  league: String
  amount: Number
  size: String
  description: String
  total: Number
  createdAt: Date
  updatedAt: Date
}

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    jersey: { type: mongoose.Schema.ObjectId, ref: 'Jersey' },
    league: { type: mongoose.Schema.ObjectId, ref: 'League' },
    amount: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

const Cart = mongoose.model<ICart>('Cart', CartSchema)

export default Cart
