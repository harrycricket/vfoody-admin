import Link from 'next/link';
import React, { useEffect } from 'react';
import { IconType } from 'react-icons';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineDashboard, MdOutlineReportProblem } from 'react-icons/md';
import { GrTransaction } from 'react-icons/gr';
import { IoMdGift } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsShop } from 'react-icons/bs';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

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
  { title: 'Quản lý báo cáo', icon: MdOutlineReportProblem, iconSize: 19, link: '/reports' },
  { title: 'Cài đặt', icon: IoSettingsOutline, iconSize: 19, link: '/settings' },
];
const SideBar = ({ activeContentIndex }: { activeContentIndex: number }) => {
  const router = useRouter();

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

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
          <Button className="w-full text-base" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </ul>
      </nav>
    </aside>
  );
};

export default React.memo(SideBar);
