const express = require("express");
const https = require("https");
const mongoose = require("mongoose");
const app = express();
const port = 3001;
const cors = require("cors");

// CORS Middleware'ini kullanarak frontend'den gelen istekleri kabul et
app.use(cors());
app.use(express.json()); // JSON formatında gelen verileri alabilmek için

// MongoDB bağlantısını sağla
mongoose.connect("mongodb://localhost:27017/flightsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB'de flight ID'lerini kaydedeceğimiz model
const FlightSchema = new mongoose.Schema({
  flightId: String, // Sadece flight ID'yi kaydetmek yeterli
});

const Flight = mongoose.model("Flight", FlightSchema);

// Uçuş verilerini API'den çeken ve sadece gerekli bilgileri dönen uçuş endpoint'i
app.get("/allFlights", (req, res) => {
  const options = {
    method: "GET",
    hostname: "api.schiphol.nl",
    path: "/public-flights/flights",
    headers: {
      ResourceVersion: "v4",
      app_id: "baad1327",
      app_key: "77644f8b9e00935b49642d930dc85390",
    },
  };

  // Uçuş verilerini API'den çek
  https
    .request(options, (response) => {
      let data = "";

      response.on("data", (chunk) => (data += chunk));

      response.on("end", () => {
        try {
          const jsonResponse = JSON.parse(data);
          const flights = jsonResponse.flights;

          // Sadece gerekli verileri çek
          const flightData = flights.map((flight) => ({
            id: flight.id,
            prefixIATA: flight.prefixIATA,
            destinationAirport: flight.route.destinations[0],
            departureTime: flight.scheduleDateTime,
            arrivalTime: flight.actualLandingTime,
            flightStates: flight.publicFlightState.flightStates,
          }));

          res.json(flightData); // Uçuşları frontend'e gönder
        } catch (error) {
          res.status(500).json({ error: "JSON verisi işlenemedi" });
        }
      });
    })
    .on("error", (error) => {
      res.status(500).json({ error: error.message });
    })
    .end();
});

// Uçuş ID'sini veritabanına kaydetmek için endpoint
app.post("/save-flight", async (req, res) => {
  const { flightId } = req.body;

  try {
    // Uçuş ID'sini veritabanına kaydet
    const newFlight = new Flight({ flightId });
    await newFlight.save();

    res.status(200).json({ message: "Uçuş başarıyla kaydedildi" });
  } catch (error) {
    res.status(500).json({ error: "Uçuş kaydedilemedi" });
  }
});

// /uçuşlarım sayfası için kaydedilen uçuşları getiren endpoint
app.get("/myFlights", async (req, res) => {
  try {
    // Veritabanından kaydedilen uçuş ID'lerini çek
    const savedFlights = await Flight.find();

    const flightDetailsPromises = savedFlights.map((savedFlight) => {
      return new Promise((resolve, reject) => {
        const flightId = savedFlight.flightId;

        // /flights/{id} API'sine istek atarak uçuşun detaylarını getir
        const options = {
          method: "GET",
          hostname: "api.schiphol.nl",
          path: `/public-flights/flights/${flightId}`,
          headers: {
            ResourceVersion: "v4",
            app_id: "baad1327",
            app_key: "77644f8b9e00935b49642d930dc85390",
          },
        };

        https
          .request(options, (response) => {
            let data = "";

            response.on("data", (chunk) => (data += chunk));

            response.on("end", () => {
              try {
                const flight = JSON.parse(data);

                let departureD = "UNKNOWN";
                let departureH = "UNKNOWN";
                if (flight.arrivalTime) {
                  const [datePart, timePart] = flight.departureTime.split("T");
                  departureD = datePart;
                  const [hours, minutes] = timePart.split(":");
                  departureH = `${hours}:${minutes}`; // '00:00' formatında
                }
                let arrivalD = "UNKNOWN";
                let arrivalH = "UNKNOWN";
                if (flight.arrivalTime) {
                  const [arrivalPart, arrivalTimePart] =
                    flight.arrivalTime.split("T");
                  arrivalD = arrivalPart;
                  const [arrivalHours, arrivalMinutes] =
                    arrivalTimePart.split(":");
                  arrivalH = `${arrivalHours}:${arrivalMinutes}`; // '00:00' formatında
                }

                // Sadece gerekli verileri frontend'e döndür
                resolve({
                  from: flight.prefixIATA, // Kalkış yeri
                  to: flight.route.destinations[0], // Varış yeri
                  departureDay: departureD, // Kalkış günü
                  departureHour: departureH, // Kalkış saati
                  arrivalDay: arrivalD, // Varış günü
                  arrivalHour: arrivalH, // Varış saati
                  price: 100, // Örnek fiyat, gerçek fiyatı buradan bulabilirsiniz
                });
              } catch (error) {
                reject("Uçuş detayları alınamadı");
              }
            });
          })
          .on("error", (error) => reject(error))
          .end();
      });
    });

    const flightDetails = await Promise.all(flightDetailsPromises);
    res.json(flightDetails); // Uçuşları frontend'e gönder
  } catch (error) {
    res.status(500).json({ error: "Uçuşlar alınamadı" });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
