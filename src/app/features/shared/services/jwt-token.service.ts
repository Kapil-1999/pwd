import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

   decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

   storeToken(token: string): void {
    localStorage.setItem('pwdtoken', token);
  }

   getToken(): string | null {
    return localStorage.getItem('pwdtoken');
  }

   removeToken(): void {
    localStorage.removeItem('pwdtoken');
  }

}
