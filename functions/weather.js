const functions = require("firebase-functions");
const fetch = require("node-fetch");
const admin = require("firebase-admin");
admin.initializeApp();


const ENDPOINT =
  "http://localhost:5001/footprint-af482/us-central1/getWeatherTrigger";

exports.updateWeatherTrigger = functions.firestore
  .document("walks/{id}")
  .onCreate(async (snap, context) => {
    const { location } = snap.data();
    const body = JSON.stringify({ location });

    const response = await fetch(ENDPOINT, { method: "POST", body });
    
    const weather = await response.json();
    return snap.ref.update(weather);
  });

exports.getWeatherTrigger = functions.https.onRequest((req, res) => {
  const { location } = JSON.parse(req.body);
  const WEATHER_MAP = {
    "Washington, DC": 23.4,
    "Paris, France": 21.4,
    "London, England": 19.4
  };
  console.log(req.body, JSON.parse(req.body), location);

  const weather = WEATHER_MAP[location];
  res.json({
    weather,
    metric: "celsuis"
  });
});
