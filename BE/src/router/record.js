import express from 'express';
import {
  createRecord,
  getBarChartData,
  Record,
  recordDelete,
  RecordPieChart,
  records,
  recordUpdate,
} from '../controller/Records.js';

const record = express.Router();

record
  .get('/', records)
  .get('/id/:id', Record)
  .get('/recordPieChart/:id', RecordPieChart)
  .get('/getBarChartData/:id', getBarChartData)
  .post('/create', createRecord)
  .put('/:id', recordUpdate)
  .delete('/:id', recordDelete);

export { record };
