import { Style } from '@/components/Constants';
import { Slider } from '@/components/ui/slider';
import {
  MenuCheckbox,
  AddCategory,
  RecordAlertDialog,
  styles,
  icons,
} from '@/components';
import { useContext, useEffect, useState } from 'react';
import { Eye, Leading } from './icon';
import { Input } from './ui/input';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import { RecordsDataContext } from '@/pages/records';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { Button } from './ui/button';

const style = {
  commandContainer:
    'w-[350px] h-fit border-[#E5E7EB] bg-[#F9FAFB] border-[1px] rounded-[12px] px-4 py-6 flex gap-6 ',
  header: 'text-[24px] font-semibold text-[#0F172A]',
  contentContainer:
    'flex items-center cursor-pointer justify-between hover:bg-[#E5E7EB] rounded-sm px-1 py-1',
  sliderInputContainer: 'flex gap-3 pb-3',
  sliderInput: 'bg-[#F3F4F6] border-[#D1D5DB] text-[#0F172A] outline-none',
  SliderTextContainer: 'flex justify-between px-1.5 text-[16px] leading-6',
};

export const CategoryMenu = () => {
  const {
    recordData,
    categories,
    setCategoryValue,
    setFilteredData,
    searchInput,
    transType,
    currency,
  } = useContext(RecordsDataContext);

  const [sortedCategories, setSortedCategories] = useState();
  const [onChangeValue, setOnChangeValue] = useState(200000);
  const [inputText, setInputText] = useState('');
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const sort = orderBy(categories, [(category) => category.name], ['asc']);

    setSortedCategories(sort);
  }, []);

  const handlerClear = () => {
    const groupedData = groupBy(
      recordData,
      (record) => record.createdat.split('T')[0]
    );
    setFilteredData(groupedData);
  };

  const handlerClick = (name) => {
    setCategoryValue(name);
  };
  const handlerInput = () => {
    setIsShow(!isShow);
  };
  const search =
    searchInput &&
    searchInput.filter((el, i) =>
      el.name.toLowerCase().includes(inputText.toLowerCase())
    );

  return (
    <Command className={style.commandContainer}>
      <h1 className={style.header}>Records</h1>
      <RecordAlertDialog isButtonName={'Add'} />
      <div className={Style.buttonStyle3}>
        <CommandInput
          onClick={handlerInput}
          onValueChange={(e) => setInputText(e)}
          placeholder="Search"
        />
        {isShow && (
          <div className="max-h-[550px] overflow-auto absolute left-0 top-8 min-w-[240px] border-[#D1D5DB] bg-[#F9FAFB] border-[1px] rounded-2xl">
            {search.map((el) => (
              <div className="px-4 py-2 border-b flex flex-col gap-2 last:border-b-0">
                <p className=" text-xs">{el.categoryimage}</p>
                <div className="flex justify-between">
                  <h3 className="text-[#1F2937] font-medium">{el.name}</h3>
                  <p
                    className={
                      el.transaction_type == 'INC'
                        ? `${styles.transTypeInc} text-sm font-normal`
                        : `${styles.transTypeExp} text-sm font-normal`
                    }
                  >
                    {el.transaction_type == 'INC' ? '+' : '-'}
                    {el.amount}
                    {currency == 'USD' ? '$' : '₮'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <CommandList>
        <CommandGroup heading="Types">
          <MenuCheckbox />
        </CommandGroup>
        <CommandGroup>
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">Category</h1>
            <Button
              onClick={handlerClear}
              className="bg-[#F9FAFB] text-gray-400 font-normal p-0"
            >
              Clear
            </Button>
          </div>
          {sortedCategories &&
            sortedCategories.map((el) => (
              <div
                onClick={() => handlerClick(el.id)}
                className={style.contentContainer}
              >
                <div className="flex items-center ">
                  <Eye />
                  <p className="px-3 py-1">{el.name}</p>
                </div>
                <Leading />
              </div>
            ))}
          <AddCategory />
        </CommandGroup>
        <CommandGroup heading="Amount Range">
          <div className={style.sliderInputContainer}>
            <Input
              className={style.sliderInput}
              defaultValue="0"
              type="number"
            />
            <Input
              className={style.sliderInput}
              defaultValue={onChangeValue}
              value={onChangeValue}
              onChange={(e) => setOnChangeValue(e.target.value)}
              type="number"
            />
          </div>
          <Slider
            onValueChange={(e) => setOnChangeValue(e)}
            defaultValue={[onChangeValue]}
            max={500000}
            step={1}
          />
          <div className={style.SliderTextContainer}>
            <p>0</p>
            <p>{onChangeValue}</p>
          </div>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default CategoryMenu;
