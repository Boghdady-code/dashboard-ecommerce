import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products`);
  }

  getLatestProducts(params: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products`, {
      params: params,
    });
  }

  getOrders(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/orders`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/users`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/categories`);
  }

  getBrands(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/brands`);
  }
}
