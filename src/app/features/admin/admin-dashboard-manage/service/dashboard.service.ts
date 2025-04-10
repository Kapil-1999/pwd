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
    let url = API_CONSTANTS.workAreaList.replace('{workId}', data.workId)
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

  workListByUser(data:any): Observable<any> {
    let url = API_CONSTANTS.workListByUser.replace('{userId}', data?.userId).replace('{userDesigId}', data?.userDesigId)
    return this.apiService
   .get(url)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  taskData(data:any): Observable<any> {
    let url = API_CONSTANTS.taskData.replace('{taskDetId}', data?.taskDetId).replace('{catId}', data?.catId).replace('{subCatId}', data?.subCatId)
    return this.apiService
   .get(url)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form1Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form1Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form2Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form2Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form3Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form3Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form5Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form5Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form6Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form6Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  form7Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form7Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form8Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form8Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form9Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form9Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form10Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form10Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
   .get(url)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form11Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form11Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
   .get(url)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form12Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form12Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
   .get(url)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form13Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form13Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form14Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form14Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form15Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form15Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form16Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form16Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form17Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form17Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form18Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form18Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form19Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form19Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form20Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form20Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form21Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form21Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form22Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form22Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form23Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form23Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form24Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form24Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  form25Data(data:any): Observable<any> {
    let url = API_CONSTANTS.form25Data.replace('{taskId}', data?.taskId).replace('{taskDetId}', data?.taskDetId)
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
