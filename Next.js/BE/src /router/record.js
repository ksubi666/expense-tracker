import express from "express"
import { createRecord, recordDelete, records, recordUpdate } from '../controller/Records.js'


const record = express.Router()

record.get('/', records).post('/create',createRecord).put('/:id',recordUpdate).delete('/:id',recordDelete)

export {record}