import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Region, SmallCountry } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  readonly http = inject(HttpClient);
  readonly baseUrl = 'https://restcountries.com/v3.1';
  readonly #regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  get regions(): Region[] {
    return [...this.#regions];
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=name,cca3,borders`;
    return this.http
      .get<SmallCountry[]>(url)
      .pipe(tap((res) => console.log({ res })));
  }
}
