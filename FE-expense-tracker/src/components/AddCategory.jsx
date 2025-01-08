import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { PlusIcon, ArrowDropDown, CategorySelectAdd } from './icon';
import { X } from 'lucide-react';
import { useRef, useState } from 'react';
import CategorySelect from './CategorySelect';
import { axiosInstance } from '@/lib/axios';

const styles = {
  isAlertShow: 'bg-white flex gap-2 leading-6 ',
  isAlertShowFalse:
    'bg-[#F9FAFB] h-8 flex items-center justify-center gap-1 rounded-[20px] leading-6 ',
  alerDialogContent: 'min-w-[466px] h-fit p-0',
  alertDialogHeader:
    'border-b-[1px] px-6 py-5 flex flex-row justify-between items-center',
  alertDialogCancel: 'border-0 p-0 items-start hover:bg-white',
  form: 'p-4 rounded-[8px] bg-[#F9FAFB] border-[#94A3B8] border-[1px] flex items-center justify-between w-full',
  input: 'bg-[#F9FAFB] outline-none',
  alertDialogAction:
    'w-full bg-[#16A34A] hover:bg-[#16A34A] rounded-[20px] text-white',
  contentContainer: 'flex flex-col gap-8 p-6 w-full',
  subContainer: 'flex items-center w-full gap-3',
};

export const AddCategory = ({ isAlerShow = false }) => {
  const [iconData, setIconData] = useState();
  const formRef = useRef();

  const handlerClick = async () => {
    await axiosInstance.post('/category/create', {
      name: formRef.current[0].value,
      description: formRef.current[0].value,
      category_image: iconData,
    });
    isAlerShow ? console.log('kk') : location.reload();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={isAlerShow ? styles.isAlertShow : styles.isAlertShowFalse}
      >
        {isAlerShow ? <CategorySelectAdd /> : <PlusIcon color="#0166FF" />}
        Add Category
      </AlertDialogTrigger>
      <AlertDialogContent className={styles.alerDialogContent}>
        <AlertDialogHeader className={styles.alertDialogHeader}>
          <AlertDialogTitle>Add Category</AlertDialogTitle>
          <AlertDialogCancel className={styles.alertDialogCancel}>
            <X />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div className={styles.contentContainer}>
          <div className={styles.subContainer}>
            <CategorySelect setIconData={setIconData} />
            <form ref={formRef} className={styles.form}>
              <input className={styles.input} />
              <ArrowDropDown />
            </form>
          </div>
          <AlertDialogAction
            onClick={handlerClick}
            className={styles.alertDialogAction}
          >
            Continue
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCategory;
