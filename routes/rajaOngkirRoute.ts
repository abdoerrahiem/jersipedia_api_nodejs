import express from 'express'
import {
  checkOngkir,
  getCity,
  getProvince,
} from '../controllers/rajaOngkirController'
import auth from '../middlewares/auth'

const router = express.Router()

router.get('/province', getProvince)
router.get('/city/:provinceId', getCity)
router.use(auth)
router.post('/check-ongkir', checkOngkir)

export default router
