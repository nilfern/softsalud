import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule} from '@angular/material/card';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { AuthService } from '../../services/auth.service';
import { AppointmentService } from '../../services/appointment.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { AppointmenbydoctorListComponent } from '../../components/appointmentByDoctor/appointmenbydoctor-list/appointmenbydoctor-list.component';
import { AppointmenListComponent } from '../../components/appointments/appointmen-list/appointmen-list.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DoctorService } from '../../services/doctor.service';
import { EmployeeService } from '../../services/employee.service';
import { MycalendarComponent } from '../../components/mycalendar/mycalendar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
imports: [ToolbarComponent,LoadingComponent,MycalendarComponent,MatCardModule,MatExpansionModule,MatMenuModule, MatListModule,CommonModule,SidebarComponent,MatToolbarModule,MatIconModule,MatSelectModule,MatButtonModule,MatSidenavModule,FormsModule,AppointmenbydoctorListComponent,AppointmenListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DatePipe],
})

export class DashboardComponent {
  
  sidenavMode: 'over' | 'side' = 'side';
  isScreenLarge = true;
  rawDate = new Date(); // Fecha actual
  formattedDate = this.datePipe.transform(this.rawDate, 'yyyy-MM-dd');

  doctorId: string | null = null;
  patientId: string | null = null;
  clientesconcitas: any;
  user: any;
  isUserLoaded = false;

  constructor(private datePipe: DatePipe,private authService: AuthService,private appoinmentService:AppointmentService,private breakpointObserver: BreakpointObserver){
   }

  ngOnInit(): void {

    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
    .subscribe(result => {
      if (result.matches) {
        this.sidenavMode = 'over';
        this.isScreenLarge = false;
      } else {
        this.sidenavMode = 'side';
        this.isScreenLarge = true;
      }
    });

    this.authService.user$.subscribe((user) => {
     
      if (user) {
        this.user = user;      
           
        if(user.role=="medico"){     
         this.doctorId=user.doctors[0].id; 
         this.getApointmentByDoctorCount(Number(this.doctorId));     
        }
         if(user.role=="paciente"){     
         this.patientId=user.patients[0].id; 
         ///this.getApointmentByDoctorCount(Number(this.doctorId));  
         this.getApointmentAllCount();  
        // this.isUserLoaded = true;  
        }

       if(user.role=="empleado" ||user.role=="administrador") {
          this.getApointmentAllCount(); 
         }
   
      }   
    
    });
  

  }


  getApointmentByDoctorCount(Doctor: number): void {
    this.appoinmentService.getappointmentByDoctorCount(Doctor,this.formattedDate).subscribe((response) => {
      this.clientesconcitas = response;
      console.log(response);
      this.isUserLoaded = true;
    });
  } 
  getApointmentAllCount(): void {
      this.appoinmentService.getappointmentAllCount(this.formattedDate).subscribe((response) => {
        this.clientesconcitas = response;
        console.log("nada");
        console.log(this.clientesconcitas);
        this.isUserLoaded = true;
      });
  }  

 
 
}
