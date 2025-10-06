import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

  export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
    const token = localStorage.getItem('token'); 

    if (token) {
     
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
 
   return next(request);  
  };
