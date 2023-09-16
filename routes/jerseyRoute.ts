import express from 'express'
import admin from '../middlewares/admin'
import uploadFile from '../config/multer'
import { createJersey, getJersey } from '../controllers/jerseyController'

const router = express.Router()

router.get('/', getJersey)
router.use(admin)
router.post('/', uploadFile.array('image', 10), createJersey)

export default router
