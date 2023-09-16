import mongoose from 'mongoose'

export interface ILeague extends mongoose.Document {
  title: String
  image: String
  createdAt: Date
  updatedAt: Date
}

const LeagueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const League = mongoose.model<ILeague>('League', LeagueSchema)

export default League
