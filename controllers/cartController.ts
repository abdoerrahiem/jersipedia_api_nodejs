import asyncHandler from 'express-async-handler'
import Cart from '../models/Cart'
import Jersey from '../models/Jersey'

export const addCart = asyncHandler(async (req, res) => {
  const { jerseyId, amount, size, description } = req.body

  if (!jerseyId || !amount || !size) {
    res.status(400)
    throw new Error('Input all required data.')
  }

  const jersey = await Jersey.findById(jerseyId).populate('league')
  if (!jersey) {
    res.status(404)
    throw new Error('Jersey not found.')
  }

  if (!jersey.size.includes(size)) {
    res.status(404)
    throw new Error('There is no jersey with size provided.')
  }

  const cart = new Cart({
    user: req.user?._id,
    jersey: jersey._id,
    league: jersey.league._id,
    amount,
    size,
    description,
    total: amount * Number(jersey.price),
  })
  await cart.save()

  res.json({
    success: true,
    message: 'Success add to cart.',
    data: cart,
  })
})

export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.find({ user: req.user?._id })
    .populate('jersey')
    .sort({ createdAt: -1 })

  res.json({
    success: true,
    count: cart.length,
    data: cart,
  })
})

export const removeCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.cartId)
  if (!cart) {
    res.status(404)
    throw new Error('Cart not found.')
  }

  await cart.deleteOne()

  res.json({
    success: true,
    message: 'Cart removed.',
  })
})
