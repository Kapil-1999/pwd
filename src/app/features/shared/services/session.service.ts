import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private router: Router
  ) { }

  redirectToLogin(currentURL: string) {
    this.storeCurrentLocation(currentURL);
    sessionStorage.removeItem('inactiveSession');
    this.router.navigateByUrl('/user/home/dashboard')
  }

  storeCurrentLocation(currentURL: string) {
    sessionStorage.setItem("redirectURL", currentURL);
  }
}
