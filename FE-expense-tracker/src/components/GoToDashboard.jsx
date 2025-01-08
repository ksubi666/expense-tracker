import { CorrectIcon } from '@/components/icon/CorrectIcon';

const styles = {
  container: 'flex flex-col items-center gap-4 mb-6',
  header: 'text-2xl font-semibold text-[#0F172A]',
  p: 'text-[16px] text-center font-normal leading-4 mt-3 mb-8 text-[#475569]',
};

export const GoToDashboard = () => {
  return (
    <div>
      <div className={styles.container}>
        <CorrectIcon />
        <h1 className={styles.header}>Good Job!</h1>
      </div>
      <p className={styles.p}>
        Your very first account has been created. Now continue to dashboard and
        start tracking
      </p>
    </div>
  );
};
