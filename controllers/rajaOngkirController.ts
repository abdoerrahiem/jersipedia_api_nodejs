import axios from 'axios'
import asyncHandler from 'express-async-handler'

export const getProvince = asyncHandler(async (req, res) => {
  axios
    .get('https://api.rajaongkir.com/starter/province', {
      headers: {
        key: process.env.RAJA_ONGKIR_API_KEY,
      },
    })
    .then((response) => {
      res.json({
        success: true,
        data: response.data.rajaongkir.results,
      })
    })
    .catch(() => {
      res.status(400).json({
        success: false,
        message: 'Error, try again later.',
      })
    })
})

export const getCity = asyncHandler(async (req, res) => {
  axios
    .get(
      `https://api.rajaongkir.com/starter/city?province=${req.params.provinceId}`,
      {
        headers: {
          key: process.env.RAJA_ONGKIR_API_KEY,
        },
      }
    )
    .then((response) => {
      res.json({
        success: true,
        data: response.data.rajaongkir.results,
      })
    })
    .catch(() => {
      res.status(400).json({
        success: false,
        message: 'Error, try again later.',
      })
    })
})
