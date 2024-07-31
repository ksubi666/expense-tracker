import bodyParser from "body-parser"
import express from "express"
import fs from "node:fs"
import cors from 'cors'
import { db } from './db.js'


const app = express()
const port = 8000;

app.use(bodyParser.json())
app.use(cors())

app.get('/',async (req,res)=>{
   const tableQueryText = `
  CREATE TABLE IF NOT EXISTS "users" (
    email VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(50)  NOT NULL,
    password TEXT,
    avatar_img VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    currency_type TEXT DEFAULT ‘MNT’
  )`;
  try {
    await db.query(tableQueryText)
  } catch (error) {
      console.error(error)
  }
res.send('saccess')
})
// app.get('/createUser',async (req,res)=>{
//    const tableQueryText = `
// INSERT INTO users (name,email)
// VALUES ('Sukh', 'Sukh@gmail.com')
//   `;
//   try {
//     await db.query(tableQueryText)
//   } catch (error) {
//       console.error(error)
//   }
// res.send('create user')
// })
app.get('/getUser',async (req,res)=>{
   const tableQueryText = `
SELECT * from users
  `;
  try {
    const users = await db.query(tableQueryText)
    res.send(users.rows)
  } catch (error) {
      console.error(error)
  }
res.send('get user')
})
app.listen(port,()=>{
  console.log(`Example app listening on port ${port}`)
})