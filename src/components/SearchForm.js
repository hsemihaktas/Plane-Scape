import React from 'react';

const SearchForm = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-4">
      <div className="grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="From"
          className="border p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="text"
          placeholder="To"
          className="border p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="date"
          className="border p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition duration-300">
          Show Flights
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
