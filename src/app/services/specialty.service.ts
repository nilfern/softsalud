import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  private apiUrl =
    'http://localhost/laravel/backendsoftsalud/public/api/specialty';

  constructor(private http: HttpClient) {}

  getspecialties(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  getspecialty(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getSpecialtyID(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createSpecialty(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }

  deleteSpecialties(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateSpecialty(id: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, data);
  }
}
