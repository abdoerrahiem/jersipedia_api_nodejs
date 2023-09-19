import axios from 'axios'
import asyncHandler from 'express-async-handler'

export const createOrder = asyncHandler(async (req, res) => {
  const { total } = req.body

  if (!total) {
    res.status(400)
    throw new Error('Total is not provided.')
  }

  const order_id = `${req.user?._id}-${new Date().valueOf()}`
  const first_name = req.user?.name
  const email = req.user?.email
  const phone = req.user?.phone

  const data = {
    transaction_details: {
      order_id,
      gross_amount: total,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name,
      email,
      phone,
    },
  }

  axios
    .post(`${process.env.MIDTRANS_URL}/transactions`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: process.env.MIDTRANS_AUTH,
      },
    })
    .then((response) => {
      res.json({
        success: true,
        data: response.data,
      })
    })
    .catch(() => {
      res.status(400).json({
        success: false,
        message: 'Error, try again later.',
      })
    })
})
