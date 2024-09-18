import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import SearchForm from "./SearchForm";
import FlightCard from "./FlightCard";
import Sidebar from "./Sidebar";
import FilterPanel from "./FilterPanel";

const Anasayfa = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        axios
          .get("http://localhost:3001/flights")
          .then((response) => {
            const transformedFlights = response.data.map((flight) => {
              const id = flight.id 
              const from = flight.prefixIATA || "Unknown";
              const to = flight.destinationAirport || "Unknown";
              const [datePart, timePart] = flight.departureTime.split("T");
              const departureDay = datePart;
              const [hours, minutes] = timePart.split(":");
              const departureHour = `${hours}:${minutes}`; // '00:00' formatında
              const [arrivalPart, arrivalTimePart] = flight.arrivalTime.split("T");
              const arrivalDay = arrivalPart;
              const [arrivalHours, arrivalMinutes] = arrivalTimePart.split(":");
              const arrivalHour = `${arrivalHours}:${arrivalMinutes}`; // '00:00' formatında
              const stops = flight.flightStates
                ? flight.flightStates.length
                : 99;
              const price = Math.floor(Math.random() * (300 - 100 + 1)) + 100; // 100 ile 300 arasında random fiyat

              return {
                id,
                from,
                to,
                departureDay,
                departureHour,
                arrivalDay,
                arrivalHour,
                stops,
                price,
              };
            });
            setFlights(transformedFlights);
            setFilteredFlights(transformedFlights);
          })
          .catch((error) => console.error("Error fetching flights:", error));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleFilter = (filters) => {
    const { minPrice, maxPrice, sortOrder, arrivalHour, stops } = filters;
  
    const filterByArrivalHour = (arrivalHour, filter) => {
      const [filterStart, filterEnd] = filter.split("-");
      console.log("a")
      const [filterStartHour, filterStartMinute] = filterStart.split(":");
      const [filterEndHour, filterEndMinute] = filterEnd.split(":");
  
      const startTime = `${filterStartHour}:${filterStartMinute}`;
      const endTime = `${filterEndHour}:${filterEndMinute}`;
  
      return arrivalHour >= startTime && arrivalHour <= endTime;
    };
  
    let newFlights = flights.filter((flight) => {
      const isAboveMinPrice =
        minPrice !== null ? flight.price >= minPrice : true;
      const isBelowMaxPrice =
        maxPrice !== null ? flight.price <= maxPrice : true;
      
      // Saat dilimi filtreleme
      const isCorrectArrivalTime =
      arrivalHour
          ? filterByArrivalHour(flight.arrivalHour, arrivalHour)
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

  if (loading) {
    return <div>Loading flights...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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

export default Anasayfa;
