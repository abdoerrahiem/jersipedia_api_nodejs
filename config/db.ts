import mongoose, { ConnectOptions } from 'mongoose'

const url = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(
      url as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    )
    console.log('Database is connected')
  } catch (error: any) {
    console.log('Error database: ', error.message)
  }
}

export default connectDB
