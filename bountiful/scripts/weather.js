const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad,us&units=imperial&appid=4c28ab4da8a94fee5a087a3e68de4462';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=33.15876629461018&lon=-117.35079869489601&units=imperial&appid=4c28ab4da8a94fee5a087a3e68de4462';


// Function to fetch weather data and update the weather card
async function getWeatherData() {
    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();
  
      const temperature = data.main.temp;
      const condition = data.weather[0].description;
      const humidity = data.main.humidity;
      const icon = data.weather[0].icon; // Get the weather icon code
  
      document.getElementById("temperature").textContent = `Temperature: ${Math.round(temperature)}°F`;
      document.getElementById("condition").textContent = `Condition: ${condition}`;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
      document.getElementById("weatherIcon").style.backgroundImage = `url('https://openweathermap.org/img/wn/${icon}.png')`; // Set the weather icon URL as background image
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
}

// Function to fetch forecast data and update the forecast card
async function getForecastData() {
    try {
      const response = await fetch(forecastUrl);
      const data = await response.json();
  
      const forecasts = [];
      const today = new Date().getDate();
  
      for (let i = 0; i < data.list.length; i++) {
        const forecast = data.list[i];
        const forecastDate = new Date(forecast.dt_txt);
  
        // Exclude the current day and select midday entries
        if (forecastDate.getDate() !== today && forecastDate.getHours() === 0) {
          forecasts.push(forecast);
  
          if (forecasts.length === 3) {
            // Break the loop after retrieving forecasts for three days
            break;
          }
        }
      }
  
      const forecastCards = document.querySelectorAll(".forecastCard");
      forecastCards.forEach((card, index) => {
        const forecast = forecasts[index];
  
        const temperature = forecast.main.temp;
        const condition = forecast.weather[0].description;
        const icon = forecast.weather[0].icon;
  
        const cardDay = card.querySelector(".forecastDay");
        const cardTemp = card.querySelector(".forecastTemp");
        const cardIcon = card.querySelector(".forecastIcon");
  
        const date = new Date(forecast.dt_txt);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  
        cardDay.textContent = weekday;
        cardTemp.textContent = `Temp: ${Math.round(temperature)}°F`;
        cardIcon.style.backgroundImage = `url('https://openweathermap.org/img/wn/${icon}.png')`;
      });
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
}  

// Initialize the weather data and forecast
getWeatherData();
getForecastData();