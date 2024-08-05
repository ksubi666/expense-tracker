import express from "express"
import { createUser, userDelete, users, userUpdate } from '../controller/Users.js'

const user = express.Router()

user.get('/:id', users).post('/create',createUser).put('/:id',userUpdate).delete('/:id',userDelete)

export {user}