import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { PatientsComponent } from './pages/patients/patients.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { SpecialtiesComponent } from './pages/specialties/specialties.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { AvailabilityComponent } from './pages/availability/availability.component';
import { AvailabilityDetailsComponent } from './pages/availability-details/availability-details.component';
import { AppointmentByDoctorComponent } from './pages/appointmentByDoctors/appointmentByDoctor.component';
import { RegisterComponent } from './pages/register/register.component';
import { PerfilComponent } from './pages/perfil/perfil.component';



export const routes: Routes = [
    { path: "", redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "patients", component: PatientsComponent, canActivate: [AuthGuard] },
    { path: "employees", component: EmployeesComponent, canActivate: [AuthGuard] },
    { path: "appointments", component: AppointmentComponent, canActivate: [AuthGuard] },
    { path: "appointmentsbydoctor", component: AppointmentByDoctorComponent, canActivate: [AuthGuard] },
    { path: "specialty", component: SpecialtiesComponent, canActivate: [AuthGuard] },
    { path: "doctors", component: DoctorsComponent, canActivate: [AuthGuard] }, 
    { path: 'availability_details/:id', component: AvailabilityDetailsComponent, canActivate: [AuthGuard] },
    { path: "availability", component: AvailabilityComponent, canActivate: [AuthGuard] },
    { path: "perfil", component: PerfilComponent, canActivate: [AuthGuard] }      
];
