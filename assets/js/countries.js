export default {
  euCountriesNames () {
    return this.euCountries().map(euCountry => euCountry.name)
  },

  euCountriesCodes () {
    return this.euCountries().map(euCountry => euCountry.countryCode)
  },

  euCountriesNamesToCodes (euCountriesNames) {
    return this.euCountries().map(euCountry => {
      if (euCountriesNames.includes(euCountry.name)) {
        return euCountry.countryCode
      }
    })
  },

  euCountries () {
    return [
      {name: 'Austria', countryCode: 'AT'},
      {name: 'Belgium', countryCode: 'BE'},
      {name: 'Bulgaria', countryCode: 'BG'},
      {name: 'Croatia', countryCode: 'HR'},
      {name: 'Cyprus', countryCode: 'CY'},
      {name: 'Czechia', countryCode: 'CZ'},
      {name: 'Denmark', countryCode: 'DK'},
      {name: 'Estonia', countryCode: 'EE'},
      {name: 'Finland', countryCode: 'FI'},
      {name: 'France', countryCode: 'FR'},
      {name: 'Germany', countryCode: 'DE'},
      {name: 'Greece', countryCode: 'EL'},
      {name: 'Hungary', countryCode: 'HU'},
      {name: 'Italy', countryCode: 'IT'},
      {name: 'Ireland', countryCode: 'IE'},
      {name: 'Latvia', countryCode: 'LV'},
      {name: 'Lithuania', countryCode: 'LT'},
      {name: 'Luxembourg', countryCode: 'LU'},
      {name: 'Malta', countryCode: 'MT'},
      {name: 'Netherlands', countryCode: 'NL'},
      {name: 'Poland', countryCode: 'PL'},
      {name: 'Portugal', countryCode: 'PT'},
      {name: 'Romania', countryCode: 'RO'},
      {name: 'Slovakia', countryCode: 'SK'},
      {name: 'Slovenia', countryCode: 'SI'},
      {name: 'Spain', countryCode: 'ES'},
      {name: 'Sweden', countryCode: 'SE'},
    ]
  }
}
