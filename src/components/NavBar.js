import React from 'react';

const NavBar = () => {
  return (
    <header className="flex justify-between p-4 bg-white shadow-md">
      <div className="text-purple-600 text-lg font-bold">PLANE SCAPE</div>
      <div className="flex space-x-4 items-center">
        <button className="text-gray-600">Deals</button>
        <button className="text-gray-600">Discover</button>
        <div className="flex items-center">
          <img src="./images/people.jpg" alt="user" className="rounded-full w-8 h-8"/>
          <span className="ml-2">Joane Smith</span>
        </div>
      </div>
    </header>
  );
};

export default NavBar;