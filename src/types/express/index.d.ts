import express from 'express'
import { IUser } from '../../../models/User'

declare global {
  namespace Express {
    export interface Request {
      user?: IUser
      token?: string
      file?: any
    }
  }
}
