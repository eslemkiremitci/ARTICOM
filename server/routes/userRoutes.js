import express from 'express'
import { userKredi, clerkWebhooks, paymentTest } from '../controllers/UserController.js'
import authUser from '../middlewares/auth.js'

const userRouter = express.Router()

// Clerk user webhooks
userRouter.post('/webhooks', clerkWebhooks)

// Kullanıcı kredi sorgulama endpointi
userRouter.get('/kredi', authUser, userKredi)

userRouter.post('/pay-test', authUser, paymentTest)

export default userRouter
