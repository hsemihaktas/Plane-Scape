import React, { useState } from 'react';

const FilterPanel = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [arrivalHour, setArrivalHour] = useState('');
  const [stops, setStops] = useState();

  const handleFilter = () => {
    onFilter({
      minPrice: minPrice ? parseInt(minPrice, 10) : null,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : null,
      sortOrder: sortOrder,
      arrivalHour: arrivalHour,
      stops: parseInt(stops)
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
              value="00:00-00:30"
              checked={arrivalHour === '00:00-00:30'}
              onChange={(e) => setArrivalHour(e.target.value)}
              className="mr-2"
            />
            00:00 - 00:30
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="00:30-01:00"
              checked={arrivalHour === '00:30-01:00'}
              onChange={(e) => setArrivalHour(e.target.value)}
              className="mr-2"
            />
            00:30 - 01:00
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
              value=''
              checked={stops === ''}
              onChange={(e) => setStops(e.target.value)}
              className="mr-2"
            />
            All
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value={99}
              checked={stops === '99'}
              onChange={(e) => setStops(e.target.value)}
              className="mr-2"
            />
            Nonstop
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value={1}
              checked={stops === '1'}
              onChange={(e) => setStops(e.target.value)}
              className="mr-2"
            />
            1 Stop
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value={2}
              checked={stops === '2'}
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
