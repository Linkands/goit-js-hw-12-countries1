import './styles.css';
import oneCountryTpl from './templates/oneCountryTpl.hbs';
import manyCountriesTpl from './templates/manyCountriesTpl.hbs';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
var _ = require('lodash');

const refs = {
  searchInput: document.querySelector('.search-bar'),
  countryContainer: document.querySelector('.countryContainer'),
};

let baseUrl = `https://restcountries.eu/rest/v2/name/`;

refs.searchInput.addEventListener(
  'input',
  _.debounce(onSearchInputChange, 500),
);

function onSearchInputChange(e) {
  const searchQuery = e.target.value;
  clearCountryContainer();
  if (searchQuery.length > 0) {
    getFetch(searchQuery);
  }
  // console.log(searchQuery);
  return;
}

function clearCountryContainer() {
  refs.countryContainer.innerHTML = '';
}

function getFetch(cityName) {
  let url = baseUrl + cityName;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(country => {
      const oneCountryMarkup = oneCountryTpl(country[0]);
      const manyCountriesMarkup = manyCountriesTpl(country);
      clearCountryContainer();
      if (country.length === 1) {
        refs.countryContainer.innerHTML = oneCountryMarkup;
      } else if (country.length > 10) {
        alert({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      } else if (country.length <= 10) {
        refs.countryContainer.innerHTML = manyCountriesMarkup;
      }
    })
    .catch(error => {
      console.log(error);
    });
}
