import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseUrl: string = environments.url_base;

  get token() {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  getCity(id: number): Observable<City> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<City>(`${this.baseUrl}/v1/api/cities/${id}`, { headers });
  }

  getCities(id: number, page: number, filter: string): Observable<City[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<City[]>(`${this.baseUrl}/v1/api/cities?id=${id}&page=${page}&filter=${filter}`, { headers });
  }

  getTotalCities(id: number, filter: string): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<number>(`${this.baseUrl}/v1/api/cities/totalCities?id=${id}&filter=${filter}`, { headers });
  }

  createCity(city: City): Observable<City> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<City>(`${this.baseUrl}/v1/api/cities`, city, { headers });
  }

  updateCity(city: City): Observable<City> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<City>(`${this.baseUrl}/v1/api/cities`, city, { headers });
  }

  deleteCity(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<any>(`${this.baseUrl}/v1/api/cities/${id}`, { headers });
  }
}
