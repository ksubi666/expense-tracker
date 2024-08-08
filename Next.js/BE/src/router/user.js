import express from "express"
import { createUser, GetUser, User, userDelete, users, userUpdate } from '../controller/Users.js'

const user = express.Router()

user.get('/', users).get('/:id',GetUser).post('/create',createUser).put('/:id',userUpdate).delete('/:id',userDelete)

export {user}