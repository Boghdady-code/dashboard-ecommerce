import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products`);
  }

  createProduct(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('quantity', data.quantity);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('brand', data.brand);
    formData.append('category', data.category);
    formData.append('imageCover', data.imageCover);
    formData.append('ratingsAverage', data.ratingsAverage);
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i]);
    }
    return this.http.post(`${environment.apiUrl}/api/products`, formData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/products/${id}`);
  }
}
