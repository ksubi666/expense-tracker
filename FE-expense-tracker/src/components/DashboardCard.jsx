import { CircleArrowDown, CircleArrowUp } from './icon';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

const styles = {
  cardContainer: ' max-h-[220px] rounded-[18px]',
  cardHeader: 'border-b-[1px] p-0',
  header:
    'flex items-center gap-2 px-6 py-4 font-semibold leading-6 text-[#0F172A]',
  cardContent: 'px-6 py-5 flex flex-col gap-1',
  totalP: ' text-[36px] font-semibold leading-[48px]',
  title: 'text-lg leading-7 text-slate-500',
  cardFooter: 'flex gap-2',
  percentage: 'text-[18px] leading-7',
};

export const DashboardCard = ({
  header,
  totalLast,
  total,
  currency,
  circle,
  colorArrow,
  title,
}) => {
  const percentage = Math.floor((total / totalLast - 1) * 100);
  return (
    <Card className={styles.cardContainer}>
      <CardHeader className={styles.cardHeader}>
        <div className={styles.header}>
          {circle}
          {header}
        </div>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <p className={styles.totalP}>
          {total}
          {currency == 'USD' ? '$' : '₮'}
        </p>
        <p className={styles.title}>Your {title} Amount</p>
      </CardContent>
      <CardFooter className={styles.cardFooter}>
        {percentage > 0 ? (
          <CircleArrowUp colorArrow={colorArrow} />
        ) : (
          <CircleArrowDown colorArrow={colorArrow} />
        )}
        <p className={styles.percentage}>
          {total === 0 || totalLast === 0 ? 0 : percentage} % from last month
        </p>
      </CardFooter>
    </Card>
  );
};

export default Card;
