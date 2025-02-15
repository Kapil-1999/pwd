import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-services/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DistrictReportService {

  constructor(
    private apiService: ApiService
  ) { }

  districtReport(data: any, payload: any): Observable<any> {
    let url = API_CONSTANTS.districtReport.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize).replace('{zoneId}', payload.zone).replace('{circleId}', payload?.circle).replace('{districtId}', payload?.city);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
