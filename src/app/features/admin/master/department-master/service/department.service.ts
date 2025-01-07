import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-services/api.service';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private apiService: ApiService
  ) { }

  departmentList(data: any): Observable<any> {
    let url = API_CONSTANTS.departmentData.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }


  createDepartment(payload: any): Observable<any> {
    let url = API_CONSTANTS.createDepartment
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getdepartmentById(id: any): Observable<any> {
    let url = API_CONSTANTS.getUpdateDeleteDepartment.replace('{id}', id)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updatedepartment(payload: any, id: any): Observable<any> {
    let url = API_CONSTANTS.getUpdateDeleteDepartment.replace('{id}', id)
    return this.apiService
      .put(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deletedepartment(id: any): Observable<any> {
    let url = API_CONSTANTS.getUpdateDeleteDepartment.replace('{id}', id)
    return this.apiService
      .delete(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
