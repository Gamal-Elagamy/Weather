var httpReq = new XMLHttpRequest();

httpReq.open("GET", "https://api.weatherapi.com/v1/forecast.json?key=d55ad68be0544f78988140529240612&q=assiut&days=3");

httpReq.responseType = "json";

httpReq.send();

httpReq.addEventListener("load", function () {

  var weather = httpReq.response;

  if (weather) {

    var cartoona = "";
    var forecast = weather.forecast.forecastday; 

    for (var i = 0; i < forecast.length; i++) {

      cartoona += `
        <div class="card col-lg-12 " style="background-color: rgb(45, 47, 56);">
          <div class="header d-flex justify-content-between fs-5 pt-3">
            <div class="day me-auto">${new Date(forecast[i].date).toLocaleDateString("en-US",{ weekday: "long" })}</div>
            <div class="date">${forecast[i].date}</div>
          </div>
          <div class="card-body text-white">
            <h5 class="city card-title mt-2 mb-3">${weather.location.name}</h5>
            <div class="number fw-bold d-flex">
              <div class="num">${forecast[i].day.avgtemp_c}</div>
              <div>°C</div>
            </div>
            <img src="https://${forecast[i].day.condition.icon}" alt="Weather Icon">
            <div class="ms-3 fs-4">${forecast[i].day.condition.text}</div>
            <div class="mt-3">
              <span class="ms-4"><img src="images/icon-umberella.png" alt="">${forecast[i].day.daily_chance_of_rain}%</span>
              <span class="ms-4"><img src="images/icon-wind.png" alt="">${forecast[i].day.maxwind_kph} km/h</span>
              <span class="ms-4"><img src="images/icon-compass.png" alt="">${forecast[i].day.condition.text}</span>  
            </div>
          </div>
        </div>`;
    }

    document.querySelector(".data").innerHTML = cartoona;
  } 
});

document.getElementById('searchBtn').addEventListener('click', function() {
  var cityName = document.getElementById('cityInput').value.trim();

  if (cityName !== "") {
    fetchWeatherData(cityName);  
  } else {
    alert("Please enter a city name.");
  }
});

function fetchWeatherData(city) {

  var httpReq = new XMLHttpRequest();
  
  var apiKey = "d55ad68be0544f78988140529240612"; 
  
  var apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  httpReq.open("GET", apiUrl);

  httpReq.responseType = "json";

  httpReq.send();

  httpReq.addEventListener("load", function() {
    var weather = httpReq.response;

    if (weather && weather.location) {
      displayWeather(weather);
    } else {
      alert("City not found, Please try again");
    }
  });
}

function displayWeather(weather) {

  var cartoona = "";

  var forecast = weather.forecast.forecastday;

  for (var i = 0; i < forecast.length; i++) {
    cartoona += `
      <div class="card col-12 col-sm-6 col-md-4 col-lg-3" style="background-color: rgb(45, 47, 56);">
        <div class="header d-flex justify-content-between fs-5 pt-3">

          <div class="day me-auto">${new Date(forecast[i].date).toLocaleDateString("en-US", { weekday: "long" })}</div>

          <div class="date">${forecast[i].date}</div>
        </div>
        <div class="card-body text-white">

          <h5 class="city card-title mt-2 mb-3">${weather.location.name}</h5>
          <div class="number fw-bold d-flex">

          <div class="num">${forecast[i].day.avgtemp_c}</div>
            <div>°C</div>
          </div>

          <img src="https:${forecast[i].day.condition.icon}" alt="Weather Icon">

          <div class="ms-3 fs-4">${forecast[i].day.condition.text}</div>
          <div class="mt-3">

          <span class="ms-4"><img src="images/icon-umberella.png" alt="">${forecast[i].day.daily_chance_of_rain}%</span>

          <span class="ms-4"><img src="images/icon-wind.png" alt="">${forecast[i].day.maxwind_kph} km/h</span>

          <span class="ms-4"><img src="images/icon-compass.png" alt="">${forecast[i].day.condition.text}</span>  
          </div>
        </div>
      </div>`;
  }


  document.querySelector(".data").innerHTML = cartoona;
}






