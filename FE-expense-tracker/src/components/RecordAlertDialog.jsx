import { useEffect, useRef, useState } from 'react';
import { PlusIcon, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DatePicker } from './DatePicker';
import { axiosInstance } from '@/lib/axios';
import CategorySelector from './CategorySelector';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const styles = {
  button1default:
    'w-full px-3 text-white rounded-[20px] bg-[#0166FF] hover:bg-[#0166FF]',
  button1focus:
    'w-full px-3 text-[#1F2937] rounded-[20px] bg-[#F3F4F6] hover:bg-[#F3F4F6]',
  button2default:
    'w-full bg-[#F3F4F6] hover:bg-[#F3F4F6] rounded-[20px] text-[#1F2937]',
  button2focus:
    'w-full bg-[#16A34A] hover:bg-[#16A34A] rounded-[20px] text-white',
  dialogTrigger:
    'bg-[#0166FF] h-8 text-white flex items-center justify-center gap-1 px-3 rounded-[20px] leading-6',
  dialogContent: 'min-w-[744px] h-fit p-0 ',
  dialogHeader:
    'border-b-[1px] px-6 py-5 flex flex-row justify-between items-center',
  dialogCancel: 'border-0 p-0 items-start hover:bg-white',
  nameInput: 'bg-[#F3F4F6] border-[#D1D5DB] text-[#171717] mt-1 mb-5 ',
  noteInput: 'h-full w-full bg-[#F3F4F6] border-[#D1D5DB] text-[#171717] mt-1 ',
  amountInput:
    'bg-[#F3F4F6] py-3 px-4 rounded-[8px] border-[#D1D5DB] border-[1px] w-full outline-none',
  form: 'grid grid-cols-2',
  container: 'p-6 pt-5 flex flex-col gap-1',
  container2: 'flex flex-col gap-5',
  buttonContainer: 'flex bg-[#F3F4F6] rounded-[20px] mb-5',
  containers: 'flex flex-col gap-2',
};

export const RecordAlertDialog = ({ isButtonName = 'Record' }) => {
  const [buttonStyles, setButtonStyles] = useState(styles.button1default);
  const [buttonStyles2, setButtonStyles2] = useState(styles.button2default);
  const [transType, setTransType] = useState('EXP');
  const [categories, setCategories] = useState();
  const formRef = useRef();

  useEffect(() => {
    {
      axiosInstance.get('/category/').then((response) => {
        setCategories(response.data);
      });
    }
  }, []);

  const buttonHandler = () => {
    setButtonStyles(styles.button1default);
    setButtonStyles2(styles.button2default);
    setTransType('EXP');
  };
  const buttonHandler2 = () => {
    setButtonStyles2(styles.button2focus);
    setButtonStyles(styles.button1focus);
    setTransType('INC');
  };
  const handlerClick = async () => {
    let user = localStorage.getItem('user');
    const data = JSON.parse(user);
    const userId = data.user.id;
    await axiosInstance.post('/record/create', {
      user_id: userId,
      name: formRef.current[7].value,
      amount: formRef.current[2].value,
      transaction_type: transType,
      description: formRef.current[8].value,
      category_id: formRef.current[4].value,
    });
    location.reload();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className={styles.dialogTrigger}>
        <PlusIcon />
        {isButtonName}
      </AlertDialogTrigger>
      <AlertDialogContent className={styles.dialogContent}>
        <AlertDialogHeader className={styles.dialogHeader}>
          <AlertDialogTitle>Add Record</AlertDialogTitle>
          <AlertDialogCancel className={styles.dialogCancel}>
            <X />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <form ref={formRef} className={styles.form}>
          <div className={styles.container}>
            <div className={styles.buttonContainer}>
              <Button
                type="button"
                className={buttonStyles}
                onClick={buttonHandler}
              >
                Expense
              </Button>
              <Button
                type="button"
                className={buttonStyles2}
                onClick={buttonHandler2}
              >
                Income
              </Button>
            </div>
            <div className={styles.container2}>
              <div className={styles.containers}>
                <p className="text-[#171717]">Amount</p>
                <input
                  name="amount"
                  type="number"
                  className={styles.amountInput}
                  placeholder="1'000'00"
                />
              </div>
              <div className={styles.containers}>
                <h1>Category</h1>
                <CategorySelector name="category" categories={categories} />
              </div>
              <div className={styles.containers}>
                <h1>Date</h1>
                <DatePicker />
              </div>
              <AlertDialogAction
                onClick={handlerClick}
                className={
                  buttonStyles == styles.button1default
                    ? styles.button1default
                    : styles.button2focus
                }
              >
                Add Record
              </AlertDialogAction>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.containers}>
              <h1>Name</h1>
              <Input className={styles.nameInput} name="Name" />
            </div>
            <h2>Note</h2>
            <Input className={styles.noteInput} name="Note" />
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialog;
