import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _userService: UserService,
    private _router: Router,
    readonly matSnackBar: MatSnackBar,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._userService.isLoggedIn()) {
      req = req.clone({
        setHeaders: {
          'auth-token': this._userService.token
        }
      })
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          if (error.status == 401) {
            this._userService.logoutAndNavigateToAuth()
          }

          if (error.error?.error) {
            this.matSnackBar.open(error.error?.error, '', {duration: 3000})
          } else {
            this.matSnackBar.open('Ошибка на сервере', '', {duration: 3000})
            console.log('Error:', error)
          }
          return throwError(error)
        })
      )
  }

}
