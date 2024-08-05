import {db}from "../../db.js"

export const createUser = async (req,res)=>{
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
res.send('CREATE user')
}
export const users = async (req,res)=>{
  const tableQueryText = `
  SELECT * from users

  `;
  try {
    const users = await db.query(tableQueryText)
    res.send(users.rows)
  } catch (error) {
      console.error(error)
  }
}
export const User = async (req,res)=>{
  const {id}=req.params
  const tableQueryText = `
  SELECT * from users
  WHERE id = $1
  `;
  try {
    const users = await db.query(tableQueryText,[id])
    res.send(users.rows)
  } catch (error) {
      console.error(error)
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
    res.send(users.rows)
  } catch (error) {
      console.error(error)
  }
}
export const userDelete = async (req,res)=>{
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
}