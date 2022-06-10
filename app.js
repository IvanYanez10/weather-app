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
  res.render("home");
});

app.post("/", function(req, res){
  const city = req.body.cityName;
  const appkey = process.env.WEATHERAPP_KEY;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appkey + "&units=" + units;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weatherCity = {
        "coord": weatherData['coord'],
        "weather": weatherData['weather'],
        "temp": weatherData['main']['temp'],
      };
      res.render("weatherByCity", { weatherCity: weatherCity });
    });
  });
});

app.listen(3000, function(){
  console.log("Server started at port 3000");
});
