import { Injectable } from '@angular/core';
import { ApiService } from '../../../../http-services/api.service';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private apiService: ApiService
  ) { }

  categoryList(data:any): Observable<any> {
      let url = API_CONSTANTS.category.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize);
      return this.apiService
        .get(url)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }


  createCategory(payload: any): Observable<any> {
    let url = API_CONSTANTS.addcategory
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getCatById(id: any): Observable<any> {
    let url = API_CONSTANTS.updateDelgetCat.replace('{id}', id)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateCategory(payload: any, id: any): Observable<any> {
    let url = API_CONSTANTS.updateDelgetCat.replace('{id}', id)
    return this.apiService
      .put(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteCategory(id: any): Observable<any> {
    let url = API_CONSTANTS.updateDelgetCat.replace('{id}', id)
    return this.apiService
      .delete(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}


