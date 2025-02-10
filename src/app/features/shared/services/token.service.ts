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

    this.loginService.login(payload).subscribe((res: any) => {
      const userDetail = res.body;
      if (userDetail?.statusCode == 200) {
        let userData = userDetail?.result;
        let menuData = userDetail?.moduleList;
        const tabId = `${userData?.user_id}_${new Date().getTime()}`;
        localStorage.setItem('current-tab', tabId);
        localStorage.setItem(`tab-id-${tabId}`, tabId);
        this.cookieService.set(`token-login-${tabId}`, userDetail?.jwtToken, {
          path: '/',
          secure: false,
          sameSite: 'Lax',
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
        });
        this.localStorageService.setItem(`user-login-${tabId}`, JSON.stringify(userData));
        this.localStorageService.setItem(`menu-login-${tabId}`, JSON.stringify(menuData));
        this.notificationService.successAlert('Login Successfully');
        setTimeout(() => {
          this.goToDashboard();
        }, 500);
      } else {
        this.notificationService.errorAlert(userDetail?.actionResponse)
      }
    });
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
