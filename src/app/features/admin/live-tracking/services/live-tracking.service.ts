import { Injectable } from '@angular/core';
import { ApiService } from '../../../http-services/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../shared/constant/API.constants';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiveTrackingService {

  constructor(
    private apiService: ApiService
  ) { }

  liveTracking(data: any) {
    let params: string[] = [];
    if (data.selectedDesigId !== undefined) {
      params.push(`selectedDesigId=${data.selectedDesigId}`);
    }
    if (data.zoneId !== undefined) {
      params.push(`zoneId=${data.zoneId}`);
    }
    if (data.circleId !== undefined) {
      params.push(`circleId=${data.circleId}`);
    }
    if (data.districtId !== undefined) {
      params.push(`districtId=${data.districtId}`);
    }
  
    const url = `${API_CONSTANTS.liveTracking.split('?')[0]}?${params.join('&')}`;
  
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
