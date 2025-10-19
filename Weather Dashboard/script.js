const API_KEY = "13f628b7c3445251c4a1fd7425d17a28";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.querySelector(".weather-card");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temp");
const description = document.getElementById("desc");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const errorBox = document.getElementById("error-message");

weatherCard.style.display = "none";
async function getWeather(city) {
  try {
    const response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    weatherCard.style.display = "block";
    errorBox.style.display = "none";

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${Math.round(data.wind.speed)} km/h`;
    pressure.textContent = `${data.main.pressure} hPa`;

    localStorage.setItem("lastCity", city);
  } catch (error) {
    weatherCard.style.display = "none";
    errorBox.textContent = "City not found. Please try again.";
    errorBox.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});

window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    cityInput.value = lastCity;
    getWeather(lastCity);
  }
});
