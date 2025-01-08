import { useContext, useEffect, useMemo, useState } from 'react';
import CheckboxList from './CheckboxList';
import CheckboxRecord from './CheckboxRecord';
import { icons } from './CategorySelect';
import sortBy from 'lodash/sortBy';
import { RecordsDataContext } from '@/pages/records';
import { formatDistanceToNow, formatISO9075 } from 'date-fns';
import groupBy from 'lodash/groupBy';

const styles = {
  container: 'flex flex-col gap-6',
  selectAllContainer:
    'w-full h-fit py-3 px-6 rounded-[12px] border-[1px] flex items-center justify-between bg-white',
  selectAllAmount: 'font-semibold text-primary opacity-[0.6]',
  recordContentContainer: 'flex items-center gap-4',
  iconBg: 'size-10 rounded-full bg-[#0166FF] flex justify-center items-center',
  textContainer: 'flex flex-col gap-1',
  recordName: 'text-[#000] font-semibold',
  recordDate: 'text-[12px] leading-4 text-[#6B7280]',
  contentContainer: 'flex flex-col gap-3',
};

const dateToTime = (d) => formatISO9075(new Date(d)).slice(0, 16);

const RecordDateList = ({ sortingValues }) => {
  const {
    typeValue,
    categoryValue,
    currency,
    recordData,
    setFilteredData,
    filteredData,
  } = useContext(RecordsDataContext);
  const [totalAmount, setTotalAmount] = useState(0);

  const filteredArray = useMemo(() => {
    const sortedData =
      sortingValues === 'newest' ? recordData : sortBy(recordData, 'createdat');
    const filteredByType = sortedData.filter(
      (record) => typeValue === 'ALL' || record.transaction_type === typeValue
    );
    return filteredByType.filter(
      (record) => !categoryValue || record.category_id === categoryValue
    );
  }, [recordData, sortingValues, typeValue, categoryValue]);

  useEffect(() => {
    const groupedData = groupBy(
      filteredArray,
      (record) => record.createdat.split('T')[0]
    );
    setFilteredData(groupedData);

    const total = filteredArray.reduce((acc, record) => acc + record.amount, 0);
    setTotalAmount(total);
  }, [filteredArray]);

  return (
    <div className={styles.container}>
      <div className={styles.selectAllContainer}>
        <CheckboxRecord
          id="selectAll"
          content="Select All"
          currency={currency}
        />
        <p className={styles.selectAllAmount}>
          {totalAmount} {currency === 'USD' ? '$' : '₮'}
        </p>
      </div>
      <div className={styles.contentContainer}>
        {Object.keys(filteredData).map((date) => (
          <div key={date} className="flex flex-col gap-3">
            <h1 className="font-medium pl-2">
              {formatDistanceToNow(new Date(date))} ago
            </h1>
            {filteredData[date].map((record) => (
              <CheckboxList
                key={record.id}
                id="select"
                content={
                  <div className={styles.recordContentContainer}>
                    <div className={styles.iconBg}>
                      {icons[record.categoryimage]}
                    </div>
                    <div className={styles.textContainer}>
                      <h1 className={styles.recordName}>{record.name}</h1>
                      <p className={styles.recordDate}>
                        {dateToTime(record.createdat)}
                      </p>
                    </div>
                  </div>
                }
                transType={record.transaction_type}
                amount={record.amount}
                currency={currency}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordDateList;
