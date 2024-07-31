import bodyParser from "body-parser"
import express from "express"
import fs from "node:fs"


const app = express()
const port = 8000;

app.use(bodyParser.json())



app.post('/write',(req,res)=>{
  fs.writeFile('/Users/24LP7188/Desktop/NEXT.JS/BE/DATA.txt','Hello node.js','utf8',(err,data)=>{
    console.log(err,data)
  })
})

app.get('/read',(req,res)=>{
  fs.readFile('/Users/24LP7188/Desktop/NEXT.JS/BE/DATA.txt','utf8',(err,data)=>{
    res.send(data)
  })
})
app.listen(port,()=>{
  console.log(`Example app listening on port ${port}`)
})