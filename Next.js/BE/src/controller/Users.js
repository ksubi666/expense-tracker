import {db}from "../../db.js"
import bcrypt from 'bcrypt'

export const createUser = async (req,res)=>{
  const {name, email, password , avatar_img  } =req.body
  const saltRounds = Number(process.env.SALTROUNDS);
   const tableQueryText = `
INSERT INTO users (name, email, password ,avatar_img )
VALUES ($1,$2,$3,$4) RETURNING *
  `;
  try {
      bcrypt.hash(password, saltRounds,async (err, hash)=> {
await db.query(tableQueryText,[name, email, hash ,avatar_img])
});
  } catch (error) {
        return res.send(error)
  }
return res.send('CREATE USER')
}

export const users = async (req,res)=>{
  const tableQueryText = `
  SELECT * from users
  `;
  try {
    const users = await db.query(tableQueryText)
    return res.send(users.rows)
  } catch (error) {
        return res.send(error)
  }
}

export const User = async (req,res)=>{
  const {email}=req.body
  const tableQueryText = `
  SELECT * from users
  WHERE email = $1 
  `;
  try {
    const users = await db.query(tableQueryText,[email])
    return users.rows
  } catch (error) {
        return res.send(error)
  }
}
export const GetUser = async (req,res)=>{
  const {id}=req.params
   const tableQueryText = `
   SELECT * from users
   WHERE id = $1
  `;
  try {
    const users = await db.query(tableQueryText,[id])
    return res.send(users.rows)
  } catch (error) {
        return res.send(error)
  }
}
export const userUpdate = async (req,res)=>{
  const {id}=req.params
  const {name ,email}=req.body

   const tableQueryText = `
UPDATE users SET name = $1, email = $2 WHERE  id = $3 RETURNING *
  `;
  try {
    const users = await db.query(tableQueryText,[name ,email,id])
    return res.send(users.rows)
  } catch (error) {
        return res.send(error)
  }
}
export const userDelete = async (req,res)=>{
  const {id}=req.params
   const tableQueryText = `
DELETE FROM users WHERE  id = $1 RETURNING *
  `;
  try {
    const users = await db.query(tableQueryText,[id])
    return res.send(users.rows)
  } catch (error) {
        return res.send(error)
  }
}