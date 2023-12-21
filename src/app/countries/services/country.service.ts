import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../../interfaces/country';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl: string = environments.url_base;

  get token() {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  getCountries(page: number, filter: string): Observable<Country[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Country[]>(`${this.baseUrl}/v1/api/countries?page=${page}&filter=${filter}`, { headers });
  }

  getTotalCountries(filter: string): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<number>(`${this.baseUrl}/v1/api/countries/totalCountries?filter=${filter}`, { headers });
  }

  getCountry(id: number): Observable<Country> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Country>(`${this.baseUrl}/v1/api/countries/${id}`, { headers });
  }

  createCountry(country: Country): Observable<Country> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<Country>(`${this.baseUrl}/v1/api/countries`, country, { headers });
  }

  updateCountry(country: Country): Observable<Country> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<Country>(`${this.baseUrl}/v1/api/countries`, country, { headers });
  }

  deleteCountry(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<any>(`${this.baseUrl}/v1/api/countries/${id}`, { headers });
  }
}
