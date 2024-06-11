import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { FaRegUser } from 'react-icons/fa';
import { GoHome } from 'react-icons/go';
import { GrTransaction } from 'react-icons/gr';
import { IoMdGift } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineShoppingBag } from 'react-icons/md';

interface SibarItemProps {
  title: string;
  icon: IconType;
  iconSize: number;
  link: string;
}
export const SibarItemPropsList: Array<SibarItemProps> = [
  { title: 'Dashboard', icon: GoHome, iconSize: 19, link: '/dashboard' },
  { title: 'Transactions', icon: GrTransaction, iconSize: 18, link: '/transactions' },
  { title: 'Top shops', icon: MdOutlineShoppingBag, iconSize: 19, link: '/top-shops' },
  { title: 'Top customers', icon: FaRegUser, iconSize: 17, link: '/top-customers' },
  { title: 'Promotions', icon: IoMdGift, iconSize: 19, link: '/promotions' },
  { title: 'Settings', icon: IoSettingsOutline, iconSize: 19, link: '/settings' },
];
const SideBar = ({ activeContentIndex }: { activeContentIndex: number }) => {
  return (
    <aside className="bg-white shadow-md p-12 pt-5 h-screen flex-col items-center min-w-[240px]">
      <div className="text-4xl font-bold text-vfoody-primary mb-1">VFoody.</div>
      <div className="text-zinc-400 text-lg font-medium">Admin Dashboard</div>
      <nav className="pt-12">
        <ul className="space-y-6">
          {SibarItemPropsList.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`flex pl-3 py-2 pr-8 rounded items-center w-full ${
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
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
