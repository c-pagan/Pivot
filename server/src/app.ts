import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import fileupload from 'express-fileupload'
import userRouter from './routers/userRouter'
import authRouter from './routers/authRouter'
import { jwtStrategy } from './config/passport'

dotenv.config({ path: '.env' })
const app = express()


//Allow CORS
app.use(cors())

// Use common 3rd-party middlewares
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Middleware for fileupload to cloudinary
/* eslint-disable  @typescript-eslint/no-var-requires*/

//const fileupload = require('express-fileupload')
app.use(fileupload({ useTempFiles: true }))
/* eslint-enable  @typescript-eslint/no-var-requires */

passport.use(jwtStrategy)

// User router
app.use('/api/v1/users', userRouter)
//Auth Router
app.use('/api/v1/auth', authRouter)






export default app
