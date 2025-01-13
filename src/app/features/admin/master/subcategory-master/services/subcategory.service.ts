import { Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../../../shared/constant/API.constants';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../../http-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(
    private apiService: ApiService
  ) { }

  subcategoryList(data: any): Observable<any> {
    let url = API_CONSTANTS.SubCategory.replace('{pageNo}', data.pageNo).replace('{pageSize}', data?.pageSize);
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  formCodeList(): Observable<any> {
    let url = API_CONSTANTS.formCodeList;
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }


  createsubCategory(payload: any): Observable<any> {
    let url = API_CONSTANTS.addSubcategory
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getsubCatById(id: any): Observable<any> {
    let url = API_CONSTANTS.updateDelgetSubCat.replace('{id}', id)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateSubCategory(payload: any, id: any): Observable<any> {
    let url = API_CONSTANTS.updateDelgetSubCat.replace('{id}', id)
    return this.apiService
      .put(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteSubCategory(id: any): Observable<any> {
    let url = API_CONSTANTS.updateDelgetSubCat.replace('{id}', id)
    return this.apiService
      .delete(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
