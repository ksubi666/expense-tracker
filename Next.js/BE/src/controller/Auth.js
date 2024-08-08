import { createUser, User, users } from './Users.js'
import bcrypt from 'bcrypt'

export const Signup = async(req,res)=>{
  try { 
    await createUser(req,res)
  } catch (error) {
    console.log(error)
  }
}
export const Singin = async(req,res)=>{
  const {password,email}=req.body
  try {
        const user =  await User(req,res)
      bcrypt.compare(password, user[0].password,(err, result)=> {
  if (true) {
      res.send({success:true, user:user})
    } else {
      res.send({error:'Invalid email or password'})
    }
});
  } catch (error) {
    console.log(error)
  }
}