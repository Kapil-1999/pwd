import { Injectable } from '@angular/core';
import { ApiService } from '../../../http-services/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../shared/constant/API.constants';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private apiService: ApiService
  ) { }

  getDashboardCount(): Observable<any> {
    let url = API_CONSTANTS.dashboardCount
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  userDetails(data:any) : Observable<any> {
    let url = API_CONSTANTS.userDetails.replace('{userId}', data.userId).replace('{desiId}', data.desiId).replace('{locId}', data?.locId)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  workAreaList(data: any): Observable<any> {
    let url = API_CONSTANTS.workAreaList.replace('{userId}', data.userId).replace('{userDesigId}', data.userDesigId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  categoryListByArea(taskId: any): Observable<any> {
    let url = API_CONSTANTS.categoryListByArea.replace('{taskId}', taskId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  subCategoryListByCat(data:any): Observable<any> {
    let url = API_CONSTANTS.subCategoryListByCat.replace('{taskId}', data?.taskId).replace('{categoryId}', data?.categoryId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
