import { CurrencyIcon } from '@/components/icon/CurrencyIcon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const styles = {
  headerContainer: 'flex flex-col items-center gap-4 mb-6',
  header: 'text-2xl font-semibold text-[#0F172A]',
  selectTrigger: 'w-full h-[64px] p-4 text-[16px] font-semibold',
  p: 'text-[12px] font-normal leading-4 mt-3 mb-8 text-[#475569]',
};

export const CurrencyType = ({ setOnboard }) => {
  return (
    <div>
      <div className={styles.headerContainer}>
        <CurrencyIcon />
        <h1 className={styles.header}>Select base currency</h1>
      </div>
      <Select onValueChange={(e) => setOnboard(e)}>
        <SelectTrigger className={styles.selectTrigger}>
          <SelectValue placeholder="MNT - Mongolian Tugrik" />
        </SelectTrigger>
        <SelectContent className="text-[16px] font-semibold">
          <SelectItem value="MNT">MNT - Mongolian Tugrik</SelectItem>
          <SelectItem value="USD">USD - US Dollar</SelectItem>
        </SelectContent>
      </Select>
      <p className={styles.p}>
        Your base currency should be the one you use most often. All transaction
        in other currencies will be calculated based on this one
      </p>
    </div>
  );
};
