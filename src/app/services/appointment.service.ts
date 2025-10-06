import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost/laravel/backendsoftsalud/public/api/appointment';
 

  constructor(private http: HttpClient) { }



  getappointments(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  getappointment(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createappointment(data: any) {
    return this.http.post(`${this.apiUrl}`, data)
  }

  getappointmentByDoctor(id: number, fecha: String | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointmentbydoctor/${id}/${fecha}`)
  }
  getappointmentByPatient(id: number, fecha: String | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointmentbypatient/${id}/${fecha}`)
  }

  getappointmentAll(fecha: String | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointmentall/${fecha}`)
  }

  getappointmentByDoctorCount(id: number, fecha: String | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointmentbydoctorcount/${id}/${fecha}`)
  }

  getappointmentAllCount(fecha: String | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/appointmentallcount/${fecha}`)
  }

  attendappointment(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/attendappointment/${id}`)
  }

  cancelappointment(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cancelappointment/${id}`)
  }

}
