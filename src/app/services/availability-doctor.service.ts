import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityDoctorService {

  private apiUrl = 'http://localhost/laravel/backendsoftsalud/public/api/availabilitydoctor';

  constructor(private http: HttpClient) { }


  getavailabilitys(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  getavailability(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getavailabilityID(id: number, fecha: String | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/${fecha}`)
  }

  getavailabilityDoctor(id: number, fecha: String | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/availability/${id}/${fecha}`)
  }

  getavailabilityDoctorShow(id: number, fecha: String | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/availabilityspecialty/${id}/${fecha}`)
  }

  createavailability(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data)
  }
  
  deleteavailability(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
