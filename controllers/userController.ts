import asyncHandler from 'express-async-handler'
import User from '../models/User'
import generateToken from '../utils/generateToken'

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (await user.comparePassword(password)) {
    res.json({
      success: true,
      token: generateToken(user._id, user.isAdmin),
    })
  } else {
    res.status(400)
    throw new Error('Email or password incorrect.')
  }
})

export const register = asyncHandler(async (req, res) => {
  const registeredUser = await User.findOne({ email: req.body.email })

  if (registeredUser) {
    res.status(400)
    throw new Error('User already exists.')
  }

  const user = new User({ ...req.body, photo: process.env.DEFAULT_USER_IMAGE })

  await user.save()

  res.json({
    success: true,
    token: generateToken(user._id, user.isAdmin),
  })
})

export const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  })
})

export const updateUser = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user?.id)
  if (user !== null) {
    user.name = req.body.name
    user.email = req.body.email
    user.phone = req.body.phone
    user.address = req.body.address
    user.province = req.body.province
    user.city = req.body.city
    user.isAdmin = req.body.isAdmin
    user.photo = req.body.photo
  }
  await user?.save()

  res.json({
    success: true,
    message: 'Your profile updated.',
  })
})
