import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-200/20">
      <div className="p-4 border-b border-neutral-200/20">
        <div className="flex items-center">
          <span className="text-3xl text-sky-400 font-semibold">Bynry</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <Link
            to="/"
            className="block py-2.5 px-4 rounded transition duration-200 bg-blue-50 text-blue-700 font-medium"
          >
            Profiles
          </Link>
          <Link
            to="/add-user"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-50 text-gray-700"
          >
            Add User
          </Link>
          <a
            href="#map"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-50 text-gray-700"
          >
            Map
          </a>
          <a
            href="#search"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-50 text-gray-700"
          >
            Search
          </a>
          <a
            href="#settings"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-50 text-gray-700"
          >
            Settings
          </a>
          <a
            href="#help"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-50 text-gray-700"
          >
            Help
          </a>
        </div>
      </div>
      <div className="p-4 border-t border-neutral-200/20">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">User Profile</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;