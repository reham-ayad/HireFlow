import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);

  let token: string | null = null;

  // localStorage is available only in the browser
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }

  // console.log('INTERCEPTOR:', req.url);
  // console.log('TOKEN:', token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(
      'AUTH HEADER:',
      req.headers.get('Authorization')
    );
  }

  return next(req);
};