import express from 'express'
import {
  paymentHandling,
  redirectPayment,
  redirectPaymentError,
  redirectPaymentPending,
  redirectPaymentSuccess,
} from '../controllers/paymentController'

const router = express.Router()

router.post('/handling', paymentHandling)
router.get('/redirect', redirectPayment)
router.get('/redirect/success', redirectPaymentSuccess)
router.get('/redirect/pending', redirectPaymentPending)
router.get('/redirect/error', redirectPaymentError)

export default router
