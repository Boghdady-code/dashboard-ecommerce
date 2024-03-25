import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  constructor(private http: HttpClient) {}

  getCoupons(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/coupons`);
  }

  deleteCoupon(id: any): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/coupons/${id}`);
  }

  getCoupon(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/coupons/${id}`);
  }

  createCoupon(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/coupons`, data);
  }

  updateCoupon(id: any, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/coupons/${id}`, data);
  }
}
