import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../shared/alert/alert.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);

  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService
  ) {}

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.name,
      userData.email,
      userData.role,
      userData._token
    );

    this.user.next(loadedUser);
  }

  login(email: string, password: string) {
    const formInput = {
      email: email,
      password: password,
    };
    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/login`, formInput)
      .pipe(
        tap((res) =>
          this.authHandle(
            res.data.user.name,
            res.data.user.email,
            res.data.user.role,
            res.data.token
          )
        )
      );
  }

  private authHandle(name: string, email: string, role: string, token: string) {
    const user = new User(name, email, role, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null!);
    localStorage.removeItem('userData');

    this.router.navigate(['/']);

    this.alert.success.next('You have successfully logged out');
  }
}
