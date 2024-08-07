import express from "express"
import { categories, Category, categoryDelete, categoryUpdate, createCategory } from '../controller/Categories.js'

const category = express.Router()

category.get('/', categories).get('/:id',Category).post('/create',createCategory).put('/:id',categoryUpdate).delete('/:id',categoryDelete)

export {category}