import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { ApiService } from '../../../../http-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserMasterService {

  constructor(
    private apiService : ApiService
  ) { }

  userList(): Observable<any> {
        let url = API_CONSTANTS.user;
        return this.apiService
          .get(url)
          .pipe(catchError((error: HttpErrorResponse) => of(error)));
      }
}
