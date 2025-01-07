import { Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from '../../../../http-services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(
    private apiService : ApiService
  ) { }

  desigantion(data: any): Observable<any> {
      let url = API_CONSTANTS.desigantion.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize);
      return this.apiService
        .get(url)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
  
    createDesigantion(payload: any): Observable<any> {
      let url = API_CONSTANTS.createDesigantion
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    getDesigantionById(id: any): Observable<any> {
      let url = API_CONSTANTS.getUpdateDeleteDes.replace('{id}', id)
      return this.apiService
        .get(url)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    updateDesigantion(payload: any, id: any): Observable<any> {
      let url = API_CONSTANTS.getUpdateDeleteDes.replace('{id}', id)
      return this.apiService
        .put(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    deleteDesigantion(id: any): Observable<any> {
      let url = API_CONSTANTS.getUpdateDeleteDes.replace('{id}', id)
      return this.apiService
        .delete(url)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
}
