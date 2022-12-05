export const markupFullInfo = ({
  flags,
  name,
  capital,
  population,
  languages,
}) =>
  `<img src="${flags.svg}" alt="flag" width="30px" class="country-info-img">
              <span class="country-info-name">${name.official}</span>  
              <ul class="country-info-list">
                <li class="country-info-item"><strong>Capital: </strong>${capital}</li>
                <li class="country-info-item"><strong>Population: </strong>${population}</li>
                <li class="country-info-item"><strong>Languages: </strong>${Object.values(
                  languages
                )}</li>
              </ul>`;

export const markupListShortInfo = ({
  flags,
  name,
  capital,
  population,
  languages,
}) => `<li class="country-item">
    <img src="${flags.svg}" alt="flag" width="30px" class="country-item-img">
    <span class="country-item-name">${name.official}</span>
  </li>`;
