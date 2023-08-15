import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../../interfaces/country';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl: string = environments.url_base;

  constructor(private http: HttpClient) { }

  getCountries():Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/v1/api/countries`);
  }

  getCountry(id: number):Observable<Country> {
    return this.http.get<Country>(`${this.baseUrl}/v1/api/countries/${ id }`);
  }

  createCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(`${ this.baseUrl }/v1/api/countries`, country);
  }

  updateCountry(country: Country): Observable<Country> {
    return this.http.put<Country>(`${ this.baseUrl }/v1/api/countries`, country);
  }

  deleteCountry(id: number): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/v1/api/countries/${ id }`);
  }
}
