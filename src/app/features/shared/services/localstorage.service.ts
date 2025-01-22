import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(
     private cookieService : CookieService
  ){}
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  //**setitem in localstorage */
  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  //**getitem from localstorage */
  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  }

  //**remove item from lovalstorage */
  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  //**clear localstorage */
  clear(): void {
    this.cookieService.delete('token', '/'); 
    localStorage.removeItem('menu');
    localStorage.removeItem('user')
  }

  // getToken(): string | null {
  //   return this.getItem('pwdtoken'); 
  // }

  isLoggedIn() {
    return this.getToken() !== null
  }

  getToken(): string {
    return this.cookieService.get('token');
  }
}