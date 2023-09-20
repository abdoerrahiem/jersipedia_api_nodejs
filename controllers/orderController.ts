import axios from 'axios'
import asyncHandler from 'express-async-handler'
import Order from '../models/Order'
import Cart from '../models/Cart'

export const createOrder = asyncHandler(async (req, res) => {
  const { cart, estimation, ongkir, total, courier } = req.body

  if (!cart || !estimation! || !ongkir || !total || !courier) {
    res.status(400)
    throw new Error('All data must be provided.')
  }

  const cartData: any[] = []

  await Promise.all(
    cart.map(async (id: string) => {
      const cart = await Cart.findById(id).populate('jersey')
      if (cart) {
        cartData.push({
          jerseyId: cart?.jersey?._id!,
          jerseyImage: cart?.jersey.images[0]!,
          jerseyTitle: cart?.jersey?.title!,
          jerseyPrice: cart?.jersey?.price!,
          amount: cart?.amount!,
          total: cart?.total!,
        })
      }
    })
  )

  if (cartData.length === 0) {
    res.status(400)
    throw new Error('Cart already checkout.')
  }

  const order = new Order({
    user: req.user?._id,
    cart: cartData,
    paymentLink: '',
    status: 'pending',
    estimation,
    ongkir,
    total,
    courier,
  })

  const first_name = req.user?.name
  const email = req.user?.email
  const phone = req.user?.phone

  const data = {
    transaction_details: {
      order_id: order._id,
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

  await Promise.all(
    cart.map(async (id: string) => {
      await Cart.findByIdAndRemove(id)
    })
  )

  axios
    .post(`${process.env.MIDTRANS_URL}/transactions`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: process.env.MIDTRANS_AUTH,
      },
    })
    .then(async (response) => {
      order.paymentLink = response.data.redirect_url
      await order.save()

      res.json({
        success: true,
        data: response.data.redirect_url,
      })
    })
    .catch(() => {
      res.status(400).json({
        success: false,
        message: 'Error, try again later.',
      })
    })
})

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user?._id,
  }).sort({ createdAt: -1 })

  res.json({
    success: true,
    data: orders,
  })
})
