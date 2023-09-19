import asyncHandler from 'express-async-handler'

export const paymentHandling = asyncHandler(async (req, res) => {
  res.json(req.body)
})

export const redirectPaymentSuccess = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Payment success.',
  })
})

export const redirectPaymentPending = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Payment pending.',
  })
})

export const redirectPaymentError = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Payment error.',
  })
})
