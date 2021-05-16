const baseUrl = `https://restcountries.eu/rest/v2/name`;

function fetchCountries(cityName) {
  const url = `${baseUrl}/${cityName}`;
  return fetch(url).then(response => response.json());
}

export default { fetchCountries };
