const currentTemp = document.querySelector('#currentTemp');
const weatherIcon = document.querySelector('#weatherIcon');
const windSpeed = document.querySelector('#windSpeed');
const windChill = document.querySelector('#windChill');
const captionDesc = document.querySelector('#weatherDesc');

// API w/ KEY
const url = 'https://api.openweathermap.org/data/2.5/weather?q=American+Fork&units=imperial&appid=4c28ab4da8a94fee5a087a3e68de4462'

// DISPLAYS HOME PAGE WEATHER INFO
if(window.location.pathname == "/wdd230/chamber/index.html" || window.location.pathname == "/chamber/index.html") {
  async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        displayResults(data);
      }
      else {
        throw Error(await response.text());
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  apiFetch();
} 

function displayResults(weatherData) {
  currentTemp.innerHTML = `${weatherData.main.temp.toFixed(0)}°`;
  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = weatherData.weather[0].description;
  let temp = weatherData.main.temp;
  let wind = weatherData.wind.speed;
  let wChill = (0.0817*(3.71*(Math.pow(wind, 0.5))+5.81-0.25*wind)*(temp-91.4)+91.4);
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
  windSpeed.innerHTML = `<strong>Wind Speed:</strong> ${wind.toFixed(0)}mph`

  if(temp<=50 && wind>3){
    windChill.innerHTML = `<strong>Wind Chill:</strong> ${wChill.toFixed(1)}°F`;
  }
  else {
    windChill.innerHTML = `<strong>Wind Chill:</strong> N/A`;
  }   
}