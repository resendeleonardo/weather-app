// './js/main.js'

const apiKey = "<API-KEY>"; // ADD YOUR API KEY HERE!
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

// Fetching Data from OpenWeather API
const getWeatherData = async (cityName) => {
  try {
    const response = await fetch(
      apiUrl + `${cityName}&units=metric&appid=${apiKey}&lang=pt_br`
    );
    const data = await response.json();

    setWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Updating UI with data from OpenWeather API
const setWeatherData = (data) => {
  const weatherCondition = data.weather[0].main;
  const iconElement = document.getElementById("weather-icon");
  const cards = ["week-card", "alert-card", "humidity-card", "wind-speed-card"];
  const weatherStyles = {
    Clear: {
      "01d": {
        icon: `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" id="weather-icon" class="weather-icon"></img>`,
        bodyBackground: "linear-gradient(135deg, #6285f3, #9db8e8, #809fff)",
        cardBackground: "#577cee",
      },
      "01n": {
        icon: '<i class="fa-solid fa-moon weather-icon" style="color: #dd9334;"></i>',
        bodyBackground: "linear-gradient(135deg, #807da3, #544c80, #303870)",
        cardBackground: "#665b99",
      },
    },
    Rain: {
      icon: `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" id="weather-icon" class="weather-icon"></img>`,
      bodyBackground: "linear-gradient(315deg, #636e84, #6d7c9a, #87a1ad)",
      cardBackground: "#6e7999",
    },
    Clouds: {
      icon: `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" id="weather-icon" class="weather-icon"></img>`,
      bodyBackground: "linear-gradient(315deg, #636e84, #6d7c9a, #87a1ad)",
      cardBackground: "#6e7999",
    },
    Default: {
      icon: `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" id="weather-icon" class="weather-icon"></img>`,
      bodyBackground: "linear-gradient(135deg, #6285f3, #9db8e8, #809fff)",
      cardBackground: "#577cee",
    },
  };

  // Update Temperature -- Celsius
  document.getElementById("temp").textContent = `${Math.round(
    data.main.temp
  )}º`;

  // Update Weather Icon and Background on Weather Condition
  if (weatherStyles[weatherCondition]) {
    const style =
      weatherStyles[weatherCondition][data.weather[0].icon] ||
      weatherStyles[weatherCondition];
    iconElement.innerHTML = style.icon;
    document.body.style.background = style.bodyBackground;
    cards.forEach((card) => {
      const cardElement = document.getElementById(card);
      if (cardElement) {
        cardElement.style.backgroundColor = style.cardBackground;
      }
    });
  } else {
    iconElement.innerHTML = weatherStyles["Default"]["icon"];
    document.body.style.background = weatherStyles["Default"]["bodyBackground"];
    cards.forEach((card) => {
      const cardElement = document.getElementById(card);
      if (cardElement) {
        cardElement.style.backgroundColor =
          weatherStyles["Default"]["cardBackground"];
      }
    });
  }

  // Update Weather Description
  document.getElementById("weather-description").textContent =
    data.weather[0].description;

  // Update City Name and Country Code [Ex: BR - Brazil]
  document.getElementById(
    "location"
  ).textContent = `${data.name}, ${data.sys.country}`;

  // Update temp_max, temp_min and feels_like -- Celsius
  document.getElementById("temp-max").textContent = `${Math.round(
    data.main.temp_max
  )}º`;
  document.getElementById("temp-min").textContent = `${Math.round(
    data.main.temp_min
  )}º`;
  document.getElementById("feels-like").textContent = `${Math.round(
    data.main.feels_like
  )}º`;

  // Update Humidity -- %
  document.getElementById("humidity").textContent = `${data.main.humidity} %`;

  // Update Wind Speed -- m/sec to km/h
  document.getElementById("wind-speed").textContent = `${Math.round(
    data.wind.speed * 3.6
  )} km/h`;
};

document.addEventListener("DOMContentLoaded", () => {
  const cityName = document.getElementById("search-input");
  const clearBtn = document.getElementById("clear-input");
  const searchBtn = document.getElementById("search-button");
  getWeatherData("Brasília"); // Default City
  cityName.addEventListener("input", () => {
    if (cityName.value.trim() !== "") {
      clearBtn.style.display = "block";
      searchBtn.style.display = "none";
    } else {
      clearBtn.style.display = "none";
      searchBtn.style.display = "block";
    }
  });
  clearBtn.addEventListener("click", () => {
    cityName.value = "";
    clearBtn.style.display = "none";
    searchBtn.style.display = "block";
  });
  cityName.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && cityName.value !== "") {
      getWeatherData(cityName.value);
      document.querySelector('[data-bs-dismiss="offcanvas"]').click();
    }
  });
});
