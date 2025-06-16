import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  myuser: any;

  private apiUrl = 'http://localhost/laravel/backendsoftsalud/public/api';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable(); // Observable para suscribirse a los datos del usuario

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); // Guarda el token en localStorage
        this.userSubject.next(response.data); // Actualiza los datos del usuario
      })
    );

  }

  logout(): Observable<any> {
    this.userSubject.next(null); // Limpia los datos del usuario
    return this.http.post(`${this.apiUrl}/logout`, {});

  }

  getUser(): any {
    return this.userSubject.value; // Obtiene los datos actuales del usuario
  }


  loadUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`${this.apiUrl}/user`).subscribe({
        next: (user: any) => {
          this.userSubject.next(user); // Actualiza los datos del usuario        
        },
        error: () => {
          this.logout(); // Si falla, cierra sesión
        },
      });
    }
  }

}
