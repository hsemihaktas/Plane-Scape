import React from 'react';

const FlightCard = ({ flight }) => {
  const handlePurchase = () => {
    window.location.href = '/ucuslarim';
    // Send flight.id to the server for saving
    // fetch('/save-flight', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ flightId: flight.id }),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Flight saved:', data);
    //     // Optionally, redirect to the saved flights page
    //     window.location.href = '/ucuslarim';
    //   })
    //   .catch(error => {
    //     console.error('Error saving flight:', error);
    //   });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <h3 className="font-bold text-xl">{flight.from} - {flight.to}</h3>
          <p className="text-gray-500 mt-1">Departure Hour: <span className="font-semibold">{flight.departureHour}</span></p>
          <p className="text-gray-500">Departure Day: <span className="font-semibold">{flight.departureDay}</span></p>
          <p className="text-gray-500">Airport: {flight.from}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 mt-1">Arrival Hour: <span className="font-semibold">{flight.arrivalHour}</span></p>
          <p className="text-gray-500">Arrival Day: <span className="font-semibold">{flight.arrivalDay}</span></p>
          <p className="text-gray-500">Airport: {flight.to}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-500">Price:</p>
          <p className="text-xl font-bold text-purple-600">${flight.price}</p>
        </div>
        <button onClick={handlePurchase} className="bg-purple-600 text-white px-4 py-2 rounded-lg">
          Purchase
        </button>
      </div>
      <div className="mt-4">
        <button className="text-purple-600 underline">Check the details</button>
      </div>
    </div>
  );
};

export default FlightCard;
