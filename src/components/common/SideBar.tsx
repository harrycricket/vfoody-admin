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
}
export const SibarItemPropsList: Array<SibarItemProps> = [
  { title: 'Dashboard', icon: GoHome, iconSize: 19 },
  { title: 'Transactions', icon: GrTransaction, iconSize: 18 },
  { title: 'Top shops', icon: MdOutlineShoppingBag, iconSize: 19 },
  { title: 'Top customers', icon: FaRegUser, iconSize: 17 },
  { title: 'Promotions', icon: IoMdGift, iconSize: 19 },
  { title: 'Settings', icon: IoSettingsOutline, iconSize: 19 },
];
const SideBar = ({ activeContentIndex }: { activeContentIndex: number }) => {
  return (
    <aside className="bg-white shadow-md p-12 pt-5 h-screen flex-col items-center min-w-[240px]">
      <div className="text-4xl font-bold text-vfoody-primary mb-1">VFoody.</div>
      <div className="text-zinc-400 text-lg font-medium">Admin Dashboard</div>
      <nav className="pt-10">
        <ul className="space-y-6">
          {SibarItemPropsList.map((item, index) => (
            <li
              key={index}
              className={`flex pl-2 pt-2 pb-2 rounded pr-8 items-center ${
                activeContentIndex === index
                  ? 'text-red-500 bg-red-100 font-medium'
                  : 'text-gray-600'
              }`}
            >
              <item.icon size={item.iconSize} />
              <span className="text-lg ml-2">{item.title}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
