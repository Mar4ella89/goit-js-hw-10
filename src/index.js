// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 500;
const URL = 'https://restcountries.com/v3.1/name/';

const refs = {
  countryInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

let contriesList = [];

const markupFullInfo = ({ flags, name, capital, population, languages }) =>
  `<img src="${flags.svg}" alt="flag" width="30px" class="country-info-img">
              <span class="country-info-name">${name.official}</span>  
              <ul class="country-info-list">
                <li class="country-info-item"><strong>Capital: </strong>${capital}</li>
                <li class="country-info-item"><strong>Population: </strong>${population}</li>
                <li class="country-info-item"><strong>Languages: </strong>${Object.values(
                  languages
                )}</li>
              </ul>`;
const markupListShortInfo = ({
  flags,
  name,
  capital,
  population,
  languages,
}) => `<li class="country-item">
    <img src="${flags.svg}" alt="flag" width="30px" class="country-item-img">
    <span class="country-item-name">${name.official}</span>
  </li>`;

const clearMarkup = () => {
  refs.countryInfo.innerHTML = '';
  refs.countryInput.innerHTML = '';
};

const renders = () => {
  const renderFullInfo = contriesList.map(markupFullInfo);
  const renderListShortInfo = contriesList.map(markupListShortInfo);

  if (contriesList.length === 1) {
    refs.countryInfo.insertAdjacentHTML('beforeend', renderFullInfo.join(''));
  } else {
    refs.countryInfo.insertAdjacentHTML(
      'beforeend',
      renderListShortInfo.join('')
    );
  }
};

const handleInput = e => {
  const CountryName = e.target.value;

  if (CountryName === '') {
    clearMarkup();
    return;
  }
  fetchCountries(CountryName.trim());
  clearMarkup();
};

function fetchCountries(name) {
  fetch(`${URL}/${name}?fields=name,flags,capital,population,languages`)
    .then(response => {
      return response.json();
    })
    .then(countries => {
      console.log(countries);

      if (countries.length > 10) {
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`,
          {
            clickToClose: true,
            timeout: 3000,
          }
        );
      }

      contriesList = countries;
      renders();
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(`Oops, there is no country with that name`, {
        clickToClose: true,
        timeout: 3000,
      });
    });
}

refs.countryInput.addEventListener(
  'input',
  debounce(handleInput, DEBOUNCE_DELAY)
);
