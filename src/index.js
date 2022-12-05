import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const URL = 'https://restcountries.com/v3.1/name/';

const refs = {
  countryInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const handleInput = e => {
  const CountryName = e.target.value;

  fetchCountries(CountryName.trim());
};


function fetchCountries(name) {
  fetch(`${URL}/${name}?fields=name,flags,capital,population,languages`)
    
    .then(response => {
      return response.json();
    })
    .then(country => {
      console.log(country);

      const { flags, name, capital, population, languages } = country[0];
      const Countrylang = Object.values(languages);
      const markupFullInfo = `<img src="${flags.svg}" alt="flag" width="30px" class="country-info-img">
            <span class="country-info-name">${name.official}</span>  
            <ul class="country-info-list">
              <li class="country-info-item"><strong>Capital: </strong>${capital}</li>
              <li class="country-info-item"><strong>Population: </strong>${population}</li>
              <li class="country-info-item"><strong>Languages: </strong>${Countrylang}</li>
            </ul>`;
      console.log(markupFullInfo);
      refs.countryInfo.insertAdjacentHTML('beforeend', markupFullInfo);
    })
    .catch(error => {
      console.log(error);
    });
}

// `<li class="country-item">
//         <img src="${flags.svg}" alt="flag" class="country-img">
//         <span class="country-info-name">${name.official}</span>
//       </li>`

refs.countryInput.addEventListener('input', handleInput);
