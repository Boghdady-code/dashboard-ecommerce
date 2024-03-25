import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  createCategory(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);

    return this.http.post(`${environment.apiUrl}/api/categories`, formData);
  }

  updateCategory(id: any, data: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);
    return this.http.put(
      `${environment.apiUrl}/api/categories/${id}`,
      formData
    );
  }

  getCategory(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/categories/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/categories`);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/categories/${id}`);
  }
}
