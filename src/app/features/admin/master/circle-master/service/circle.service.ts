import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-services/api.service';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CircleService {

  constructor(
    private apiService: ApiService

  ) { }

  circleList(data:any): Observable<any> {
    let url = API_CONSTANTS.circle.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  
  createCircle(payload:any): Observable<any> {
    let url = API_CONSTANTS.addCircle
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateCircle(payload:any, id:any): Observable<any> {
    let url = API_CONSTANTS.deleteUpdateCircle.replace('{circleId}', id)
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteCircle(id:any): Observable<any> {
    let url = API_CONSTANTS.deleteUpdateCircle.replace('{circleId}', id)
    return this.apiService
      .delete(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
