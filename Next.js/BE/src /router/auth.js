import express from "express"
import { Signup, Singin } from '../controller/auth.js'

const auth = express.Router()

auth.post('/signup',Signup).post('/signin',Singin)

export {auth}