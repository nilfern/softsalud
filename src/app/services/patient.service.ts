import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://localhost/laravel/backendsoftsalud/public/api/patient';


  constructor(private http: HttpClient) { }

  getPatiens(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`);
  }

  getPatientID(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  createPatient(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data)
  }


}
