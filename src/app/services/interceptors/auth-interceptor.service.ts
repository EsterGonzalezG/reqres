import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from '../users/users.service';
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService {
  constructor(private router: Router, public userService: UsersService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const login = '/login';
    const token: string | null = this.userService.getToken();
    let request = req;

    if (token && req.url.search(login) === -1) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.userService.logout();
        }

        return throwError(() => err);
      }),
    );
  }
}
