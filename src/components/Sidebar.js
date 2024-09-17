import React from 'react';

const Sidebar = () => {
  return (
    <div className="space-y-4 mt-4">
      {/* Car Rentals */}
      <div className="relative p-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <img src="./images/car-rental.jpg" alt="Car Rentals" className="rounded-lg w-full object-cover h-48"/>
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold px-2">Car Rentals</h3>
      </div>

      {/* Hotels */}
      <div className="relative p-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <img src="./images/hotels.jpg" alt="Hotels" className="rounded-lg w-full object-cover h-48"/>
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold px-2">Hotels</h3>
      </div>

      {/* Travel Packages */}
      <div className="relative p-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <img src="./images/travel-packages.jpg" alt="Travel Packages" className="rounded-lg w-full object-cover h-48"/>
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold px-2">Travel Packages</h3>
      </div>
    </div>
  );
};

export default Sidebar;
