import bodyParser from "body-parser"
import express from "express"
import fs from "node:fs"
import cors from 'cors'
import { db } from './db.js'


const app = express()
const port = 8000;

app.use(bodyParser.json())
app.use(cors())
// createTable
app.get('/createTable',async (req,res)=>{
   const tableQueryText = `  
   CREATE TABLE IF NOT EXISTS "users" (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50)  NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL, 
    password TEXT,
    avatar_img BYTEA,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    currency_type currency_type DEFAULT 'MNT' NOT NULL
  )
`;
  try {
    await db.query(tableQueryText)
  } catch (error) {
      console.error(error)
  }
res.send('CREATED USERS TABLE')
})
// createUser
app.post('/users/create',async (req,res)=>{
  const {name, email, password , avatar_img , currency_type } =req.body
   const tableQueryText = `
INSERT INTO users (name, email, password ,avatar_img, currency_type )
VALUES ($1,$2,$3,$4,$5) RETURNING *
  `;
  try {
    await db.query(tableQueryText,[name, email, password ,avatar_img, currency_type])
  } catch (error) {
      console.error(error)
  }
res.send('Insert user')
})
// Users
app.get('/users',async (req,res)=>{
   const tableQueryText = `
SELECT * from users
  `;
  try {
    const users = await db.query(tableQueryText)
    res.send(users.rows)
  } catch (error) {
      console.error(error)
  }
})
//users/id UPDATE
app.put('/users/:id',async (req,res)=>{
  const {id}=req.params
  const {name ,email}=req.body

   const tableQueryText = `
UPDATE users SET name = $1, email = $2 WHERE  id = $3 RETURNING *
  `;
  try {
    const users = await db.query(tableQueryText,[name ,email,id])
    res.send(users.rows)
  } catch (error) {
      console.error(error)
  }
})
//users/id  DELETE
app.delete('/users/:id',async (req,res)=>{
  const {id}=req.params
   const tableQueryText = `
DELETE FROM users WHERE  id = $1 RETURNING *
  `;
  try {
    const users = await db.query(tableQueryText,[id])
    res.send(users.rows)
  } catch (error) {
      console.error(error)
  }
})
// ***********************************

// Record Table
app.get('/recordTable',async (req,res)=>{
   const tableQueryText = `  
   CREATE TABLE IF NOT EXISTS "records" (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT,
    name VARCHAR(50)  NOT NULL,
    amount REAL NOT NULL, 
    transaction_type transaction_type DEFAULT 'INC' NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id TEXT
  )
`;
  try {
    await db.query(tableQueryText)
  } catch (error) {
      console.error(error)
  }
res.send('CREATED RECORDS TABLE')
})
// RECORD createUser
app.post('/records/create',async (req,res)=>{
  const {name, amount ,transaction_type ,description } =req.body
   const tableQueryText = `
INSERT INTO records (name, amount ,transaction_type,description )
VALUES ($1,$2,$3,$4) RETURNING *
  `;
  try {
    await db.query(tableQueryText,[name, amount ,transaction_type,description])
  } catch (error) {
      console.error(error)
  }
res.send('CREATE RECORD TABLE USER')
})
// 
app.get('/records',async (req,res)=>{
   const tableQueryText = `
SELECT * from records
  `;
  try {
    const users = await db.query(tableQueryText)
    res.send(users.rows)
  } catch (error) {
      console.error(error)
  }
})
//records/id UPDATE
app.put('/records/:id',async (req,res)=>{
  const {id}=req.params
  const {name, amount , description}=req.body

   const tableQueryText = `
UPDATE records SET name = $1, amount = $2, description = $3 WHERE  id = $4 RETURNING *
  `;
  try {
    const records = await db.query(tableQueryText,[name, amount , description,id])
    res.send(records.rows)
  } catch (error) {
      console.error(error)
  }
})
//records/id  DELETE
app.delete('/records/:id',async (req,res)=>{
  const {id}=req.params
   const tableQueryText = `
DELETE FROM records WHERE  id = $1 RETURNING *
  `;
  try {
    const records = await db.query(tableQueryText,[id])
    res.send(records.rows)
  } catch (error) {
      console.error(error)
  }
})



// ***********************************
// CREATE categoryTable
app.get('/categoryTable',async (req,res)=>{
   const tableQueryText = `  
   CREATE TABLE IF NOT EXISTS "category" (
    id TEXT,
    name VARCHAR(50)  NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_image TEXT
  )
`;
  try {
    await db.query(tableQueryText)
  } catch (error) {
      console.error(error)
  }
res.send('CREATED CATEGORY TABLE')
})
// CATEGORY createUser
app.post('/category/create',async (req,res)=>{
  const {name, description ,category_image} =req.body
   const tableQueryText = `
INSERT INTO category (name, description ,category_image )
VALUES ($1,$2,$3) RETURNING *
  `;
  try {
    await db.query(tableQueryText,[name, description ,category_image])
  } catch (error) {
      console.error(error)
  }
res.send('CREATE CATEGORY TABLE USER')
})
// 
app.get('/categories',async (req,res)=>{
   const tableQueryText = `
SELECT * from category
  `;
  try {
    const category = await db.query(tableQueryText)
    res.send(category.rows)
  } catch (error) {
      console.error(error)
  }
})
//category/id UPDATE
app.put('/category/:id',async (req,res)=>{
  const {id}=req.params
  const {name ,email}=req.body

   const tableQueryText = `
UPDATE category SET name = $1, description = $2 ,category_image = $3 WHERE  id = $4 RETURNING *
  `;
  try {
    const category = await db.query(tableQueryText,[name, description ,category_image,id])
    res.send(category.rows)
  } catch (error) {
      console.error(error)
  }
})
//category/id  DELETE
app.delete('/category/:id',async (req,res)=>{
  const {id}=req.params
   const tableQueryText = `
DELETE FROM category WHERE  id = $1 RETURNING *
  `;
  try {
    const category = await db.query(tableQueryText,[id])
    res.send(category.rows)
  } catch (error) {
      console.error(error)
  }
})
// ***********************************
// 
app.listen(port,()=>{
  console.log(`Port ${port}`)
})