import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../environments/environment';
import {inject} from '@angular/core';

import {catchError, throwError} from 'rxjs';
import {AuthService} from '../service/auth.service';

export const backendInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith("/")) {
    //const token = inject(AuthService).token;
    req = req.clone({
      url: environment.API_URL + req.url,
      //setHeaders: token ? {Authorization: "Bearer " + token} : undefined
    })
  }
  return next(req);
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token;
  if (req.url.startsWith(environment.API_URL) && token) {
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + token
      }
    })
  }
  return next(req)
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  if (req.url.startsWith(environment.API_URL)) {
    return next(req).pipe(catchError(err => {
      if(err.status === 401) {
        auth.logout()
      }
      // À garder dans un catch error pour permettre une gestion ultérieure de celle-ci
      return throwError(() => err)
    }))
  }
  return next(req)
}
