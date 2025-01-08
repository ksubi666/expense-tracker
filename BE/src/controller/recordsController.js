import { db } from '../../db.js';
import map from 'lodash/map.js';
import groupBy from 'lodash/groupBy.js';

export const getBarChartData = async (req, res) => {
  const { id } = req.params;
  const queryText = `   SELECT * from records
   WHERE user_id = $1`;
  try {
    const result = await db.query(queryText, [id]);

    const groupedData = groupBy(result.rows, (el) => {
      const moonLanding = new Date(el.createdat);
      return moonLanding.getMonth() + 1;
    });

    const response = map(groupedData, (monthRecords, month) => {
      const totalAmount = monthRecords.reduce(
        (acc, record) => {
          if (record.transaction_type === 'INC') {
            acc.income += record.amount;
          } else {
            acc.expense += record.amount;
          }
          return acc;
        },
        { income: 0, expense: 0 }
      );

      return { month, ...totalAmount };
    });
    return res.send(response);
  } catch (error) {
    console.error(error);
  }
};

export const createRecord = async (req, res) => {
  const { user_id, name, amount, transaction_type, description, category_id } =
    req.body;
  const tableQueryText = `
INSERT INTO records (user_id,name, amount ,transaction_type,description,category_id )
VALUES ($1,$2,$3,$4,$5,$6) RETURNING *
  `;
  try {
    await db.query(tableQueryText, [
      user_id,
      name,
      amount,
      transaction_type,
      description,
      category_id,
    ]);
  } catch (error) {
    return res.send(error);
  }
  res.send('CREATE RECORD');
};
export const records = async (req, res) => {
  const tableQueryText = `
   SELECT * from records
  `;
  try {
    const users = await db.query(tableQueryText);
    return res.send(users.rows);
  } catch (error) {
    return res.send(error);
  }
};
export const RecordPieChart = async (req, res) => {
  const { id } = req.params;
  const tableQueryText = `
   SELECT records.*, category.name AS categoryName
   FROM records
   INNER JOIN category ON records.category_id = category.id
   WHERE user_id = $1 AND transaction_type = 'EXP'
  `;
  try {
    const users = await db.query(tableQueryText, [id]);
    return res.send(users.rows);
  } catch (error) {
    return res.send(error);
  }
};
export const Record = async (req, res) => {
  const { id } = req.params;
  const tableQueryText = `
   SELECT records.*,category.category_image AS categoryImage
   FROM records
   INNER JOIN category ON records.category_id = category.id
   WHERE user_id = $1
  `;
  try {
    const users = await db.query(tableQueryText, [id]);
    return res.send(users.rows);
  } catch (error) {
    return res.send(error);
  }
};
export const recordUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, amount, transaction_type, description } = req.body;

  const tableQueryText = `
UPDATE records SET name = $1, amount = $2, transaction_type = $3 ,description = $4 WHERE  id = $5 RETURNING *
  `;
  try {
    const records = await db.query(tableQueryText, [
      name,
      amount,
      transaction_type,
      description,
      id,
    ]);
    return res.send(records.rows);
  } catch (error) {
    return res.send(error);
  }
};
export const recordDelete = async (req, res) => {
  const { id } = req.params;
  const tableQueryText = `
DELETE FROM records WHERE id = $1 RETURNING *
  `;
  try {
    const records = await db.query(tableQueryText, [id]);
    return res.send(records.rows);
  } catch (error) {
    return res.send(error);
  }
};
