import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
// import { ApiService } from '../../http-services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { API_CONSTANTS } from '../constant/API.constants';
import { ApiService } from '../../http-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
     private apiService: ApiService
  ) { }

  //** login service here */
  login(payload:any): Observable<any> {
    let url = API_CONSTANTS.login
    return this.apiService
    .post(url,payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  // //**menulist service here */
  // menuList(userId:any, role:any): Observable<any> {
  //   let url = API_CONSTANTS.menu.replace("{userId}",userId).replace("{role}", role)
  //   return this.apiService
  //     .get(url)
  //     .pipe(catchError((error: HttpErrorResponse) => of(error)));
  // }
}
