import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-services/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(
    private apiService : ApiService
  ) { }

   districtList(): Observable<any> {
      let url = API_CONSTANTS.district;
      return this.apiService
        .get(url)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    createDistrict(payload:any): Observable<any> {
      let url = API_CONSTANTS.district
      return this.apiService
        .post(url,payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }

    updateDistrict(payload:any): Observable<any> {
      let url = API_CONSTANTS.updateDeleteDist
      return this.apiService
        .put(url,payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }

    deleteDistrict(payload:any): Observable<any> {
      let url = API_CONSTANTS.updateDeleteDist
      return this.apiService
        .delete(url,payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }


    
  
}
