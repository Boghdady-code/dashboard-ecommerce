import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './shared/alert/alert.service';

@Injectable()
export class catchErrorsInterceptor implements HttpInterceptor {
  errors: string[] = [];
  constructor(private alert: AlertService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.error.errors) {
          this.errors = [];
          for (const key in error.error.errors) {
            if (error.error.errors.hasOwnProperty(key)) {
              this.errors.push(error.error.errors[key].msg);
            }
          }
        }

        if (error.error.message) {
          this.errors.push(error.error.message);
        }

        if (
          this.errors.includes(
            'Cast to ObjectId failed for value " " (type string) at path "brand" because of "BSONError"'
          )
        ) {
          this.errors = ['Brand is required or invalid'];
        } else if (
          this.errors.includes(
            'Cast to ObjectId failed for value "" (type string) at path "category" because of "BSONError"'
          )
        ) {
          this.errors = ['Category is required or invalid'];
        } else if (
          this.errors.includes("Can't find /api/orders//pay on this server")
        ) {
          this.errors = ['Enter a Valid Order Id'];
        } else if (
          this.errors.includes("Can't find /api/orders//deliver on this server")
        ) {
          this.errors = ['Enter a Valid Order Id'];
        }

        console.log(this.errors);
        this.alert.error.next(this.errors);
        setTimeout(() => {
          this.errors = [];
        }, 3000);

        return throwError(error);
      })
    );
  }
}
