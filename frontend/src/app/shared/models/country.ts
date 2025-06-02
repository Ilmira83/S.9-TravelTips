export interface ApiResponse {
  error: boolean,
  msg: string,
  data: Country[],
}

export interface Country {
  iso2: string,
  iso3: string,
  country: string,
  cities: string[]
}

