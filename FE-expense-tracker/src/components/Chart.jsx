import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useContext } from 'react';
import { DataContext } from '@/pages/dashboard';

const styles = {
  card: 'h-[284px]',
  cardHeader: 'py-4 px-6 border-b-[1px]',
  cardContent: 'py-8 px-6 flex gap-4 justify-between ',
  chartContainer: 'h-[162px] w-full',
};

const chartConfig = {
  income: {
    label: 'Income',
    color: '#0166FF',
  },
  expense: {
    label: 'Expense',
    color: '#F54949',
  },
};
export const Chart = () => {
  const { getBarChartData } = useContext(DataContext);

  return (
    <Card className={styles.card}>
      <CardHeader className={styles.cardHeader}>
        <CardTitle className="text-[16px] ">Income - Expense</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <ChartContainer className={styles.chartContainer} config={chartConfig}>
          <BarChart accessibilityLayer data={getBarChartData}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#CBD5E1"
            />
            <YAxis stroke="#fff" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="#CBD5E1"
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="#0166FF" radius={4} barSize={14} />
            <Bar dataKey="expense" fill="#F54949" radius={4} barSize={14} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
