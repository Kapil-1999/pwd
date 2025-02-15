import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { ApiService } from '../../../../http-services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(
    private apiService : ApiService
  ) { }

  zoneList(data: any): Observable<any> {
    let url = API_CONSTANTS.zoneList.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createZone(payload:any): Observable<any> {
    let url = API_CONSTANTS.addZone
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateZone(payload:any, id:any): Observable<any> {
    let url = API_CONSTANTS.updateZone.replace('{zoneId}', id)
    return this.apiService
      .put(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteZone(id:any): Observable<any> {
    let url = API_CONSTANTS.updateZone.replace('{zoneId}', id)
    return this.apiService
      .delete(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
