import { Injectable } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { LocalStorageService } from './localstorage.service';
import { JwtTokenService } from './jwt-token.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private loginService: LoginServiceService,
    private localStorageService: LocalStorageService,
    private jwtService: JwtTokenService,
    private notificationService: NotificationService,
    private router: Router,
    private storageService: StorageService,
    private cookieService: CookieService
  ) { }

  //**generate token and redirect to dashboard page and after decode save token in indexdb */
  generateToken(data: any, ip: any) {
    let payload = {
      "UserName": data.userName,
      "Password": data.password,
      "login_from": ip ? ip : 'Web'
    };

    return this.loginService.login(payload);
  }

  goToDashboard() {
    this.router.navigate(['/admin/dashboard/home']);
  }

  //**gettoken from localstorage */
  getToken() {
    const currentTabId = localStorage.getItem('current-tab');
    return this.cookieService.get(`token-login-${currentTabId}`);
  }

  //**check condition for token available in localstorage */
  hasToken() {
    const currentTabId = localStorage.getItem('current-tab');
    return this.cookieService.get(`token-login-${currentTabId}`) !== null;
  }
}
