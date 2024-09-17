import React from 'react';
import NavBar from './components/NavBar.js';
import SearchForm from './components/SearchForm';
import FlightCard from './components/FlightCard';
import Sidebar from './components/Sidebar';

const flights = [
  { from: 'Milano', to: 'Madrid', departureTime: '7:30 AM', arrivalTime: '9:55 AM', price: 200 },
  { from: 'Milano', to: 'Madrid', departureTime: '8:30 PM', arrivalTime: '10:45 PM', price: 234 }
];

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="max-w-7xl mx-auto p-4">
        <SearchForm />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {flights.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))}
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default App;
