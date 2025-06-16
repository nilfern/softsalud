import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ModalAppointmentbydoctorformComponent } from '../../components/appointmentByDoctor/modal-appointmenbydoctortform/modal-appointmentbydoctorform.component';


@Component({
  selector: 'app-appointmentByDoctor',
  standalone: true,
  imports: [MatSidenavModule,SidebarComponent,ToolbarComponent,MatCardModule,ModalAppointmentbydoctorformComponent],
  templateUrl: './appointmentByDoctor.component.html',
  styleUrl: './appointmentByDoctor.component.css'
})
export class AppointmentByDoctorComponent {

   constructor(private dialog: MatDialog) {}  


}
