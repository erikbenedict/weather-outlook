const cityName = document.getElementById('floatingText');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const recentSearch = document.getElementById('recent-search');

function saveSearch(event) {
  event.preventDefault();
  // * Get the existing saved cities from local storage
  const savedCities = localStorage.getItem('recentCities');
  // If there are no saved cities, create a new empty array
  let recentCities = [];
  if (savedCities) {
    recentCities = JSON.parse(savedCities);
  }
  // * Check if the current city is already in the array
  if (!recentCities.includes(cityName.value)) {
    // Add the current city to the array
    recentCities.push(cityName.value);
    // stringify array and store it in local storage
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
    // Create a button for the current city and add it to the recentSearch element
    const recentCity = document.createElement('button');
    recentCity.textContent = cityName.value;
    recentCity.classList.add('btn', 'btn-secondary', 'd-block', 'w-100', 'my-3');
    recentSearch.appendChild(recentCity);
    // * Clear the input field
    cityName.value = "";
  }
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
  
displayRecentSearches();
searchBtn.addEventListener('click', saveSearch);
clearBtn.addEventListener('click', clearSearchHistory);
