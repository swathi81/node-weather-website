const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define path for Express config
const publicRepositoryPath = path.join(__dirname, "../public");
const view = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setup  for handle bars engine and views location
app.set("view engine", "hbs");
app.set("views", view);
hbs.registerPartials(partialPath);

//setUp for static directory to serve
app.use(express.static(publicRepositoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "swathi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Swathi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Get the help regarding the weather condition from our app !",
    name: "Swathi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an Adress ",
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search name",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Swathi",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Swathi",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("SErver is up on port 3000 ");
});
