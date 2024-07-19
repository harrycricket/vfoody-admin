import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons';
import { BsShop } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';
import { GrTransaction } from 'react-icons/gr';
import { IoMdGift } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineDashboard, MdOutlineReportProblem } from 'react-icons/md';
import { PiHandWithdraw } from 'react-icons/pi';

interface SibarItemProps {
  title: string;
  icon: IconType;
  iconSize: number;
  link: string;
}
export const SibarItemPropsList: Array<SibarItemProps> = [
  { title: 'Thống kê tổng quan', icon: MdOutlineDashboard, iconSize: 19, link: '/dashboard' },
  { title: 'Quản lý giao dịch', icon: GrTransaction, iconSize: 18, link: '/transactions' },
  { title: 'Quản lý cửa hàng', icon: BsShop, iconSize: 19, link: '/shops' },
  { title: 'Quản lý tài khoản', icon: FaRegUser, iconSize: 17, link: '/accounts' },
  { title: 'Quản lý khuyến mãi', icon: IoMdGift, iconSize: 19, link: '/promotions' },
  { title: 'Yêu cầu rút tiền', icon: PiHandWithdraw, iconSize: 19, link: '/withdraws' },
  { title: 'Quản lý báo cáo', icon: MdOutlineReportProblem, iconSize: 19, link: '/reports' },
  { title: 'Cài đặt', icon: IoSettingsOutline, iconSize: 19, link: '/settings' },
];
const SideBar = ({ activeContentIndex }: { activeContentIndex: number }) => {
  const router = useRouter();

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     router.push('/login');
  //   }
  // }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <aside className="bg-white shadow-md p-6 pt-5 h-screen flex-col items-center min-w-[240px]">
      <div className="text-4xl font-bold text-primary text-center">VFoody</div>
      <nav className="pt-6">
        <ul className="space-y-6">
          {SibarItemPropsList.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`flex pl-3 py-2 pr-8 rounded-xl items-center w-full ${
                  activeContentIndex === index
                    ? 'text-red-500 bg-red-100 font-medium hover:text-red-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon size={item.iconSize} />
                <span className="text-lg ml-2">{item.title}</span>
              </Link>
            </li>
          ))}
          <Button
            className="w-full font-medium text-base hover:text-primary hover:bg-red-100"
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </ul>
      </nav>
    </aside>
  );
};

export default React.memo(SideBar);
