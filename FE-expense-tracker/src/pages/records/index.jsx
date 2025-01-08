import { CategoryMenu, RecordsListTable } from '@/components';
import { axiosInstance } from '@/lib/axios';
import { createContext, useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import {
  differenceInDays,
  endOfMonth,
  startOfMonth,
  subMonths,
} from 'date-fns';
export const RecordsDataContext = createContext();

const styles = {
  container: 'flex flex-row gap-6 w-[1200px] min-h-screen pb-10',
};

const Records = () => {
  const [typeValue, setTypeValue] = useState('ALL');
  const [recordData, setRecordData] = useState();
  const [currency, setCurrency] = useState('MNT');
  const [categories, setCategories] = useState();
  const [categoryValue, setCategoryValue] = useState();
  const [differenceDays, setdifferenceDays] = useState();
  const [monthDiff, setMonthDiff] = useState(0);
  const [filteredData, setFilteredData] = useState({});
  const [searchInput, setSearchInput] = useState();

  const handlerClick = (name) => {
    if (name === 'left') {
      setMonthDiff(monthDiff + 1);
    } else {
      setMonthDiff(monthDiff - 1);
    }

    if (monthDiff === 6) {
      return setMonthDiff(0);
    }
    if (monthDiff < 0) {
      return setMonthDiff(0);
    }
  };
  useEffect(() => {
    let user = localStorage.getItem('user');
    if (user) {
      const data = JSON.parse(user);
      const userId = data.user.id;
      const currencyType = data.user.currency_type;
      setCurrency(currencyType);

      axiosInstance.get(`/record/id/${userId}`).then((res) => {
        const record = res.data;

        const recordsSort = sortBy(record, 'createdat');

        setSearchInput(recordsSort);

        const date = new Date();
        const startMonth = startOfMonth(new Date(date));
        const endMonth = endOfMonth(new Date(date));

        const DiffDays = differenceInDays(
          new Date(endMonth),
          subMonths(new Date(startMonth), monthDiff)
        );
        setdifferenceDays(DiffDays);

        const filtered = recordsSort.filter(
          (el) =>
            subMonths(new Date(startMonth), monthDiff) <
              new Date(el.createdat) && new Date(el.createdat) < endMonth
        );
        setRecordData(filtered.reverse());
      });
    }
  }, [monthDiff]);
  useEffect(() => {
    axiosInstance.get('/category/').then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <RecordsDataContext.Provider
      value={{
        recordData,
        typeValue,
        setTypeValue,
        categories,
        setCategoryValue,
        currency,
        categoryValue,
        differenceDays,
        setMonthDiff,
        monthDiff,
        handlerClick,
        setFilteredData,
        filteredData,
        searchInput,
      }}
    >
      <div className={styles.container}>
        {categories && <CategoryMenu />}
        {recordData && <RecordsListTable />}
      </div>
    </RecordsDataContext.Provider>
  );
};

export default Records;
