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
      console.error(error)
  }
res.send('CREATE CATEGORY')
}
export const categories = async (req,res)=>{
   const tableQueryText = `
SELECT * from category
  `;
  try {
    const category = await db.query(tableQueryText)
    res.send(category.rows)
  } catch (error) {
      console.error(error)
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
    res.send(category.rows)
  } catch (error) {
      console.error(error)
  }
}
export const categoryDelete = async (req,res)=>{
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
}