import express from "express"
import { createUser, User, userDelete, users, userUpdate } from '../controller/Users.js'

const user = express.Router()

user.get('/', users).get('/:id',User).post('/create',createUser).put('/:id',userUpdate).delete('/:id',userDelete)

export {user}