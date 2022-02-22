import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const createUser = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findUsers = async (): Promise<UserDocument[]> => {
  return User.find().select('-password')
}

const findUserById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

//Find user by email

const findUserByEmail = async (
  email?: string
): Promise<UserDocument | null> => {
  const user = await User.findOne({ email })
  return user
}

//Find user by username

const findUserByUsername = async (
  username?: string
): Promise<UserDocument | null> => {
  const user = await User.findOne({ username })
  return user
}

const editUser = async (
  userId: string,
  dataToUpdate: Partial<UserDocument>
): Promise<UserDocument> => {
  const foundUser = await User.findByIdAndUpdate(userId, dataToUpdate, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const addImageToUser = async (userId: string, imageId: string) => {
  const user = await User.findById(userId)
  user?.image.push(imageId)
  return user?.save()
}

export default {
  createUser,
  findUsers,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  editUser,
  deleteUser,
  addImageToUser
}
