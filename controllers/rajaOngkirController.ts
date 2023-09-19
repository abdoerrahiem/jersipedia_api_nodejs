import axios from 'axios'
import asyncHandler from 'express-async-handler'

export const getProvince = asyncHandler(async (req, res) => {
  axios
    .get(`${process.env.RAJA_ONGKIR_URL}/province`, {
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
      `${process.env.RAJA_ONGKIR_URL}/city?province=${req.params.provinceId}`,
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

export const checkOngkir = asyncHandler(async (req, res) => {
  const { weight, courier } = req.body

  if (!weight || !courier) {
    res.status(400)
    throw new Error('Weight & courier must be provided.')
  }

  axios
    .get(`${process.env.RAJA_ONGKIR_URL}/province`, {
      headers: {
        key: process.env.RAJA_ONGKIR_API_KEY,
      },
    })
    .then((response) => {
      const allProvince = [...response.data.rajaongkir.results]
      const foundProvince = allProvince.find(
        (prov) =>
          prov.province.toLowerCase() === req.user?.province.toLocaleLowerCase()
      )

      axios
        .get(
          `${process.env.RAJA_ONGKIR_URL}/city?province=${foundProvince.province_id}`,
          {
            headers: {
              key: process.env.RAJA_ONGKIR_API_KEY,
            },
          }
        )
        .then((response) => {
          const allCity = [...response.data.rajaongkir.results]
          const foundCity = allCity.find(
            (city) =>
              city.city_name.toLowerCase() ===
              req.user?.city.toLocaleLowerCase()
          )

          const formData = new FormData()
          formData.append('origin', process.env.RAJA_ONGKIR_ORIGIN as string)
          formData.append('destination', foundCity.city_id)
          formData.append('weight', weight)
          formData.append('courier', courier)

          axios
            .post(`${process.env.RAJA_ONGKIR_URL}/cost`, formData, {
              headers: {
                key: process.env.RAJA_ONGKIR_API_KEY,
                'content-type': 'application/x-www-form-urlencoded',
              },
            })
            .then((response) => {
              res.json({
                success: true,
                data: response.data.rajaongkir.results[0].costs[0].cost[0],
              })
            })
            .catch(() => {
              res.status(400).json({
                success: false,
                message: 'Error, try again later.',
              })
            })
        })
        .catch(() => {
          res.status(400).json({
            success: false,
            message: 'Error, try again later.',
          })
        })
    })
    .catch(() => {
      res.status(400).json({
        success: false,
        message: 'Error, try again later.',
      })
    })
})
