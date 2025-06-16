import { Component, Input } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';

@Component({
  selector: 'app-appointmenbydoctor-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './appointmenbydoctor-list.component.html',
  styleUrl: './appointmenbydoctor-list.component.css',
})
export class AppointmenbydoctorListComponent {
  clientesconcitas: any[] = [];
  @Input() doctor!: string | null;
  @Input() fecha!: string | null;

  constructor(
    private appoinmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getappointmentByDoctoR();
  }

  getappointmentByDoctoR(): void {
    this.appoinmentService
      .getappointmentByDoctor(Number(this.doctor), this.fecha)
      .subscribe((response) => {
        this.clientesconcitas = response.data;
      });
  }

  onattend(cita: number): void {
    this.appoinmentService
      .attendappointment(Number(cita))
      .subscribe((response) => {
        console.log(response.Status);

        const currentUrl = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      });
  }
}
