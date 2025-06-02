import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Country, ApiResponse } from '../../../models/country';


@Injectable({
  providedIn: 'root'
})

export class DestinationAPIService {
  url = 'https://countriesnow.space/api/v0.1/countries'
  selectedCountry = signal<Country | null>(null)

  apiResponse = httpResource<ApiResponse>(() => this.url);

  setSelectedCountry(countryName: string) {
    const country = this.apiResponse.value()?.data.find(c => c.country === countryName);
    this.selectedCountry.set(country ?? null);
  }

}
