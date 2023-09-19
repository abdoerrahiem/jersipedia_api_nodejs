import asyncHandler from 'express-async-handler'
import Order from '../models/Order'

export const paymentHandling = asyncHandler(async (req, res) => {
  const { order_id, transaction_status } = req.body

  const order = await Order.findById(order_id)
  if (!order) {
    res.status(404)
    throw new Error('Order not found.')
  }

  order.status = transaction_status
  await order.save()

  res.json({
    success: true,
    message: 'Order status has been changed.',
  })
})

export const redirectPayment = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: `Your transaction status: ${req.query.transaction_status}`,
  })
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
