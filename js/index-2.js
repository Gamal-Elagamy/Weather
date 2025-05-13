window.onload = function() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          fetchWeatherDataByCoordinates(lat, lon);
      }, function() {
          alert("Unable to retrieve your location.");
      });
  } else {
      alert("Geolocation is not supported by this browser.");
  }
};

function fetchWeatherDataByCoordinates(lat, lon) {
  var apiKey = "d55ad68be0544f78988140529240612";
  var apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          displayWeather(data);
      })
      .catch(error => {
          console.log("Error fetching data:", error);
      });
}

function displayWeather(weather) {
  var cartoona = "";
  var forecast = weather.forecast.forecastday;

  forecast.forEach(function(day) {
      cartoona += `
          <div class="card col-12 col-sm-6 col-md-4 col-lg-3" style="background-color: rgb(45, 47, 56);">
              <div class="header d-flex justify-content-between fs-5 pt-3">
                  <div class="day me-auto">${new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}</div>
                  <div class="date">${day.date}</div>
              </div>
              <div class="card-body text-white">
                  <h5 class="city card-title mt-2 mb-3">${weather.location.name}</h5>
                  <div class="number fw-bold d-flex">
                      <div class="num">${day.day.avgtemp_c}</div>
                      <div>°C</div>
                  </div>
                  <img src="https:${day.day.condition.icon}" alt="Weather Icon">
                  <div class="ms-3 fs-4">${day.day.condition.text}</div>
                  <div class="mt-3">
                      <span class="ms-4"><img src="images/icon-umberella.png" alt="">${day.day.daily_chance_of_rain}%</span>
                      <span class="ms-4"><img src="images/icon-wind.png" alt="">${day.day.maxwind_kph} km/h</span>
                      <span class="ms-4"><img src="images/icon-compass.png" alt="">${day.day.condition.text}</span>  
                  </div>
              </div>
          </div>`;
  });

  document.querySelector(".data").innerHTML = cartoona;
}

document.getElementById('searchBtn').addEventListener('click', function() {
  var cityName = document.getElementById('cityInput').value.trim();

  if (cityName !== "") {
      fetchWeatherData(cityName);
  } else {
      alert("Please enter a city name.");
  }
});

function fetchWeatherData(city) {
  var apiKey = "d55ad68be0544f78988140529240612";
  var apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          displayWeather(data);
      })
      .catch(error => {
          alert("City not found, Please try again.");
      });
}
