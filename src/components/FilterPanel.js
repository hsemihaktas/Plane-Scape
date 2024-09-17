import React, { useState } from 'react';

const FilterPanel = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // Artan veya azalan sıralama

  const handleFilter = () => {
    onFilter({
      minPrice: minPrice ? parseInt(minPrice, 10) : null,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : null,
      sortOrder: sortOrder, // Artan veya azalan seçeneği gönderiliyor
    });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg space-y-4 mt-4">
      <h2 className="text-xl font-bold mb-4">Filter Flights</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Min Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded-lg w-full"
          placeholder="Enter minimum price"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Max Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded-lg w-full"
          placeholder="Enter maximum price"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Sort by Price:</label>
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
