import { Router } from 'express'
import passport from 'passport'

import {
  createUser,
  findUsers,
  findUserById,
  editUser,
  deleteUser
} from '../controllers/userController'

const router = Router()

router.get('/', findUsers)
router.post('/', createUser)
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  findUserById
)

router.put(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  editUser
)

router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  deleteUser
)

export default router
