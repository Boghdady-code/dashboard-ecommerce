import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AlertService } from './shared/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private alert: AlertService) {}
  title = 'ecomm-dashboard';
  alertMessages: string[] = [];
  successMessages: string = ' ';

  ngOnInit() {
    this.authService.autoLogin();

    this.alert.error.subscribe((res) => {
      this.alertMessages.push(res);

      setTimeout(() => {
        this.alertMessages = [];
      }, 3000);
    });

    this.alert.success.subscribe((res) => {
      this.successMessages = res;

      setTimeout(() => {
        this.successMessages = ' ';
      }, 3000);
    });
  }
}
