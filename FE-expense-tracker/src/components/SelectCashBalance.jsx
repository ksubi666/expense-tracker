import { Input } from '@/components/ui/input';
import { CashBalanceIcon } from './icon/CashBalanceIcon';

const styles = {
  container: 'flex flex-col items-center gap-4 mb-6',
  header: 'text-2xl font-semibold text-[#0F172A]',
  p: 'text-[12px] font-normal leading-4 mt-3 mb-8 text-[#475569]',
};

export const SelectCashBalance = () => {
  return (
    <div>
      <div className={styles.container}>
        <CashBalanceIcon />
        <h1 className={styles.header}>Set up your cash Balance</h1>
      </div>
      <Input placeholder="Email" className="w-[352px] " />
      <p className={styles.p}>How much cash do you have in your wallet?</p>
    </div>
  );
};
