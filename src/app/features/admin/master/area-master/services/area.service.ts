import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { ApiService } from '../../../../http-services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(
    private apiService: ApiService
  ) { }

  areaList(data: any): Observable<any> {
    let url = API_CONSTANTS.areaList.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addArea(payload: any): Observable<any> {
    let url = API_CONSTANTS.addArea
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getAreaById(id: any): Observable<any> {
    let url = API_CONSTANTS.getDeletUpdateArea.replace('{id}', id)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateArea(payload: any, id: any): Observable<any> {
    let url = API_CONSTANTS.getDeletUpdateArea.replace('{id}', id)
    return this.apiService
      .put(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteArea(id: any): Observable<any> {
    let url = API_CONSTANTS.getDeletUpdateArea.replace('{id}', id)
    return this.apiService
      .delete(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  travelMode(): Observable<any> {
    let url = API_CONSTANTS.travelMode;
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
