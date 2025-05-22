import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../shared/constant/API.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../http-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyDataSubject = new BehaviorSubject<any[]>([]); // Initialize with empty array
  historyData$ = this.historyDataSubject.asObservable();
  constructor(
    private  apiService : ApiService
  ) { }

  historyData(data: any): Observable<any> {
    let url = API_CONSTANTS.historyData.replace('{userId}', data.userId)
    .replace('{fromDate}', data?.fromDate)
    .replace('{toDate}', data?.toDate)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateHistoryData(data: any) {
    this.historyDataSubject.next(data);
  }

  historyDataByUser(data: any): Observable<any> {
    let url = API_CONSTANTS.historyDataByUser.replace('{userId}', data.userId)
    .replace('{fromDate}', data?.fromDate)
    .replace('{toDate}', data?.toDate)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
