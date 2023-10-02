// main.js

// OpenWeather API
const apiKey = '<API-KEY>'; // ADD YOUR API KEY HERE!
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

// Function to fetch weather data from the OpenWeather API
async function getWeatherData(cityName) {
    try {
        const response = await fetch(apiUrl + `${cityName}&units=metric&appid=${apiKey}&lang=pt_br`);
        const data = await response.json();

        console.log(data);

        // Update temperature
        document.getElementById('temp').textContent = `${Math.round(data.main.temp)}º`;

        const weatherCondition = data.weather[0].main;

        // Update weather icon and bg on weather condition
        if (weatherCondition === 'Clear' && data.weather[0].icon === '01d') {
            console.log(`Condição climática é: ${weatherCondition}`)
            document.getElementById('weather-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" id="weather-icon" style="height: 90px;"></img>`;
            document.body.style.background = 'linear-gradient(135deg, #6285f3, #9db8e8, #809fff)';
            document.getElementById('week-card').style.backgroundColor = '#577cee';
            document.getElementById('alert-card').style.backgroundColor = '#577cee';
            document.getElementById('humidity-card').style.backgroundColor = '#577cee';
            document.getElementById('wind-speed-card').style.backgroundColor = '#577cee';
        } else if (['Thunderstom', 'Drizzle', 'Rain', 'Clouds'].includes(weatherCondition)) {
            console.log(`Condição climática é: ${weatherCondition}`);
            document.getElementById('weather-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" id="weather-icon" style="height: 90px;"></img>`;
            document.body.style.background = 'linear-gradient(315deg, #636e84, #6d7c9a, #87a1ad)';
            document.getElementById('week-card').style.backgroundColor = '#6e7999';
            document.getElementById('alert-card').style.backgroundColor = '#6e7999';
            document.getElementById('humidity-card').style.backgroundColor = '#6e7999';
            document.getElementById('wind-speed-card').style.backgroundColor = '#6e7999';
        } else if (weatherCondition === 'Clear' && data.weather[0].icon === '01n') {
            document.getElementById('weather-icon').innerHTML = '<i class="fa-solid fa-moon" style="color: #dd9334; font-size: 71px;"></i>';
            document.body.style.background = 'linear-gradient(135deg, #807da3, #544c80, #303870)';
            document.getElementById('week-card').style.backgroundColor = '#665b99';
            document.getElementById('alert-card').style.backgroundColor = '#665b99';
            document.getElementById('humidity-card').style.backgroundColor = '#665b99';
            document.getElementById('wind-speed-card').style.backgroundColor = '#665b99';
        } else {
            document.getElementById('weather-icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon" id="weather-icon" style="height: 90px;"></img>`;
        }

        // Update Weather Description
        document.getElementById('weather-description').textContent = data.weather[0].description;

        // Update City Name and Country Code [BR - Brazil]
        document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;

        // Update temp_max, temp_min and feels_like
        document.getElementById('temp-max').textContent = `${Math.round(data.main.temp_max)}º`;
        document.getElementById('temp-min').textContent = `${Math.round(data.main.temp_min)}º`;
        document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}º`;

        // Update Humidity
        document.getElementById('humidity').textContent = `${data.main.humidity} %`;

        // Update Wind Speed
        document.getElementById('wind-speed').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // m/sec to km/h


    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
// Call the function to update weather data on html
// getWeatherData();

document.addEventListener('DOMContentLoaded', () => {
    const cityName = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-input');
    const searchBtn = document.getElementById('search-button'); // Can add search on button click
    getWeatherData('Brasília'); // Default City
    cityName.addEventListener('input', () => {
        if (cityName.value.trim() !== '') {
            clearBtn.style.display = 'block';
            searchBtn.style.display = 'none';
        } else {
            clearBtn.style.display = 'none';
            searchBtn.style.display = 'block';
        }
    });
    clearBtn.addEventListener('click', () => {
        cityName.value = '';
        clearBtn.style.display = 'none';
        searchBtn.style.display = 'block';
    });
    cityName.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && cityName.value != '') {
        //   console.log('Enter key was pressed');
        //   console.log(`City typed is: ${cityName.value}`);
          getWeatherData(cityName.value);
          document.querySelector('[data-bs-dismiss="offcanvas"]').click();
        }
    });
});