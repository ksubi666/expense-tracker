import express from "express"
import { categories, Category, categoryDelete, categoryUpdate, createCategory, filterCategory } from '../controller/Categories.js'

const category = express.Router()

category.get('/', categories).get('/filterCategory',filterCategory).get('/id/:id',Category).post('/create',createCategory).put('/:id',categoryUpdate).delete('/:id',categoryDelete)

export {category}