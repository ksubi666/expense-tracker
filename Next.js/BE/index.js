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
res.send('createTable')
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
res.send('create user')
})
// Users
// app.get('/getUser',async (req,res)=>{
//    const tableQueryText = `
// SELECT * from users
//   `;
//   try {
//     const users = await db.query(tableQueryText)
//     res.send(users.rows)
//   } catch (error) {
//       console.error(error)
//   }
// res.send('get user')
// })
app.listen(port,()=>{
  console.log(`Example app listening on port ${port}`)
})