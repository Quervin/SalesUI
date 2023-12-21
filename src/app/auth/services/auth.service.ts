import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, Token, Register } from 'src/app/interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.url_base;

  get chechAuthentication() {
    if (!localStorage.getItem('token')) return false;

    if (!localStorage.getItem('expiration')) {
      let expirationDate = Date.parse(localStorage.getItem('expiration')!);
      if (Date.now() > expirationDate) {
        return false;
      }
    }

    return true;
  }

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/v1/api/accounts/Login`, user);
  }

  register(user: Register): Observable<Token> {
    return this.http.post<Token>(`${this.baseUrl}/v1/api/accounts/CreateUser`, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    this.router.navigate(['/auth/login']);
  }
}
