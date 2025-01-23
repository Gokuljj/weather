// Get the elements from the DOM
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// Your OpenWeatherMap API key (replace with your own key)
const apiKey = "04ecb9a937df262829d3ea4170eb89df";

// Function to fetch weather data
const fetchWeatherData = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch the weather data from the API
    const response = await fetch(url);
    const data = await response.json();

    // If city is not found, display error message
    if (data.cod === "404") {
      weatherInfo.innerHTML = `<p>City not found!</p>`;
      return;
    }

    // Update weather information on the page
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    weatherInfo.style.display = "block"; // Show weather info
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error fetching data!</p>`;
  }
};

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Event listener for pressing Enter key
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value;
    if (city) {
      fetchWeatherData(city);
    } else {
      alert("Please enter a city name.");
    }
  }
});
