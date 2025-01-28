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
      const currentTabId = localStorage.getItem('login-event');      
      return localStorage.getItem(`${key}-login-${currentTabId}`);
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
  // clear(): void {
  //   this.cookieService.delete('token', '/'); 
  //   localStorage.removeItem('menu');
  //   localStorage.removeItem('user')
  // }

  clear(): void {
    const currentTabId = localStorage.getItem('login-event');
    if (currentTabId) {
      this.cookieService.delete(`token-login-${currentTabId}`, '/');
      localStorage.removeItem(`menu-login-${currentTabId}`);
      localStorage.removeItem(`user-login-${currentTabId}`);
      localStorage.setItem('logout-event', currentTabId + '-' + new Date().getTime());
      localStorage.removeItem('login-event');
    }
  }

  // getToken(): string | null {
  //   return this.getItem('pwdtoken'); 
  // }

  isLoggedIn() {
    const loginEvent = localStorage.getItem('login-event');
    const logoutEvent = localStorage.getItem('logout-event');
    const token = this.getToken();
    return loginEvent && (!logoutEvent || loginEvent > logoutEvent) && token !== null;
  }

  getToken(): string {
    const currentTabId = localStorage.getItem('login-event');        
    return this.cookieService.get(`token-login-${currentTabId}`);
  }
}