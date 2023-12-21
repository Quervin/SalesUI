import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = environments.url_base;

  get token() {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) { }

  getCategories(page: number, filter: string): Observable<Category[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Category[]>(`${this.baseUrl}/v1/api/categories?page=${page}&filter=${filter}`, { headers });
  }

  getTotalCategories(filter: string): Observable<number> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<number>(`${this.baseUrl}/v1/api/categories/totalCategories?filter=${filter}`, { headers });
  }

  getCategory(id: number): Observable<Category> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Category>(`${this.baseUrl}/v1/api/categories/${id}`, { headers });
  }

  createCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<Category>(`${this.baseUrl}/v1/api/categories`, category, { headers });
  }

  updateCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<Category>(`${this.baseUrl}/v1/api/categories`, category, { headers });
  }

  deleteCategory(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<any>(`${this.baseUrl}/v1/api/categories/${id}`, { headers });
  }
}
