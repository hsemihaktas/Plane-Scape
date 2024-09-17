import React, { useState } from "react";
import NavBar from "./components/NavBar";
import SearchForm from "./components/SearchForm";
import FlightCard from "./components/FlightCard";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";

const flightsData = [
  {
    from: "Milano",
    to: "Madrid",
    departureTime: "7:30 AM",
    arrivalTime: "9:55 AM",
    price: 200,
  },
  {
    from: "Milano",
    to: "Madrid",
    departureTime: "8:30 PM",
    arrivalTime: "10:45 PM",
    price: 234,
  },
];

const App = () => {
  const [filteredFlights, setFilteredFlights] = useState(flightsData);

  const handleFilter = (filters) => {
    const { minPrice, maxPrice, sortOrder } = filters;

    let newFlights = flightsData.filter((flight) => {
      const isAboveMinPrice =
        minPrice !== null ? flight.price >= minPrice : true;
      const isBelowMaxPrice =
        maxPrice !== null ? flight.price <= maxPrice : true;
      return isAboveMinPrice && isBelowMaxPrice;
    });

    // Fiyat sıralamasını uyguluyoruz
    if (sortOrder === "ascending") {
      newFlights = newFlights.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "descending") {
      newFlights = newFlights.sort((a, b) => b.price - a.price);
    }

    setFilteredFlights(newFlights);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="max-w-7xl mx-auto p-4">
        <SearchForm />
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2">
            {filteredFlights.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))}
          </div>
          <div>
            <FilterPanel onFilter={handleFilter} />
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
