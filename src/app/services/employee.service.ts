import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost/laravel/backendsoftsalud/public/api/employee';

  constructor(private http: HttpClient) { }

  getEmployees(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  getEmployeeID(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/showbyid/${id}`)
  }

  getemployeebyuser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/byuser/${id}`)
  }

  createEmployee(data: any): Observable<any> {    
    return this.http.post(`${this.apiUrl}`, data)
  }

  updateEmployee(id: number,data: any): Observable<any> {  
    return this.http.post(`${this.apiUrl}/${id}`, data)
  }

  
}
