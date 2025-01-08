import CheckboxRecord from './CheckboxRecord';
import { styles } from './RecordList';

const style = {
  container: 'flex flex-col gap-3',
  contentContainer:
    'w-full h-fit py-3 px-6 rounded-[12px] border-[1px] flex items-center justify-between bg-white',
};

export const CheckboxList = ({ id, content, amount, currency, transType }) => {
  return (
    <div className={style.container}>
      <div className={style.contentContainer}>
        <CheckboxRecord
          className="size-6"
          id={id}
          content={content}
          currency={currency}
        />
        <p
          className={
            transType == 'INC' ? styles.transTypeInc : styles.transTypeExp
          }
        >
          {transType == 'INC' ? '+' : '-'}
          {amount}
          {currency == 'USD' ? '$' : '₮'}
        </p>
      </div>
    </div>
  );
};

export default CheckboxList;
