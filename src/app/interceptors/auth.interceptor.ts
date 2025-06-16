import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

  export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
    const token = localStorage.getItem('token');  // Obtiene el token almacenado en localStorage

    if (token) {
      // Clona la solicitud y añade el encabezado de autorización
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
 
   return next(request);  // Envía la solicitud al siguiente manejador
  };
