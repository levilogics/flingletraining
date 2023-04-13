import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  EEE = [];
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.EEE = err.error.errors;
        console.log("[error]", err);
        if (err) {
          switch (err.status) {
            case 400:
              if (this.EEE) {
                const modalStateErrors = [];
                for (const key in this.EEE) {
                  if (this.EEE[key]) {
                    modalStateErrors.push(this.EEE[key])
                  }
                }
                throw modalStateErrors.flat();
              } else {
                this.toastr.error(err.statusText, err.status.toString());
              }
              break;
            case 401:
              this.toastr.error(err.statusText, err.status.toString());
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: err.error}}
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              break;
          }
        }
        return throwError(err);
      })
    )
  }
}
