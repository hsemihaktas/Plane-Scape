import React, { useState } from 'react';

const FilterPanel = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [stops, setStops] = useState('');

  const handleFilter = () => {
    onFilter({
      minPrice: minPrice ? parseInt(minPrice, 10) : null,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : null,
      sortOrder: sortOrder,
      arrivalTime: arrivalTime,
      stops: stops
    });
  };

  return (
    <div className="mt-4 p-4 bg-white shadow-lg rounded-lg w-full max-h-[512px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Filter Flights</h2>

      {/* Fiyat Aralığı */}
      <div className="mb-4">
        <label className="block text-gray-700">Price Range:</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </div>
      </div>

      {/* Sort by Price */}
      <div className="mb-4">
        <label className="block text-gray-700">Sort by:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded-lg w-full"
        >
          <option value="">Select</option>
          <option value="ascending">Price: Low to High</option>
          <option value="descending">Price: High to Low</option>
        </select>
      </div>

      {/* Arrival Time */}
      <div className="mb-4">
        <label className="block text-gray-700">Arrival Time:</label>
        <div className="flex flex-col">
          <label className="flex items-center">
            <input
              type="radio"
              value="morning"
              checked={arrivalTime === 'morning'}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="mr-2"
            />
            5:00 AM - 11:59 AM
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="afternoon"
              checked={arrivalTime === 'afternoon'}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="mr-2"
            />
            12:00 PM - 5:59 PM
          </label>
        </div>
      </div>

      {/* Stops */}
      <div className="mb-4">
        <label className="block text-gray-700">Stops:</label>
        <div className="flex flex-col">
        <label className="flex items-center">
            <input
              type="radio"
              value=""
              checked={stops === ''}
              onChange={(e) => setStops(e.target.value)}
              className="mr-2"
            />
            All
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="nonstop"
              checked={stops === 'nonstop'}
              onChange={(e) => setStops(e.target.value)}
              className="mr-2"
            />
            Nonstop
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="1stop"
              checked={stops === '1stop'}
              onChange={(e) => setStops(e.target.value)}
              className="mr-2"
            />
            1 Stop
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="2stops"
              checked={stops === '2stops'}
              onChange={(e) => setStops(e.target.value)}
              className="mr-2"
            />
            2+ Stops
          </label>
        </div>
      </div>

      {/* Apply Filter Button */}
      <button
        onClick={handleFilter}
        className="bg-purple-600 text-white p-2 rounded-lg w-full"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default FilterPanel;
