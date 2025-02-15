import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { ApiService } from '../../../../http-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(
    private apiService: ApiService
  ) { }

  userList(data:any): Observable<any> {
    let url = API_CONSTANTS.user.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize).replace('{searchText}', data.searchText);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createUser(payload:any): Observable<any> {
    let url = API_CONSTANTS.adduser
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }


  userById(id:any): Observable<any> {
    let url = API_CONSTANTS.userById.replace('{userId}', id);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateUser(payload:any, id:any): Observable<any> {
    let url = API_CONSTANTS.userById.replace('{userId}', id);
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteUser(id:any): Observable<any> {
    let url = API_CONSTANTS.userById.replace('{userId}', id);
    return this.apiService
      .delete(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
