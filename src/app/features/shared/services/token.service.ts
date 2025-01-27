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
    private localStorageService : LocalStorageService,
    private jwtService: JwtTokenService,
    private notificationService: NotificationService,
    private router : Router,
    private storageService: StorageService,
    private cookieService : CookieService
  ) { }

  //**generate token and redirect to dashboard page and after decode save token in indexdb */
  generateToken(data: any, ip:any) {
    let payload = {
      "UserName": data.userName,
      "Password": data.password,
      "login_from" : ip ? ip : 'Web'
    };

    this.loginService.login(payload).subscribe((res: any) => {      
      const userDetail = res.body;      
      if(userDetail?.statusCode == 200) {
        this.notificationService.successAlert('Login Successfully');
        let userData = userDetail?.result;
        let menuData = userDetail?.moduleList;               
        // this.localStorageService.setItem("pwdtoken", userDetail?.jwtToken);
        this.localStorageService.setItem("user", JSON.stringify(userData));
        this.localStorageService.setItem('menu', JSON.stringify(menuData) )
        this.cookieService.set('token', userDetail?.jwtToken, undefined, 'http://103.109.7.173:7605/', undefined, true, 'Strict');
        setTimeout(() => {          
          this.goToDashboard(); 
        }, 1000);
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
    return this.cookieService.get('token');
  }

  //**check condition for token available in localstorage */
  hasToken() {
    return this.cookieService.get('token') !== null;
  }
}
