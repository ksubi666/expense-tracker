import { Checkbox } from '@/components/ui/checkbox';

const style = {
  container: 'items-top flex space-x-2 items-center gap-2',
  labelContainer: 'grid gap-1.5 leading-none',
  label:
    'text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1F2937] text-[16px] font-normal',
  currencyTrue: 'border-[#E5E7EB] opacity: 0.2 rounded-sm size-6',
  currencyFalse: 'border-[#E5E7EB] opacity: 0.2 rounded-full',
};

export const CheckboxRecord = ({
  id,
  content,
  setTypeValue,
  typeValue,
  currency,
}) => {
  return (
    <div className={style.container}>
      <Checkbox
        onClick={() => setTypeValue && setTypeValue(id)}
        checked={typeValue && typeValue === id}
        id={id}
        className={currency ? style.currencyTrue : style.currencyFalse}
      />
      <div className={style.labelContainer}>
        <label htmlFor={id} className={style.label}>
          {content}
        </label>
      </div>
    </div>
  );
};

export default CheckboxRecord;
