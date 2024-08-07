import { Avatar, Badge, Input } from '@nextui-org/react';
import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { IoIosSearch, IoMdNotificationsOutline } from 'react-icons/io';

const Header = () => {
  return (
    <div className="flex gap-5 justify-between items-center pl-4 pr-4">
      <div className="relative bg-white flex-1">
        <Input
          disabled
          type="text"
          placeholder="Search..."
          className="w-full"
          startContent={<IoIosSearch className="text-gray-400" />}
        />
      </div>
      <div className="flex gap-4 justify-between items-center px-4">
        <div className="flex justify-center items-center h-[32px] w-[32px] bg-vfoody-primary bg-opacity-10 rounded-lg">
          <FiSettings size={21} className="text-primary" />
        </div>

        <div className="flex justify-center items-center h-[32px] w-[32px] bg-blue-100 rounded-lg">
          <Badge content="5" color="primary">
            <IoMdNotificationsOutline size={24} className="text-blue-600" />
          </Badge>
        </div>
      </div>
      <div className="flex gap-1 justify-between items-center self-stretch my-auto text-base text-gray-700">
        <div className="justify-center px-2 py-1 my-auto">
          Hello, <span className="font-semibold">Duy Đức</span>
        </div>
        <Avatar src="https://avatars.githubusercontent.com/u/90080923?v=4" size="sm" />
      </div>
    </div>
  );
};

export default Header;
