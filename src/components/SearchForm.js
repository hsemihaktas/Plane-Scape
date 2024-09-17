import React from 'react';

const SearchForm = () => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
      <div className="flex space-x-4">
        <input type="text" placeholder="From" className="border p-2 rounded-lg w-full"/>
        <input type="text" placeholder="To" className="border p-2 rounded-lg w-full"/>
        <input type="date" className="border p-2 rounded-lg w-full"/>
        <button className="bg-purple-600 text-white p-2 rounded-lg">Show Flights</button>
      </div>
    </div>
  );
};

export default SearchForm;
