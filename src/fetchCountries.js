const URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  fetch(`${URL}/${name}?fields=name,flags,capital,population,languages`).then(
    response => {
      return response.json();
    }
  );
}
