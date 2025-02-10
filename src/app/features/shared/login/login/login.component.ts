import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { HttpClient } from '@angular/common/http';

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
    private http : HttpClient

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
  submit(formvalue:any) {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } 
   this.isloading = true;
    this.tokenService.generateToken(formvalue, this.ipAddress);
    this.isloading = false
  }


}
