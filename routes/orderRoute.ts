import express from 'express'
import auth from '../middlewares/auth'
import { createOrder, getOrders } from '../controllers/orderController'

const router = express.Router()

router.use(auth)
router.post('/', createOrder)
router.get('/', getOrders)

export default router
