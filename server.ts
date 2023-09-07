import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import { notFound, errorHandler } from './middlewares/error'
import cors from 'cors'
import userRoute from './routes/userRoute'

const app: Application = express()

dotenv.config()

connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) =>
  res.json({ success: true, message: 'Welcome, JersiPedia API' })
)

app.use('/api/user', userRoute)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`))
