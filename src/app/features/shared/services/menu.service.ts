import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from './localstorage.service';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuListSubject = new BehaviorSubject<any[]>([]);
  public menuList$ = this.menuListSubject.asObservable();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  // getMenuList(): Observable<any> {
  //   let userData: any = this.localStorageService.getItem('userDetail');
  //   let details = JSON.parse(userData);

  //   return this.loginService.menuList(details?.UserId, details?.RoleId).pipe(
  //     tap((res: any) => {
  //       this.menuListSubject.next(res); 
  //       this.router.navigate(['/user/home/dashboard']); 
  //     })
  //   );
  // }

  getMenuListData(): Observable<any[]> {
    return this.menuList$;
  }
}