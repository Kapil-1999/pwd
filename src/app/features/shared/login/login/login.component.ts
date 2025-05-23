import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/app.reducer';
import { selectProfile } from '../../../../core/app.action';

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
    private http : HttpClient,
    private notificationService : NotificationService,
    private cookieService: CookieService,
    private localStorageService :LocalStorageService,
    private store : Store<AppState>

  ) {
    let sessionData = this.localStorageService.isLoggedIn();    
    if (!sessionData) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/admin/dashboard/home']);
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
          this.cookieService.set(`pwd-token`, userDetail?.jwtToken, {
            path: '/',
            secure: false,
            sameSite: 'Lax',
            expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
          });
          this.localStorageService.setItem(`pwd-user`, JSON.stringify(userData));
          this.store.dispatch(selectProfile({selectProfile : userData?.img_path}))
          this.localStorageService.setItem(`pwd-menu`, JSON.stringify(menuData));
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
