import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../http-services/api.service';
import { API_CONSTANTS } from '../constant/API.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private apiService: ApiService
  ) { }

  zoneList(stateId: any): Observable<any> {
    let url = API_CONSTANTS.stateBasedZone.replace("{stateId}", stateId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  stateList(): Observable<any> {
    let url = API_CONSTANTS.stateList;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  circleList(zoneId: any): Observable<any> {
    let url = API_CONSTANTS.zoneBasedCircle.replace("{zoneId}", zoneId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  cityList(circleId: any): Observable<any> {
    let url = API_CONSTANTS.circleBasedcity.replace("{circleId}", circleId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  divisionList(cityId: any): Observable<any> {
    let url = API_CONSTANTS.cityBasedDivision.replace("{cityId}", cityId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  departmentList(): Observable<any> {
    let url = API_CONSTANTS.department;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  designationList(): Observable<any> {
    let url = API_CONSTANTS.designation;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  usertypeList(): Observable<any> {
    let url = API_CONSTANTS.usertype;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  chiefEngList(): Observable<any> {
    let url = API_CONSTANTS.chiefEngList;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  supritendingEngList(): Observable<any> {
    let url = API_CONSTANTS.sEngList;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  executiveEngList(): Observable<any> {
    let url = API_CONSTANTS.eeList;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  assistantEngList(): Observable<any> {
    let url = API_CONSTANTS.aeList;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  juniorEngList(): Observable<any> {
    let url = API_CONSTANTS.jeList;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  districtList(): Observable<any> {
    let url = API_CONSTANTS.district;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }
}
