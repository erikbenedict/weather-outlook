const cityName = document.getElementById('floatingText');
const searchBtn = document.getElementById('search-btn');
const recentSearch = document.getElementById('recent-search');

function saveSearch(event) {
  event.preventDefault();
  // Get the existing saved cities from local storage
  const savedCities = localStorage.getItem('recentCities');
  // If there are no saved cities, create a new empty array
  let recentCities = [];
  if (savedCities) {
    recentCities = JSON.parse(savedCities);
  }
  // Check if the current city is already in the array
  if (!recentCities.includes(cityName.value)) {
    // Add the current city to the array
    recentCities.push(cityName.value);
    // stringify array and store it in local storage
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
    // Create a button for the current city and add it to the recentSearch element
    const recentCity = document.createElement('button');
    recentCity.textContent = cityName.value;
    recentSearch.appendChild(recentCity);
  }
}

searchBtn.addEventListener('click', saveSearch);

