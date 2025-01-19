import React, { useContext, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";
import { StoreContext } from "../context/StoreContext";

const Home = () => {
  const { filteredProfiles, searchProfiles } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("name");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchProfiles(query, filterType);
  };

  const handleFilterTypeChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    searchProfiles(searchQuery, type);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <header className="sticky top-0 z-30 bg-white border-b border-neutral-200/20 p-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-indigo-600">Profiles</h1>
            <div className="flex items-center space-x-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search profiles..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200/30 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="absolute left-3 top-2.5 text-neutral-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={filterType}
                    onChange={handleFilterTypeChange}
                    className="px-4 py-2 rounded-lg border border-neutral-200/30 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="name">Filter by name</option>
                    <option value="location">Filter by location</option>
                  </select>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
        <div className="p-5">
          {filteredProfiles.length > 0 ? (
            <div className="grid grid-cols-3 sm:flex-row sm:items-center sm:justify-between gap-6">
              {filteredProfiles.map((profile, index) => (
                <ProfileCard key={index} profile={profile} />
              ))}
            </div>
          ) : (
            <div className="text-center text-neutral-600">
              No data found
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;