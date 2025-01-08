import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Abstract, LogoWhite, Wi } from './icon';

const styles = {
  cardContainer: 'bg-[#0166FF] max-h-[220px] relative rounded-[18px]',
  cardFooter: 'items-end justify-between pr-[30px] pt-12',
  h1: 'text-base font-normal leading-6 text-[#FFFFFF] opacity-50',
  h2: 'text-2xl font-semibold text-white',
  abstractContainer: 'absolute right-0 bottom-0',
};

export const BalanceCard = ({
  nextTotaltotalIncome,
  totalExpense,
  currency,
}) => {
  return (
    <Card className={styles.cardContainer}>
      <CardHeader>
        <LogoWhite />
      </CardHeader>
      <CardFooter className={styles.cardFooter}>
        <div>
          <h1 className={styles.h1}>Cash</h1>
          <h2 className={styles.h2}>
            {nextTotaltotalIncome - totalExpense}
            {currency == 'USD' ? '$' : '₮'}
          </h2>
        </div>
        <Wi />
        <div className={styles.abstractContainer}>
          <Abstract />
        </div>
      </CardFooter>
    </Card>
  );
};

export default BalanceCard;
