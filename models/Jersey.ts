import mongoose from 'mongoose'

export interface IJersey extends mongoose.Document {
  title: String
  images: String[]
  price: Number
  type: String
  weight: Number
  stock: Number
  size: String[]
  league: {
    title: String
    image: String
    _id: String
  }
  createdAt: Date
  updatedAt: Date
}

const JerseySchema = new mongoose.Schema(
  {
    league: { type: mongoose.Schema.ObjectId, ref: 'League' },
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [{ type: String, required: true }],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    size: {
      type: [{ type: String, required: true }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Jersey = mongoose.model<IJersey>('Jersey', JerseySchema)

export default Jersey
