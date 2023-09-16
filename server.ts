import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import { notFound, errorHandler } from './middlewares/error'
import cors from 'cors'
import userRoute from './routes/userRoute'
import rajaOngkirRoute from './routes/rajaOngkirRoute'
import leagueRoute from './routes/leagueRoute'
import jerseyRoute from './routes/jerseyRoute'
import connectCloudinary from './config/cloudinary'

dotenv.config()

const app: Application = express()

connectDB()
connectCloudinary()

app.use(cors())
app.use(express.json())

app.get('/', (_, res) => res.json({ success: true, message: 'JersiPedia API' }))

app.use('/api/user', userRoute)
app.use('/api/raja-ongkir', rajaOngkirRoute)
app.use('/api/league', leagueRoute)
app.use('/api/jersey', jerseyRoute)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`))

// Deployed on: https://jersipedia.cyclic.cloud
// Deploy using: https://app.cyclic.sh/#/
