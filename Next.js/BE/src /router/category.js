import express from "express"
import { categories, categoryDelete, categoryUpdate, createCategory } from '../controller/Categories.js'

const category = express.Router()

category.get('/', categories).post('/create',createCategory).put('/:id',categoryUpdate).delete('/:id',categoryDelete)

export {category}