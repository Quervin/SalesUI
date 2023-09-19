import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = environments.url_base;
  
  constructor(private http: HttpClient) { }

  getCategories(page: number, filter: string):Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/v1/api/categories?page=${ page }&filter=${ filter }`);
  }

  getTotalCategories(filter: string):Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/v1/api/categories/totalCategories?filter=${ filter }`);
  }

  getCategory(id: number):Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/v1/api/categories/${ id }`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${ this.baseUrl }/v1/api/categories`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${ this.baseUrl }/v1/api/categories`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/v1/api/categories/${ id }`);
  }
}
