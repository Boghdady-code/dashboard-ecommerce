import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private http: HttpClient) {}
  productId: number | undefined;
  modalStatus = new Subject<boolean>();

  openModal() {
    this.modalStatus.next(true);
  }

  setProductId(id: number) {
    this.productId = id;
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products/${id}`);
  }

  updateProduct(data: any, id: number): Observable<any> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('quantity', data.quantity);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('brand', data.brand! || ' ');
    formData.append('category', data.category);
    formData.append('image', data.image);
    formData.append('ratingsAverage', data.ratingsAverage);
    formData.append('imageCover', data.imageCover);
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i]);
    }

    return this.http.put(`${environment.apiUrl}/api/products/${id}`, formData);
  }
}
