import {db}from "../../db.js"

export const createRecord = async (req,res)=>{
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
res.send('CREATE RECORD')
}
export const records = async (req,res)=>{
      const {id}=req.params
   const tableQueryText = `
   SELECT * from records
   WHERE id = $1
  `;
  try {
    const users = await db.query(tableQueryText,[id])
    res.send(users.rows)
  } catch (error) {
      console.error(error)
  }
}
export const recordUpdate = async (req,res)=>{
  const {id}=req.params
  const {name, amount ,transaction_type, description}=req.body

   const tableQueryText = `
UPDATE records SET name = $1, amount = $2, transaction_type = $3 ,description = $4 WHERE  id = $5 RETURNING *
  `;
  try {
    const records = await db.query(tableQueryText,[name, amount , transaction_type , description,id])
    res.send(records.rows)
  } catch (error) {
      console.error(error)
  }
}
export const recordDelete = async (req,res)=>{
  const {id}=req.params
   const tableQueryText = `
DELETE FROM records WHERE id = $1 RETURNING *
  `;
  try {
    const records = await db.query(tableQueryText,[id])
    res.send(records.rows)
  } catch (error) {
      console.error(error)
  }
}