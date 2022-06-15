require('dotenv').config();
var express = require('express');
const https = require('https');
const ejs = require("ejs");
const bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/', function(req, res) {
  const defaultCity = 'Mexico';
  const appkey = process.env.WEATHERAPP_KEY;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + defaultCity + "&appid=" + appkey + "&units=" + units;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weatherCity = {
        "city": defaultCity,
        "coord": weatherData['coord'],
        "weather": weatherData['weather'],
        "temp": Math.round(weatherData['main']['temp']),
      };
      res.render("home", { weatherCity: weatherCity });
    });
  });
});

//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
app.post("/", function(req, res){
  const city = req.body.data;
  console.log(city);
  const appkey = process.env.WEATHERAPP_KEY;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appkey + "&units=" + units;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weatherCity = {
        "coord": weatherData['coord'],
        "weather": weatherData['weather'],
        "temp": Math.round(weatherData['main']['temp']),
      };
      res.render("weatherByCity", { weatherCity: weatherCity });
    });
  });
});

app.listen(3000, function(){
  console.log("Server started at port 3000");
});
