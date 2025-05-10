const apiKey = "965cc65f37c7f4d5c8189af056ab918a";

const getWeatherEmoji = (main) => {
  switch (main) {
    case "Clear": return "☀️";
    case "Clouds": return "☁️";
    case "Rain": return "🌧️";
    case "Thunderstorm": return "⛈️";
    case "Drizzle": return "🌦️";
    case "Snow": return "❄️";
    case "Mist":
    case "Fog": return "🌫️";
    case "Smoke": return "🚬";
    case "Haze": return "🌁";
    case "Dust": return "🌪️";
    default: return "🌈";
  }
};

document.getElementById("weather-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = document.getElementById("city-input").value.trim();
  const weatherResult = document.getElementById("weather-result");
  const errorMessage = document.getElementById("error-message");

  if (!city) return;

  weatherResult.classList.add("hidden");
  errorMessage.classList.add("hidden");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      errorMessage.textContent = "🚫 City not found. Please try again.";
      errorMessage.classList.remove("hidden");
      return;
    }

    document.getElementById("emoji").textContent = getWeatherEmoji(data.weather[0].main);
    document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `🌡️ Temperature: ${data.main.temp}°C`;
    document.getElementById("description").textContent = `🌤️ Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `🌬️ Wind Speed: ${data.wind.speed} m/s`;

    weatherResult.classList.remove("hidden");
  } catch (error) {
    errorMessage.textContent = "⚠️ Something went wrong. Please try again later.";
    errorMessage.classList.remove("hidden");
    console.error(error);
  }
});
