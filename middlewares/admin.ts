import jwt from 'jsonwebtoken'
import User from '../models/User'
import { NextFunction, Request, Response } from 'express'

const admin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.headers.authorization
      ? req.headers.authorization.replace('Bearer ', '')
      : ''

    const data: any = jwt.verify(token, process.env.JWT_SECRET as string)

    const user = await User.findById(data.id).select('-password')
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Please relogin.',
      })
      return
    }
    if (!user.isAdmin) {
      res.status(401).json({
        success: false,
        message: 'You are not administrator.',
      })
      return
    }

    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Please relogin.',
    })
  }
}

export default admin
