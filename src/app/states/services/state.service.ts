import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from 'src/app/interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private baseUrl: string = environments.url_base;

  get token() {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  getState(id: number): Observable<State> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<State>(`${this.baseUrl}/v1/api/states/${id}`, { headers });
  }

  getStates(id: number, page: number, filter: string): Observable<State[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<State[]>(`${this.baseUrl}/v1/api/states?id=${id}&page=${page}&filter=${filter}`, { headers });
  }

  getTotalStates(id: number, filter: string): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<number>(`${this.baseUrl}/v1/api/states/totalStates?id=${id}&filter=${filter}`, { headers });
  }

  createState(state: State): Observable<State> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<State>(`${this.baseUrl}/v1/api/states`, state, { headers });
  }

  updateState(state: State): Observable<State> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<State>(`${this.baseUrl}/v1/api/states`, state, { headers });
  }

  deleteState(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<any>(`${this.baseUrl}/v1/api/states/${id}`, { headers });
  }
}
