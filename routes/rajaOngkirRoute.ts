import express from 'express'
import { getCity, getProvince } from '../controllers/rajaOngkirController'

const router = express.Router()

router.get('/province', getProvince)
router.get('/city/:provinceId', getCity)

export default router
