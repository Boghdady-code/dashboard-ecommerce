import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(queryParams: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/orders`, {
      params: queryParams,
    });
  }

  onPayOrder(orderId: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/orders/${orderId}/pay`, {});
  }

  onDeliverOrder(orderId: string): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/api/orders/${orderId}/deliver`,
      {}
    );
  }
}
