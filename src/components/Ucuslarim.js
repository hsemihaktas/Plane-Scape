import React, { useEffect, useState } from "react";
import axios from "axios";

const Ucuslarim = () => {
  const [flights, setFlights] = useState([]); // Uçuşları tutacak state
  const [loading, setLoading] = useState(true); // Yükleme durumu
  const [error, setError] = useState(null); // Hata durumu

  // Sayfa yüklendiğinde uçuşları getir
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:3001/ucuslarim");
        setFlights(response.data); // Uçuşları state'e kaydet
        setLoading(false); // Yükleme tamamlandığında loading'i false yap
      } catch (err) {
        setError("Uçuşlar getirilemedi.");
        setLoading(false); // Hata durumunda da yüklemeyi durdur
      }
    };

    fetchFlights(); // Uçuşları çek
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>; // Yüklenme durumu
  }

  if (error) {
    return <p>{error}</p>; // Hata durumu
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kaydedilen Uçuşlarım</h1>

      {flights.length === 0 ? (
        <p>Henüz kaydedilen uçuş yok.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {flights.map((flight, index) => (
            <div key={index} className="p-4 bg-white shadow-lg rounded-lg">
              <h3 className="font-bold text-xl">
                {flight.from} - {flight.to}
              </h3>
              <p className="text-gray-500 mt-1">
                Kalkış Günü: <span className="font-semibold">{flight.departureDay}</span>
              </p>
              <p className="text-gray-500">
                Kalkış Saati: <span className="font-semibold">{flight.departureHour}</span>
              </p>
              <p className="text-gray-500 mt-1">
                Varış Günü: <span className="font-semibold">{flight.arrivalDay}</span>
              </p>
              <p className="text-gray-500">
                Varış Saati: <span className="font-semibold">{flight.arrivalHour}</span>
              </p>
              <p className="text-gray-500">
                Fiyat: <span className="font-semibold">${flight.price}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ucuslarim;
