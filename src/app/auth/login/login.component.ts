import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}
  loginForm: FormGroup | undefined;

  login() {
    this.auth
      .login(this.loginForm?.value.email!, this.loginForm?.value.password!)
      .subscribe((res) => {
        if (res.data.user.role === 'admin') {
          this.router.navigate(['/dashboard']);
          this.alert.success.next('You have successfully logged in');
        } else {
          this.auth.user.next(null!);
          localStorage.removeItem('userData');
          this.router.navigate(['/']);
          this.alert.error.next('You are not authorized');
        }
      });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
