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

  supritendingEngList(chiefEngId:any): Observable<any> {
    let url = API_CONSTANTS.sEngList.replace("{chiefEngId}", chiefEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  executiveEngList(supEngId:any): Observable<any> {
    let url = API_CONSTANTS.eeList.replace("{supEngId}", supEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  assistantEngList(execEngId:any): Observable<any> {
    let url = API_CONSTANTS.aeList.replace("{execEngId}", execEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  juniorEngList(assEngId:any): Observable<any> {
    let url = API_CONSTANTS.jeList.replace("{assEngId}", assEngId);
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

  getZoneByChiefEng(chiefEngId: any): Observable<any> {
    const url = API_CONSTANTS.getZoneByChiefEng.replace("{chiefEngId}", chiefEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }
  
  getCircleBySupEng(supEngId: any): Observable<any> {
    const url = API_CONSTANTS.GetCircleBySupEng.replace("{supEngId}", supEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  getDistrictByExecEng(execEngId: any): Observable<any> {
    const url = API_CONSTANTS.GetDistrictByExecEng.replace("{execEngId}", execEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }
  
  getDivisionByAssEng(assEngId: any): Observable<any> {
    const url = API_CONSTANTS.GetDivisionByAssEng.replace("{assEngId}", assEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }
  


}
