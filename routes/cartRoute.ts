import express from 'express'
import { addCart, getCart, removeCart } from '../controllers/cartController'
import auth from '../middlewares/auth'

const router = express.Router()

router.use(auth)
router.post('/', addCart)
router.get('/', getCart)
router.delete('/:cartId', removeCart)

export default router
