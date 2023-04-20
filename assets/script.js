const APIKey = '03eb33bf5eb6e35a817b8b3cf9f2a1db';
const cityName = document.getElementById('floatingText');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const recentSearch = document.getElementById('recent-search');
const currentDay = document.getElementById('current-day');
const forecastContainer = document.querySelector('.forecast-container')


// TODO: fix invalid city search from creating button and display error message to user that city is invalid

// TODO: Make search history buttons display city's weather

function saveSearch(event) {
  event.preventDefault();
  // * Get the existing saved cities from local storage
  const savedCities = localStorage.getItem('recentCities');
  // * If there are no saved cities, create a new empty array
  let recentCities = [];
  if (savedCities) {
    recentCities = JSON.parse(savedCities);
  }
  // * Check if the current city is already in the array
  if (cityName.value.trim() !== '' && !recentCities.includes(cityName.value)) {
    geocode(cityName.value);
    // * Add the new current city to the array
    recentCities.push(cityName.value);
    // * stringify array and store it in local storage
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
    // * Create a button for the current city and add it to the recentSearch element
    const recentCity = document.createElement('button');
    recentCity.textContent = cityName.value;
    recentCity.classList.add('btn', 'btn-secondary', 'd-block', 'w-100', 'my-3');
    recentSearch.appendChild(recentCity);
    // * Clear the input field
    cityName.value = "";
  } 
}

// * Get lat & lon from searched city
function geocode(searchValue) {
  fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${APIKey}`)
  .then(response => response.json())
  .then (data => {
    currentWeather(data[0].lat, data[0].lon);
    forecast(data[0].lat, data[0].lon);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// * Calling all requested CURRENT day data to display in currentDay element
function currentWeather(lat, lon) {
  fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`)
  .then(response => response.json())
  .then (data => {
    console.log(data);
  // * Clear previous weather data
  currentDay.innerHTML = '';
  // * Create new weather data elements
  let name = document.createElement('h2');
  name.textContent = data.name;
  let date = document.createElement('h2');
  date.textContent = '(' + moment.unix(data.dt).format('MM/DD/YYYY') +')';
  let icon = document.createElement('img');
  icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  // TODO: >>>>> STYLE >>>>>
  icon.setAttribute('class', 'icon-size')
  let temp = document.createElement('p');
  temp.textContent = 'Temp: ' + data.main.temp +'°F';
  let wind = document.createElement('p');
  wind.textContent = 'Wind: ' + data.wind.speed + ' MPH';
  let humidity = document.createElement('p');
  humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
  currentDay.append(name, date, icon, temp, wind, humidity);
  })
}

// * Calling all required data for 5 day forecast and displaying in forecastContainer
function forecast(lat, lon) {
  fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`)
  .then(response => response.json())
  .then (data => {
  // * Clear previous weather data
  forecastContainer.innerHTML = '';
  // * Loop through forecast data to request the data from 12:00pm each day for 5 days
  for (let i = 4; i < data.list.length; i = i+8) {
    let forecastCard = document.createElement('div');
    forecastCard.setAttribute('class', 'col-2 bg-primary-subtle p-1')
    let date = document.createElement('h4');
    date.textContent = moment.unix(data.list[i].dt).format('MM/DD/YYYY');
    let icon = document.createElement('img');
    icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`);
  // TODO: >>>>> STYLE >>>>>
  icon.setAttribute('class', 'icon-size')
    let temp = document.createElement('p');
    temp.textContent= 'Temp: ' + data.list[i].main.temp +'°F';
    let wind = document.createElement('p');
    wind.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH';
    let humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + data.list[i].main.humidity + '%';
    forecastCard.append(date, icon, temp, wind, humidity);
    forecastContainer.append(forecastCard);
  }
  })
}

function displayRecentSearches() {
  // * Clear the recentSearch element
  recentSearch.innerHTML = '';
  // * Get the saved cities from the local storage
  const savedCities = localStorage.getItem('recentCities');
  // * If there are no saved cities, do nothing
  if (!savedCities) {
    return;
  }
  // * Otherwise, parse the saved cities string into an array and create a button for each city
  const recentCities = JSON.parse(savedCities);
  recentCities.forEach(city => {
    const recentCity = document.createElement('button');
    recentCity.textContent = city;
    recentCity.classList.add('btn', 'btn-secondary', 'd-block', 'w-100', 'my-3');
    recentSearch.appendChild(recentCity);
  });
}
function clearSearchHistory() {
    // * Remove the recent search buttons from the recent search container
    recentSearch.innerHTML = '';
    // * Clear the "recentCities" key from local storage
    localStorage.removeItem('recentCities');
  }

//  * Event listeners and called functions
cityName.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    saveSearch(event);
  }
});
searchBtn.addEventListener('click', saveSearch);
clearBtn.addEventListener('click', clearSearchHistory);
displayRecentSearches();