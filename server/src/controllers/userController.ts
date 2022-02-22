import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secret' // under normal circumstances, hide this
import User, { UserDocument } from '../models/User'
import UserService from '../services/userServices'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, firstName, lastName, isAdmin, image } =
      req.body

    const hasUserMail = await UserService.findUserByEmail(email)
    const hasUserName = await UserService.findUserByUsername(username)

    if (hasUserName || hasUserMail)
      return res.status(400).json({ error: 'User already exists' })
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin,
      image,
    })

    await UserService.createUser(user)
    res.json(user)
  } catch (error) {
    console.log(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await UserService.findUserByEmail(email)
    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password)
      console.log(password, user.password)
      if (!isCorrectPassword) {
        return next(new BadRequestError('Incorrect password'))
      }

      const loginToken = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      )
      res.json({ loginToken, user })
    } else {
      next(new NotFoundError('E-Mail address does not exist'))
    }
  } catch (error) {
    next(new BadRequestError('Internal server error'))
  }
}

export const findUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findUsers())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.findUserById(<string>req.query.userId)) // note: for obvious reasons, don't return the password or other sensitive info in a real/production project
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = <string>req.query.userId
    const dataToUpdate = <Partial<UserDocument>>req.query.body
    const updatedUser = await UserService.editUser(userId, dataToUpdate)
    res.json(updatedUser)
    console.log(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await UserService.deleteUser(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const addImageToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    const imageId = req.params.imageId
    const updatedUser = await UserService.addImageToUser(userId, imageId)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
