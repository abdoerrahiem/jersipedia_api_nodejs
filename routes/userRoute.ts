import express from 'express'
import {
  getCurrentUser,
  login,
  register,
  updatePassword,
  updatePhotoUser,
  updateUser,
} from '../controllers/userController'
import auth from '../middlewares/auth'
import uploadFile from '../config/multer'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.use(auth)
router.get('/me', getCurrentUser)
router.put('/me', updateUser)
router.put('/me/photo', uploadFile.single('image'), updatePhotoUser)
router.put('/me/password', updatePassword)

export default router
