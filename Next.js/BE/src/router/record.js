import express from "express"
import { createRecord, Record, recordDelete, records, recordUpdate } from '../controller/Records.js'


const record = express.Router()

record.get('/', records).get('/:id', Record).post('/create',createRecord).put('/:id',recordUpdate).delete('/:id',recordDelete)

export {record}