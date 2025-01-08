import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { useRouter } from 'next/router';
import DashboardLogo from '../icon/DashboardLogo';
import { RecordAlertDialog } from '../RecordAlertDialog';

const styles = {
  ChildrenStyle: 'flex flex-col gap-6 w-[1200px] min-h-screen pb-10',
  ChildrenStyle2: 'flex flex-row gap-6 w-[1200px] min-h-screen pb-10',
  contentStyle: 'capitalize leading-6 text-[#0F172A] cursor-pointer',
  contentStyle2:
    'capitalize  leading-6 text-[#0F172A] font-semibold cursor-pointer',
};
const content = ['dashboard', 'records'];

export const Layout = ({ children, ChildStyle = false }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState();

  useEffect(() => {
    router.pathname === '/dashboard' ? setCurrentIndex(0) : setCurrentIndex(1);
  }, [router]);

  const [imageUrl, setImageUrl] = useState('');

  return (
    <div className="flex flex-col items-center bg-[#F3F4F6] gap-6">
      <div className="bg-white flex justify-center w-full">
        <div className="flex justify-between items-center py-[16px] w-[1200px]">
          <div className="flex items-center gap-6">
            <DashboardLogo onClick={() => router.push('/dashboard')} />
            {content.map((el, i) => (
              <p
                onClick={() => router.push(`/${el}`)}
                className={
                  i === currentIndex
                    ? styles.contentStyle2
                    : styles.contentStyle
                }
              >
                {el}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <RecordAlertDialog />
            <Avatar>
              <AvatarImage src={imageUrl} alt="" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <div
        className={ChildStyle ? styles.ChildrenStyle2 : styles.ChildrenStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
