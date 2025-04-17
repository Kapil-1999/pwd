import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(
    private cookieService: CookieService,
  ) { }
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
      return localStorage.getItem(`pwd-${key}`);
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

  getCurrentTab(tab:any) {
    let newTab = tab.split('_')
    return newTab[1];    
  }

  //**clear localstorage */
  // clear(): void {
  //   this.cookieService.delete('token', '/'); 
  //   localStorage.removeItem('menu');
  //   localStorage.removeItem('user')
  // }

  clear(): void {
    this.cookieService.delete(`pwd-token`, '/');
    localStorage.removeItem(`pwd-user`);
    localStorage.removeItem(`pwd-menu`);
  }

  // getToken(): string | null {
  //   return this.getItem('pwdtoken'); 
  // }

  isLoggedIn() {
    const token = this.getToken();
    return  token !== null;
  }

  getToken(): string {
    return this.cookieService.get(`pwd-token`);
  }
}