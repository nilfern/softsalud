import { Component, Input } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointmen-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule, MatButtonModule],
  templateUrl: './appointmen-list.component.html',
  styleUrl: './appointmen-list.component.css',
})
export class AppointmenListComponent {
  clientesconcitas: any[] = [];

  @Input() fecha!: string | null;
  @Input() role!: string | null;
  @Input() id!: string | null;

  constructor(
    private appoinmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.role == 'paciente') {
      this.getappointmentByPatient();
    }
    if (this.role == 'empleado' || this.role == 'administrador') {
      this.getappointmentByDoctoR();
    }
  }

  getappointmentByDoctoR(): void {
    this.appoinmentService
      .getappointmentAll(this.fecha)
      .subscribe((response) => {
        this.clientesconcitas = response.data;
      });
  }

  getappointmentByPatient(): void {
    this.appoinmentService
      .getappointmentByPatient(Number(this.id), this.fecha)
      .subscribe((response) => {     
        this.clientesconcitas = response.data;
      });
  }

  oncancel(cita: number): void {
    this.appoinmentService
      .cancelappointment(Number(cita))
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
