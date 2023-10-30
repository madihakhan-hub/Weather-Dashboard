// JavaScript to fetch both current weather and 5-day forecast
document.getElementById("user-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const cityName = document.getElementById("city").value;
  fetchWeather(cityName);
  fetchForecast(cityName);
});

document.getElementById("language-buttons").addEventListener("click", function (e) {
  if (e.target && e.target.getAttribute("data-city")) {
    const cityName = e.target.getAttribute("data-city");
    fetchWeather(cityName);
    fetchForecast(cityName);
  }
});

function fetchWeather(cityName) {
  // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
  const apiKey = '54ef0cfcb845848be77b6df7f7db42ca';
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      // Extract and display relevant weather information
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;

      const weatherInfoContainer = document.getElementById("weather-info-container");
      weatherInfoContainer.innerHTML = `
        <h3>${cityName}</h3>
        <p>Temperature: ${temperature}°C</p>
        <p>Conditions: ${description}</p>
        <p>Humidity: ${humidity}%</p>
      `;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function fetchForecast(cityName) {
  // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
  const apiKey = '54ef0cfcb845848be77b6df7f7db42ca';
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      const forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = ''; // Clear any previous forecast data

      // Process and display the 5-day forecast data
      for (let i = 0; i < data.list.length; i += 8) {
        const forecastData = data.list[i];
        const date = new Date(forecastData.dt * 1000); // Convert timestamp to date

        const temperature = forecastData.main.temp;
        const description = forecastData.weather[0].description;

        const forecastInfo = document.createElement("div");
        forecastInfo.className = "list-item";
        forecastInfo.innerHTML = `
          <h3>${cityName} - ${date.toDateString()}</h3>
          <p>Temperature: ${temperature}°C</p>
          <p>Conditions: ${description}</p>
        `;

        forecastContainer.appendChild(forecastInfo);
      }
    })
    .catch((error) => {
      console.error("Error fetching forecast data:", error);
    });
}
