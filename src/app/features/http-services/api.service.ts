import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, ReplaySubject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  responseType = {
    observe: "response",
  };

  miniCartSubject = new ReplaySubject(1);

  setBaseSiteIdLocal(url: string) {
    const formatedURl = 'http://103.109.7.173:7604/api/' + url
    return formatedURl;
  }

  get(urlData: any, options: any = {}): Observable<any> {
    let requestOptions = { ...this.responseType, ...options };
    return this.http
      .get(this.setBaseSiteIdLocal(urlData), requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getDataWithParam(path: string, payload: any): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll(payload);
    return this.http.get(this.setBaseSiteIdLocal(path), { params: params }).pipe();
  }

  post(url: any, payload: any, options: any = {}): Observable<any> {
    let requestOptions = { ...options, ...this.responseType };
    return this.http.post(this.setBaseSiteIdLocal(url), payload, requestOptions);
  }

  put(url: any, payload: any, options: any = {}) {
    let requestOptions = { ...options, ...this.responseType };
    return this.http
      .put(this.setBaseSiteIdLocal(url), payload, requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  patch(url: any, payload: any, options: any = {}) {
    let requestOptions = { ...options, ...this.responseType };
    return this.http
      .patch(this.setBaseSiteIdLocal(url), payload, requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  delete(url: any, options: any = {}): Observable<any> {
    let requestOptions = { ...options, ...this.responseType };
    return this.http
      .delete(this.setBaseSiteIdLocal(url), requestOptions)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }










  // getUserDetails(url: any) {
  //   const requestUrl = environment.baseAPIURl + url;
  //   const headers = new HttpHeaders()
  //     .set("Access-Control-Allow-Origin", "*")
  //     .set("Access-Control-Allow-Headers", "Content-Type")
  //     .set(
  //       "Authorization",
  //       "Basic " +
  //         btoa(
  //           `${environment.onDemand.clientId}:${environment.onDemand.secret}`
  //         )
  //     )
  //     .set("Content-Type", "application/json");
  //   return this.http.post(requestUrl, {}, { headers: headers });
  // }

  // getHomePageDate(url: any): Observable<any> {
  //   return this.http
  //     .get(this.setBaseSiteId(url))
  //     .pipe(catchError((error: HttpErrorResponse) => of(error)));
  // }
}
