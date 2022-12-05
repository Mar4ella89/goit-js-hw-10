import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { markupFullInfo, markupListShortInfo } from './template';
import './css/styles.css';

const DEBOUNCE_DELAY = 500;
const URL = 'https://restcountries.com/v3.1/name/';

const refs = {
  countryInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

let contriesList = [];

const clearMarkup = () => {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  refs.countryInput.innerHTML = '';
};

const renders = () => {
  const renderFullInfo = contriesList.map(markupFullInfo);
  const renderListShortInfo = contriesList.map(markupListShortInfo);

  if (contriesList.length === 1) {
    refs.countryInfo.insertAdjacentHTML('beforeend', renderFullInfo.join(''));
  } else if (contriesList.length > 10) {
    return;
  } else {
    refs.countryList.insertAdjacentHTML(
      'beforeend',
      renderListShortInfo.join('')
    );
  }
};

const handleInput = e => {
  const countryName = e.target.value.trim();

  if (countryName === '') {
    clearMarkup();
    return;
  }
  fetchCountries(countryName);
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
