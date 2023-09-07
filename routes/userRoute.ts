import express from 'express'
import {
  getCurrentUser,
  login,
  register,
  updateUser,
} from '../controllers/userController'
import auth from '../middlewares/auth'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.use(auth)
router.get('/me', getCurrentUser)
router.put('/me', updateUser)

export default router
