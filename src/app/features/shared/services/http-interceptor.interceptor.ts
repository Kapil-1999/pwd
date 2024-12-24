import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { TokenService } from "./token.service";
import { SessionService } from "./session.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})

export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private sessionService: SessionService,
    private router: Router
  ) { };

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenService.hasToken()) {
      return next
        .handle(
          httpRequest.clone({
            setHeaders: {
              Authorization: "Bearer " + this.tokenService.getToken(),
            },
          })
        )
        .pipe(
          catchError((error: any) => {
            if (this.invalidTokenError(error)) {
              this.sessionService.redirectToLogin(this.router.url);
            }
            if (this.unAuthorizedError(error)) {
              this.sessionService.redirectToLogin(this.router.url);
            }
            return throwError(error);
          })
        );
    }
    httpRequest.headers.delete("Content-Type")

    return next.handle(httpRequest);
  }

  invalidTokenError(error: any): boolean {
    let errorsArray = error.error.errors;
    if (errorsArray === undefined) return false;
    return errorsArray.some(
      (object: any) => object.type === "InvalidTokenError"
    );
  }

  unAuthorizedError(error: any): boolean {
    let errorsArray = error.error.errors;
    if (errorsArray === undefined) return false;
    return errorsArray.some(
      (object: any) => object.type === "UnauthorizedError"
    );
  }
}