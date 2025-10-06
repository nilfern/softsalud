import {  Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://localhost/laravel/backendsoftsalud/public/api/doctor';

  constructor(private http: HttpClient) { }

  getdoctors(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  getdoctor(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getdoctorbyuser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/byuser/${id}`)
  }

  getDoctorID(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/showbyid/${id}`)
  }

  createDoctor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data)
  }
  updateDoctor(id: number,data: any): Observable<any> {  
    return this.http.post(`${this.apiUrl}/${id}`, data)
  }

  deleteDoctors(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}