const express = require("express");
const https = require("https");
const app = express();
const port = 3001;
var cors = require('cors')

app.use(cors()) 

app.get("/flights", (req, res) => {
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

  https
    .request(options, (response) => {
      let data = "";

      response.on("data", (chunk) => (data += chunk));

      response.on("end", () => {
        try {
          const jsonResponse = JSON.parse(data);
          const flights = jsonResponse.flights;

          // Sadece gerekli verileri çekme
          const flightData = flights.map((flight) => ({
            prefixIATA: flight.prefixIATA,
            destinationAirport: flight.route.destinations[0],
            departureTime: flight.scheduleDateTime,
            arrivalTime: flight.actualLandingTime,
            flightStates: flight.publicFlightState.flightStates,
          }));

          res.json(flightData);
        } catch (error) {
          res.status(500).json({ error: "Failed to parse JSON" });
        }
      });
    })
    .on("error", (error) => {
      res.status(500).json({ error: error.message });
    })
    .end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
