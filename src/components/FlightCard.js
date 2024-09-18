import React from 'react';

const FlightCard = ({ flight }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
      {/* Flight details */}
      <div className="flex justify-between items-center">
        {/* Left side (Departure) */}
        <div className="text-left">
          <h3 className="font-bold text-xl">{flight.from} - {flight.to}</h3>
          <p className="text-gray-500 mt-1">
            Departure Hour: <span className="font-semibold">{flight.departureHour}</span>
          </p>
          <p className="text-gray-500">
            Departure Day: <span className="font-semibold">{flight.departureDay}</span>
          </p>
          <p className="text-gray-500">
            Airport: {flight.from}
          </p>
        </div>

        {/* Right side (Arrival) */}
        <div className="text-right">
          <p className="text-gray-500 mt-1">
            Arrival Hour: <span className="font-semibold">{flight.arrivalHour}</span>
          </p>
          <p className="text-gray-500">
            Arrival Day: <span className="font-semibold">{flight.arrivalDay}</span>
          </p>
          <p className="text-gray-500">
            Airport: {flight.to}
          </p>
        </div>
      </div>

      {/* Flight pricing and actions */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-500">Price:</p>
          <p className="text-xl font-bold text-purple-600">${flight.price}</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Book Flight</button>
      </div>

      {/* Check Details link */}
      <div className="mt-4">
        <button className="text-purple-600 underline">Check the details</button>
      </div>
    </div>
  );
};

export default FlightCard;
