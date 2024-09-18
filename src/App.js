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
    stops: "nonstop",
    price: 200,
  },
  {
    from: "Milano",
    to: "Madrid",
    departureTime: "8:30 PM",
    arrivalTime: "10:45 PM",
    stops: "1stop",
    price: 234,
  },
  {
    from: "Milano",
    to: "Paris",
    departureTime: "9:00 AM",
    arrivalTime: "11:30 AM",
    stops: "nonstop",
    price: 180,
  },
  {
    from: "Milano",
    to: "London",
    departureTime: "1:30 PM",
    arrivalTime: "4:00 PM",
    stops: "2stops",
    price: 250,
  },
];

const App = () => {
  const [filteredFlights, setFilteredFlights] = useState(flightsData);

  const handleFilter = (filters) => {
    const { minPrice, maxPrice, sortOrder, arrivalTime, stops } = filters;

    let newFlights = flightsData.filter((flight) => {
      const isAboveMinPrice =
        minPrice !== null ? flight.price >= minPrice : true;
      const isBelowMaxPrice =
        maxPrice !== null ? flight.price <= maxPrice : true;
      const isCorrectArrivalTime =
        arrivalTime === "morning"
          ? flight.arrivalTime >= "5:00 AM" && flight.arrivalTime <= "11:59 AM"
          : arrivalTime === "afternoon"
          ? flight.arrivalTime >= "12:00 PM" && flight.arrivalTime <= "5:59 PM"
          : true;
      const isCorrectStops = stops ? flight.stops === stops : true;

      return (
        isAboveMinPrice &&
        isBelowMaxPrice &&
        isCorrectArrivalTime &&
        isCorrectStops
      );
    });

    // Fiyat sıralaması
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
          <FilterPanel onFilter={handleFilter} />
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default App;
