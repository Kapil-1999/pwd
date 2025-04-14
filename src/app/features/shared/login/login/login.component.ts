import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  ipAddress: string = '';
  showPassword: boolean = false;
  isloading : boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private localStorageService : LocalStorageService,
    private http : HttpClient,
    private notificationService : NotificationService,
    private cookieService: CookieService,

  ) {
    const currentTabId = localStorage.getItem('current-tab');
    if (currentTabId) {
      const sessionData = localStorage.getItem(`logout-event-${currentTabId}`);
      if (sessionData) {
        localStorage.removeItem('logout-event');
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/admin/dashboard/home']);
      }
    } else {
      localStorage.removeItem('logout-event');
      this.router.navigate(['/login']);
    }
   }

  ngOnInit() {
    this.setIntialvalue();
    this.getPublicIP()
  }

  getPublicIP(): void {
    this.http.get<{ ip: string }>('https://api.ipify.org?format=json').subscribe(
      (response) => {
        this.ipAddress = response.ip;
      },
      (error) => {
        console.error('Failed to fetch IP address:', error);
      }
    );
  }

  /**setinitial value on login form */
  setIntialvalue() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * login button 
   * @param formvalue 
   */
  submit(formvalue: any) {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } 
    this.isloading = true;
    
    this.tokenService.generateToken(formvalue, this.ipAddress).subscribe({
      next: (res: any) => {
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
            this.router.navigate(['/admin/dashboard/home']);
          }, 500);
        } else {
          this.notificationService.errorAlert(userDetail?.actionResponse);
        }
      },
      error: (error) => {
        this.isloading = false;
        this.notificationService.errorAlert('Login failed');
      },
      complete: () => {
        this.isloading = false;
      }
    });
  }


}
