import asyncHandler from 'express-async-handler'
import { cloudinary } from '../config/cloudinary'
import League from '../models/League'

export const createLeague = asyncHandler(async (req, res) => {
  const file = req?.file

  if (!file?.path) {
    res.status(400)
    throw new Error('Image cannot be empty.')
  }

  if (!req.body.title || req.body?.title?.trim()?.length === 0) {
    res.status(400)
    throw new Error('Title cannot be empty.')
  }

  const foundLeague = await League.exists({
    title: { $regex: req.body.title, $options: 'i' },
  })

  if (foundLeague) {
    res.status(400)
    throw new Error('League already exists.')
  }

  const data = await cloudinary.uploader.upload(String(file.path), {
    folder: process.env.CLOUDINARY_FOLDER,
  })

  const league = new League({ title: req.body.title, image: data.secure_url })
  await league?.save()

  res.json({
    success: true,
    message: 'New league created.',
    data: league,
  })
})

export const getLeagues = asyncHandler(async (req, res) => {
  const leagues = await League.find({}).sort({ createdAt: -1 })

  res.json({
    success: true,
    data: leagues,
  })
})
