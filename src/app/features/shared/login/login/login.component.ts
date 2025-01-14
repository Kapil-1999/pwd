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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tokenService: TokenService,
    private localStorageService : LocalStorageService,
    private http : HttpClient

  ) {
    if (this.localStorageService.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard/home']);
    } else {
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
    this.tokenService.generateToken(formvalue, this.ipAddress);
  }


}
