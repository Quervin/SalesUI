import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from 'src/app/interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  private baseUrl: string = environments.url_base;

  constructor(private http: HttpClient) { }

  getState(id: number):Observable<State> {
    return this.http.get<State>(`${this.baseUrl}/v1/api/states/${ id }`);
  }

  getStates(id: number, page: number, filter: string):Observable<State[]> {
    return this.http.get<State[]>(`${this.baseUrl}/v1/api/states?id=${ id }&page=${ page }&filter=${ filter }`);
  }

  getTotalStates(id: number, filter: string):Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/v1/api/states/totalStates?id=${ id }&filter=${ filter }`);
  }

  createState(state: State): Observable<State> {
    return this.http.post<State>(`${ this.baseUrl }/v1/api/states`, state);
  }

  updateState(state: State): Observable<State> {
    return this.http.put<State>(`${ this.baseUrl }/v1/api/states`, state);
  }

  deleteState(id: number): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/v1/api/states/${ id }`);
  }
}
