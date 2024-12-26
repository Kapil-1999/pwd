import { Injectable } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { LocalStorageService } from './localstorage.service';
import { JwtTokenService } from './jwt-token.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

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
    private storageService: StorageService
  ) { }

  //**generate token and redirect to dashboard page and after decode save token in indexdb */
  generateToken(data: any) {
    let payload = {
      "UserName": data.userName,
      "Password": data.password
    };

    this.loginService.login(payload).subscribe((res: any) => {      
      const userDetail = res.body;      
      if(userDetail?.statusCode == 200) {
        this.notificationService.successAlert('Login Successfully');
        let userData = userDetail?.result        
        this.localStorageService.setItem("pwdtoken", userDetail?.jwtToken);
        this.localStorageService.setItem("user", JSON.stringify(userData) )
        setTimeout(() => {          
          this.goToDashboard(); 
        }, 1000);
      } else {
        this.notificationService.errorAlert(userDetail?.message)
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/admin/home']);
    // this.storageService.getItem('userDetail').subscribe((res) => {
    //   if(res?.fk_RoleId ===32) {
    //   }
    // })
  }

  //**gettoken from localstorage */
  getToken() {
    return this.localStorageService.getItem('pwdtoken');
  }

  //**check condition for token available in localstorage */
  hasToken() {
    return this.localStorageService.getItem('pwdtoken') !== null;
  }
}
