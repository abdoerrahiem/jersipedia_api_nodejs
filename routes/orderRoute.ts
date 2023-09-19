import express from 'express'
import auth from '../middlewares/auth'
import { createOrder } from '../controllers/orderController'

const router = express.Router()

router.use(auth)
router.post('/', createOrder)

export default router
