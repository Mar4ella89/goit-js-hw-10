import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { markupFullInfo, markupListShortInfo } from './template';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  countryInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const clearMarkup = () => {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  refs.countryInput.innerHTML = '';
};

function renders(contriesList) {
  const renderFullInfo = contriesList.map(markupFullInfo);
  const renderListShortInfo = contriesList.map(markupListShortInfo);

  if (contriesList.length === 1) {
    refs.countryInfo.insertAdjacentHTML('beforeend', renderFullInfo.join(''));
  } else if (contriesList.length > 10) {
    Notiflix.Notify.info(
      `Too many matches found. Please enter a more specific name.`,
      {
        clickToClose: true,
        timeout: 3000,
      }
    );
    return;
  } else {
    refs.countryList.insertAdjacentHTML(
      'beforeend',
      renderListShortInfo.join('')
    );
  }
}

const onFetchError = () => {
  Notiflix.Notify.failure(`Oops, there is no country with that name`, {
    clickToClose: true,
    timeout: 3000,
  });
};

const handleInput = e => {
  e.preventDefault();
  const countryName = e.target.value.trim();

  if (countryName === '') {
    clearMarkup();
    return;
  }
  fetchCountries(countryName).then(renders).catch(onFetchError);
  clearMarkup();
};

refs.countryInput.addEventListener(
  'input',
  debounce(handleInput, DEBOUNCE_DELAY)
);
