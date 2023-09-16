import express from 'express'
import admin from '../middlewares/admin'
import { createLeague, getLeagues } from '../controllers/leagueController'
import uploadFile from '../config/multer'

const router = express.Router()

router.get('/', getLeagues)
router.use(admin)
router.post('/', uploadFile.single('image'), createLeague)

export default router
