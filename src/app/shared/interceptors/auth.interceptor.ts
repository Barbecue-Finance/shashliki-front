import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _userService: UserService,
    private _router: Router
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
            // this._userService.logout()
            this._userService.killToken()
            this._router.navigate(['/auth'])
          }
          return throwError(error)
        })
      )
  }

}
