const URL = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
  return fetch(
    `${URL}/${name}?fields=name,flags,capital,population,languages`
  ).then(response => response.json());
}
// console.log(fetchCountries(name));
// export default { fetchCountries };
