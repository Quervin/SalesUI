import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  
  private baseUrl: string = environments.url_base;

  constructor(private http: HttpClient) { }

  getCity(id: number):Observable<City> {
    return this.http.get<City>(`${this.baseUrl}/v1/api/cities/${ id }`);
  }

  createCity(city: City): Observable<City> {
    return this.http.post<City>(`${ this.baseUrl }/v1/api/cities`, city);
  }

  updateCity(city: City): Observable<City> {
    return this.http.put<City>(`${ this.baseUrl }/v1/api/cities`, city);
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/v1/api/cities/${ id }`);
  }
}
