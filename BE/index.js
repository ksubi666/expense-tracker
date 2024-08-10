import bodyParser from "body-parser"
import express from "express"
import cors from 'cors'
import { db } from './db.js'
import { user } from './src/router/user.js'
import { record } from './src/router/record.js'
import { category } from './src/router/category.js'
import { auth} from './src/router/auth.js'

const app = express()
const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(cors())

app.use('/user',user)
app.use('/record',record)
app.use('/category',category)
app.use('/Api',auth)


// create userTable
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
        return res.send(error)
  }
return res.send('CREATED USERS TABLE')
})
// create recordTable
app.get('/recordTable',async (req,res)=>{
   const tableQueryText = `  
   CREATE TABLE IF NOT EXISTS "records" (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid,
    name VARCHAR(50)  NOT NULL,
    amount REAL NOT NULL, 
    transaction_type transaction_type DEFAULT 'INC' NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id uuid,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
  )
`;
  try {
    await db.query(tableQueryText)
  } catch (error) {
        return res.send(error)
  }
return res.send('CREATED RECORDS TABLE')
})
// create categoryTable
app.get('/categoryTable',async (req,res)=>{
   const tableQueryText = `  
   CREATE TABLE IF NOT EXISTS "category" (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
        return res.send(error)
  }
return res.send('CREATED CATEGORY TABLE')
})


app.listen(PORT,()=>{
  console.log(`Port ${PORT}`)
})