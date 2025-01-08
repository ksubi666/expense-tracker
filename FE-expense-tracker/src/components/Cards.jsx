import { useContext, useEffect, useState } from 'react';
import { CardCircle } from './icon';
import { DashboardCard, BalanceCard } from '@/components';
import { DataContext } from '@/pages/dashboard';

const styles = { container: 'grid grid-cols-3 gap-6 max-h-[220px]' };

export const Cards = () => {
  const { getBarChartData, currency } = useContext(DataContext);

  const [prevTotal, setPrevTotal] = useState([]);
  const [nextTotal, setNextTotal] = useState([]);

  useEffect(() => {
    const lastIndex = getBarChartData.length;
    if (lastIndex <= 1) {
      setNextTotal(getBarChartData[0]);
      setPrevTotal(getBarChartData[0]);
    } else {
      const [prev, next] = getBarChartData.slice(lastIndex - 2, lastIndex);
      setPrevTotal(prev);
      setNextTotal(next);
    }
  }, []);

  return (
    <div className={styles.container}>
      <BalanceCard
        nextTotaltotalIncome={nextTotal ? nextTotal.income : 0}
        totalExpense={nextTotal ? nextTotal.expense : 0}
        currency={currency}
      />
      <DashboardCard
        header={'Your Income'}
        title={'Income'}
        total={nextTotal ? nextTotal.income : 0}
        totalLast={prevTotal ? prevTotal.income : 0}
        currency={currency}
        circle={<CardCircle color="#84CC16" />}
        colorArrow={'#84CC16'}
      />

      <DashboardCard
        header={'Total Expense'}
        title={'Expense'}
        total={nextTotal ? nextTotal.expense : 0}
        totalLast={prevTotal ? prevTotal.expense : 0}
        currency={currency}
        circle={<CardCircle color="#0166FF" />}
        colorArrow={'#0166FF'}
      />
    </div>
  );
};

export default Cards;
