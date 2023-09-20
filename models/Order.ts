import mongoose from 'mongoose'

export interface IOrderCart extends mongoose.Document {
  jerseyId: String
  jerseyImage: String
  jerseyTitle: String
  jerseyPrice: Number
  amount: Number
  total: Number
}

export interface IOrder extends mongoose.Document {
  user: String
  cart: IOrderCart[]
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
    cart: [
      {
        jerseyId: { type: String },
        jerseyImage: { type: String },
        jerseyTitle: { type: String },
        jerseyPrice: { type: Number },
        amount: { type: Number },
        total: { type: Number },
      },
    ],
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
    courier: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model<IOrder>('Order', OrderSchema)

export default Order
