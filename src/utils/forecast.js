const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=60571e5961791058108482e0ad069255&query= " +
    latitude +
    "," +
    longitude +
    "units=c";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.feelslike +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
