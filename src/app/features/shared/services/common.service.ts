import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';
// import { ApiService } from '../../http-services/api.service';
// import { API_CONSTANTS } from '../constant/API.Constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../http-services/api.service';
import { API_CONSTANTS } from '../constant/API.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  zoneListCache$!: Observable<any>;
  stateListCache$!: Observable<any>;
  circleListCache$!: Observable<any>;
  cityListCache$!: Observable<any>;
  divisionListCache$!: Observable<any>;
  companyListCache$!: Observable<any>;
  designationListCache$!: Observable<any>;
  usertypeListCache$!:Observable<any>;


  constructor(
    private apiService: ApiService,
    private http: HttpClient
  ) { }

  //**zone list service here */
  zoneList(stateId: any): Observable<any> {
    let url = API_CONSTANTS.stateBasedZone.replace("{stateId}", stateId)

    if (!this.zoneListCache$) {
      this.zoneListCache$ = this.apiService.get(url).pipe(
        shareReplay(1),
        catchError((error: HttpErrorResponse) => of(error))
      );
    }
    return this.zoneListCache$;
  }

  //   //**state list service here */
  stateList(): Observable<any> {
    let url = API_CONSTANTS.stateList;
    if (!this.stateListCache$) {
      this.stateListCache$ = this.apiService.get(url).pipe(
        shareReplay(1),
        catchError((error: HttpErrorResponse) => of(error))
      );
    }

    return this.stateListCache$;
  }

  circleList(zoneId: any): Observable<any> {
    let url = API_CONSTANTS.zoneBasedCircle.replace("{zoneId}", zoneId)

    if (!this.circleListCache$) {
      this.circleListCache$ = this.apiService.get(url).pipe(
        shareReplay(1),
        catchError((error: HttpErrorResponse) => of(error))
      );
    }
    return this.circleListCache$;
  }


  cityList(circleId: any): Observable<any> {
    let url = API_CONSTANTS.circleBasedcity.replace("{circleId}", circleId);
    if (!this.cityListCache$) {
      this.cityListCache$ = this.apiService.get(url).pipe(
        shareReplay(1),
        catchError((error: HttpErrorResponse) => of(error))
      );
    }

    return this.cityListCache$;
  }

  divisionList(cityId: any): Observable<any> {
    let url = API_CONSTANTS.cityBasedDivision.replace("{cityId}", cityId);
    if (!this.divisionListCache$) {
      this.divisionListCache$ = this.apiService.get(url).pipe(
        shareReplay(1),
        catchError((error: HttpErrorResponse) => of(error))
      );
    }

    return this.divisionListCache$;
  }


  //   //**company list service here */
  departmentList(): Observable<any> {
      let url = API_CONSTANTS.department

      if (!this.companyListCache$) {
        this.companyListCache$ = this.apiService.get(url).pipe(
          shareReplay(1),
          catchError((error: HttpErrorResponse) => of(error))
        );
      }
      return this.companyListCache$;
    }

     designationList(): Observable<any> {
      let url = API_CONSTANTS.designation

      if (!this.designationListCache$) {
        this.designationListCache$ = this.apiService.get(url).pipe(
          shareReplay(1),
          catchError((error: HttpErrorResponse) => of(error))
        );
      }
      return this.designationListCache$;
    }

    usertypeList(): Observable<any> {
      let url = API_CONSTANTS.usertype

      if (!this.usertypeListCache$) {
        this.usertypeListCache$ = this.apiService.get(url).pipe(
          shareReplay(1),
          catchError((error: HttpErrorResponse) => of(error))
        );
      }
      return this.usertypeListCache$;
    }
}
