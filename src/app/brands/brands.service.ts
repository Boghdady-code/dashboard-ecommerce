import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient) {}

  createBrand(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);

    return this.http.post(`${environment.apiUrl}/api/brands`, formData);
  }

  updateBrand(id: any, data: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image);
    return this.http.put(`${environment.apiUrl}/api/brands/${id}`, formData);
  }

  getBrand(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/brands/${id}`);
  }

  getBrands(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/brands`);
  }

  deleteBrand(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/brands/${id}`);
  }
}
