import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../../http-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PoiAllocationService {

  constructor(
    private apiService: ApiService
  ) { }

  POIAllocation(data: any): Observable<any> {
    let url = API_CONSTANTS.POIAllocation.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addPOIAllocation(payload: any): Observable<any> {
    let url = API_CONSTANTS.addPOIAllocation
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getAllocationById(id: any): Observable<any> {
    let url = API_CONSTANTS.getUpdateDeleteAllocation.replace('{id}', id)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateAllocation(payload: any, id: any): Observable<any> {
    let url = API_CONSTANTS.getUpdateDeleteAllocation.replace('{id}', id)
    return this.apiService
      .put(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteAllocation(id: any): Observable<any> {
    let url = API_CONSTANTS.getUpdateDeleteAllocation.replace('{id}', id)
    return this.apiService
      .delete(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getUserBudesi(id:any) {
    let url = API_CONSTANTS.GetUserByDesig.replace('{id}', id);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  poiArea() {
    let url = API_CONSTANTS.poiArea;
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }


}
