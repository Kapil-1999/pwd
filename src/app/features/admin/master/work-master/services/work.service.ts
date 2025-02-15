import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-services/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(
    private apiService: ApiService
  ) { }

  workList(data: any): Observable<any> {
    let url = API_CONSTANTS.workList.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  natureWorkList(): Observable<any> {
    let url = API_CONSTANTS.natureWorkList;
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addWork(payload: any): Observable<any> {
    let url = API_CONSTANTS.addWork
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getWorkById(id: any): Observable<any> {
    let url = API_CONSTANTS.getUpdateDeleteWork.replace('{id}', id)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateWork(payload: any, id: any): Observable<any> {
    let url = API_CONSTANTS.getUpdateDeleteWork.replace('{id}', id)
    return this.apiService
      .put(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteWork(id: any): Observable<any> {
    let url = API_CONSTANTS.getUpdateDeleteWork.replace('{id}', id)
    return this.apiService
      .delete(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
