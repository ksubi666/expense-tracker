import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CategorySelectAdd,
  FoodIcon,
  GiftIcon,
  HouseIcon,
  ShoppingIcon,
  TaxiIcon,
} from './icon';
import {
  Beer,
  CarFront,
  CarTaxiFront,
  Cross,
  Ellipsis,
  Gift,
  House,
  Image,
  Landmark,
  PlaneTakeoff,
  Shirt,
  Utensils,
} from 'lucide-react';

export const icons = {
  Gift: <GiftIcon color="white" />,
  House: <HouseIcon color="white" />,
  Food: <FoodIcon color="white" />,
  Shopping: <ShoppingIcon color="white" />,
  Taxi: <TaxiIcon color="white" />,
  Drink: <Beer color="white" />,
  Insurance: <Cross color="white" fill="white" stroke="10" />,
  Vehicle: <CarFront color="white" />,
  Others: <Ellipsis color="white" fill="white" />,
  Bills: <Landmark color="white" fill="white" />,
  Image: <Image color="white" />,
  Plane: <PlaneTakeoff color="white" />,
};

const styles = {
  selectTrigger:
    'rounded-[8px] border-[#94A3B8] border-[1px] bg-[#F9FAFB] p-4 min-h-[57.5px] w-[84px]',
  selectGroup: 'grid grid-cols-3',
};

export const CategorySelect = ({ setIconData }) => {
  return (
    <Select onValueChange={(e) => setIconData(e)}>
      <SelectTrigger className={styles.selectTrigger}>
        <SelectValue placeholder={<CategorySelectAdd />} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className={styles.selectGroup}>
          <SelectItem value="House">
            <House color="#13376e" />
          </SelectItem>
          <SelectItem value="Gift">
            <Gift color="#13376e" />
          </SelectItem>
          <SelectItem value="Food">
            <Utensils color="#13376e" />
          </SelectItem>
          <SelectItem value="Shopping">
            <Shirt color="#13376e" />
          </SelectItem>
          <SelectItem value="Taxi">
            <CarTaxiFront color="#13376e" />
          </SelectItem>
          <SelectItem value="Drink">
            <Beer color="#13376e" />
          </SelectItem>
          <SelectItem value="Insurance">
            <Cross color="#13376e" />
          </SelectItem>
          <SelectItem value="Vehicle">
            <CarFront color="#13376e" />
          </SelectItem>
          <SelectItem value="Others">
            <Ellipsis color="#13376e" />
          </SelectItem>
          <SelectItem value="Bills">
            <Landmark color="#13376e" />
          </SelectItem>
          <SelectItem value="Image">
            <Image color="#13376e" />
          </SelectItem>
          <SelectItem value="Plane">
            <PlaneTakeoff color="#13376e" />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
