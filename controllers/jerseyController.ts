import asyncHandler from 'express-async-handler'
import { cloudinary } from '../config/cloudinary'
import Jersey from '../models/Jersey'

export const createJersey = asyncHandler(async (req, res) => {
  const files = req?.files as any[]
  const { league, title, price, type, weight, stock, size } = req.body

  if (!files) {
    res.status(400)
    throw new Error('Image cannot be empty.')
  }

  if (!league || !title || !price || !type || !weight || !stock || !size) {
    res.status(400)
    throw new Error('Please input all required data.')
  }

  const images: string[] = []

  await Promise.all(
    files.map(async (image) => {
      const data = await cloudinary.uploader.upload(String(image.path), {
        folder: process.env.CLOUDINARY_FOLDER,
      })
      images.push(data.secure_url)
    })
  )

  const jersey = new Jersey({
    league,
    title,
    price,
    type,
    weight,
    stock,
    size: size.split(','),
    images,
  })
  await jersey?.save()

  res.json({
    success: true,
    message: 'New jersey created.',
    data: jersey,
  })
})

export const getJersey = asyncHandler(async (req, res) => {
  const { title = '', page = 1, size = 10, league = '' } = req.query

  const jerseys = await Jersey.find(
    String(league).length > 0
      ? {
          title: { $regex: title, $options: 'i' },
          league,
        }
      : {
          title: { $regex: title, $options: 'i' },
        }
  )
    .sort({ createdAt: -1 })
    .limit(Number(size))
    .skip(Number(size) * Number(page) - Number(size))

  const jerseyLength = await Jersey.find(
    String(league).length > 0
      ? {
          title: { $regex: title, $options: 'i' },
          league,
        }
      : {
          title: { $regex: title, $options: 'i' },
        }
  ).countDocuments()

  res.json({
    success: true,
    count: jerseys.length,
    data: jerseys,
    meta: {
      currentPage: Number(page),
      maxPage: Math.ceil(jerseyLength / Number(size)),
    },
  })
})
