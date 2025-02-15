import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { ApiService } from '../../../../http-services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private apiService: ApiService
  ) { }

  divisionList(data:any): Observable<any> {
    let url = API_CONSTANTS.getDivisionDetails.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createDivision(payload:any): Observable<any> {
    let url = API_CONSTANTS.createDivision
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateDivision(payload:any, id:any): Observable<any> {
    let url = API_CONSTANTS.updateDivision.replace('{divisionId}', id)
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteDivision(id:any): Observable<any> {
    let url = API_CONSTANTS.updateDivision.replace('{divisionId}', id)
    return this.apiService
      .delete(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  } 
}
