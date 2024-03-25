import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EdituserService {
  constructor(private http: HttpClient) {}

  modalStatus = new Subject<boolean>();
  mode = ' ';
  userId: any | undefined;

  openModal() {
    this.modalStatus.next(true);
  }

  getUser(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/users/${id}`);
  }

  setUserId(id: number) {
    this.userId = id;
  }

  updateUser(userId: any, data: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('role', data.role);

    return this.http.put(`${environment.apiUrl}/api/users/${userId}`, formData);
  }

  createUser(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('role', data.role);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);

    return this.http.post(`${environment.apiUrl}/api/users`, formData);
  }
}
