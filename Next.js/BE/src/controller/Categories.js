import {db}from "../../db.js"

export const createCategory = async (req,res)=>{
  const {name, description ,category_image} =req.body
   const tableQueryText = `
INSERT INTO category (name, description ,category_image )
VALUES ($1,$2,$3) RETURNING *
  `;
  try {
    await db.query(tableQueryText,[name, description ,category_image])
  } catch (error) {
        return res.send(error)
  }
return res.send('CREATE CATEGORY')
}
export const categories = async (req,res)=>{
   const tableQueryText = `
   SELECT * from category
  `;
  try {
    const category = await db.query(tableQueryText)
   return res.send(category.rows)
  } catch (error) {
        return res.send(error)
  }
}
export const Category = async (req,res)=>{
    const {id}=req.params
   const tableQueryText = `
   SELECT * from category
   WHERE id = $1
  `;
  try {
    const category = await db.query(tableQueryText,[id])
    return res.send(category.rows)
  } catch (error) {
        return res.send(error)
  }
}
export const categoryUpdate = async (req,res)=>{
  const {id}=req.params
  const {name, description ,category_image}=req.body

   const tableQueryText = `
UPDATE category SET name = $1, description = $2 ,category_image = $3 WHERE  id = $4 RETURNING *
  `;
  try {
    const category = await db.query(tableQueryText,[name, description ,category_image,id])
    return res.send(category.rows)
  } catch (error) {
       return res.send(error)
  }
}
export const categoryDelete = async (req,res)=>{
  const {id}=req.params
   const tableQueryText = `
DELETE FROM category WHERE  id = $1 RETURNING *
  `;
  try {
    const category = await db.query(tableQueryText,[id])
    return res.send(category.rows)
  } catch (error) {
        return res.send(error)
  }
}
export const filterCategory = async (req,res)=>{
   const {name,description,id}=req.body
   const tableQueryText = `
   SELECT * from category
   WHERE name = $1 OR description = $2 OR id = $3 
  `;
  try {
    const users = await db.query(tableQueryText,[name,description,id])
    return res.send(users.rows)
  } catch (error) {
        return res.send(error)
  }
}