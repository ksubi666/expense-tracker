import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import RecordDateList from './RecordDateList';
import RecordsSortingSelect from './RecordsSortingSelect';
import { useContext, useState } from 'react';
import { RecordsDataContext } from '@/pages/records';

const styles = {
  arrowButton:
    'p-0 size-8 rounded-[8px] flex justify-center items-center gap-1 bg-white text-[#0F172A] border-[#E5E7EB] border-[1px] bg-[#F9FAFB]',
  container: 'flex items-center py-4 justify-between',
  subContainer: 'flex gap-4 items-center',
};

export const RecordsListTable = () => {
  const { differenceDays, handlerClick } = useContext(RecordsDataContext);

  const [sortingValues, setSortingValues] = useState('newest');

  return (
    <div className="w-full">
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <Button
            onClick={() => handlerClick('left')}
            className={styles.arrowButton}
          >
            <ChevronLeft size={20} />
          </Button>
          <p>Last {differenceDays} Days</p>
          <Button
            onClick={() => handlerClick('right')}
            className={styles.arrowButton}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
        <RecordsSortingSelect setSortingValues={setSortingValues} />
      </div>
      {<RecordDateList sortingValues={sortingValues} />}
    </div>
  );
};
export default RecordsListTable;
