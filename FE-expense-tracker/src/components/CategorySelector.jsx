import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AddCategory from './AddCategory';
import { icons } from './CategorySelect';

const styles = {
  iconBg:
    'flex items-center justify-center size-5 rounded-full bg-[#0166FF] p-1',
  selectTrigger: ' w-full bg-[#F3F4F6] border-[#D1D5DB] text-[#171717]',
  selectLabel: 'p-2 border-b',
  iconsContainer: 'flex gap-2 px-0.5',
};

export const CategorySelector = ({ categories }) => {
  return (
    <Select>
      <SelectTrigger className={styles.selectTrigger}>
        <SelectValue placeholder="Find or choose category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className={styles.selectLabel}>
            <AddCategory isAlerShow={true} />
          </SelectLabel>
          {categories &&
            categories.map((el) => (
              <SelectItem value={el.id}>
                <div className={styles.iconsContainer}>
                  <div className={styles.iconBg}>
                    {icons[el.category_image]}
                  </div>
                  <div>{el.name}</div>
                </div>
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
