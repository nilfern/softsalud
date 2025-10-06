import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
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
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PatientService } from '../../services/patient.service';
import { SpecialtyService } from '../../services/specialty.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatIcon,
    ToolbarComponent,
    LoadingComponent,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    CommonModule,
    SidebarComponent,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    AppointmenbydoctorListComponent,
    AppointmenListComponent,
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  providers: [DatePipe],
})
export class PerfilComponent {
  especialidades: any[] = [];
  sidenavMode: 'over' | 'side' = 'side';
  isScreenLarge = true;
  rawDate = new Date();
  formattedDate = this.datePipe.transform(this.rawDate, 'yyyy-MM-dd');
  doctorId: string | null = null;
  patientId: string | null = null;
  employeeId: string | null = null;
  role: string | null = null;
  clientesconcitas: any;
  user: any;
  isUserLoaded = false;
  fileName: string = '';
  hide = true;
  employeeForm: FormGroup;
  patientForm: FormGroup;
  doctorForm: FormGroup;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private specialtyService: SpecialtyService,
    private toastr: ToastrService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private appoinmentService: AppointmentService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.employeeForm = this.fb.group({
      dni: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      birthdate: ['', Validators.required],
      occupation: ['', Validators.required],
      gross_salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      genre: ['', Validators.required],
      password: [{ value: '', disabled: true }, Validators.required],
      photo: [''],
      role: 'empleado',
    });

    this.patientForm = this.fb.group({
      dni: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      birthdate: ['', Validators.required],
      occupation: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      genre: ['', Validators.required],
      password: [{ value: '', disabled: true }, Validators.required],
      photo: [''],
      role: ['paciente', Validators.required],
    });

    this.doctorForm = this.fb.group({
      dni: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      birthdate: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      genre: ['', Validators.required],
      password: [{ value: '', disabled: true }, Validators.required],
      photo: [''],
      role: ['medico', Validators.required],
      specialty: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
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
        this.role = user.role;
        if (user.role == 'medico') {
          this.doctorId = user.doctors[0].id;

          this.doctorService
            .getDoctorID(Number(this.doctorId))
            .subscribe((res) => {
              console.log(res);
              this.doctorForm.patchValue({
                dni: res.data.dni,
                name: res.data.name,
                surname: res.data.surname,
                email: res.data.email,
                birthdate: res.data.birthdate,
                phone: res.data.phone,
                address: res.data.address,
                specialty: res.data.specialty_id,
                genre: res.data.genre,
              });
              this.isUserLoaded = true;
            });
          this.cargarEspecialidades();
        }
        if (user.role == 'paciente') {
          this.patientId = user.patients[0].id;

          this.patientService
            .getPatientID(Number(this.patientId))
            .subscribe((res) => {
              console.log(res);
              this.patientForm.patchValue({
                dni: res.data.dni,
                name: res.data.name,
                surname: res.data.surname,
                email: res.data.email,
                birthdate: res.data.birthdate,
                occupation: res.data.occupation,
                phone: res.data.phone,
                address: res.data.address,
                genre: res.data.genre,
              });
              this.isUserLoaded = true;
            });
        }

        if (user.role == 'empleado' || user.role == 'administrador') {
          this.employeeId = user.employees[0].id;

          this.employeeService
            .getEmployeeID(Number(this.employeeId))
            .subscribe((res) => {
              console.log(res);
              this.employeeForm.patchValue({
                dni: res.data.dni,
                name: res.data.name,
                surname: res.data.surname,
                email: res.data.email,
                birthdate: res.data.birthdate,
                occupation: res.data.occupation,
                gross_salary: res.data.gross_salary,
                phone: res.data.phone,
                address: res.data.address,
                genre: res.data.genre,
              });
              this.isUserLoaded = true;
            });
        }
      }
    });
  }

  cargarEspecialidades(): void {
    this.specialtyService.getspecialty().subscribe((response) => {
      this.especialidades = response.data;
    });
  }

  getApointmentByDoctorCount(Doctor: number): void {
    this.appoinmentService
      .getappointmentByDoctorCount(Doctor, this.formattedDate)
      .subscribe((response) => {
        this.clientesconcitas = response;
        console.log(response);
        this.isUserLoaded = true;
      });
  }
  getApointmentAllCount(): void {
    this.appoinmentService
      .getappointmentAllCount(this.formattedDate)
      .subscribe((response) => {
        this.clientesconcitas = response;
        console.log(this.clientesconcitas.appointmentday);
        this.isUserLoaded = true;
      });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = event.target.files[0].name;

      if (this.role == 'empleado' || this.role == 'administrador') {
        this.employeeForm.patchValue({
          photo: file,
        });
        this.employeeForm.get('photo')?.updateValueAndValidity();
      }
      if (this.role == 'paciente') {
        this.patientForm.patchValue({
          photo: file,
        });
        this.patientForm.get('photo')?.updateValueAndValidity();
      }
      if (this.role == 'medico') {
        this.doctorForm.patchValue({
          photo: file,
        });
        this.doctorForm.get('photo')?.updateValueAndValidity();
      }
    }
  }

  onSubmit() {
    if (this.role == 'empleado' || this.role == 'administrador') {
      if (this.employeeForm.valid) {
        const formData = new FormData();

        formData.append('dni', this.employeeForm.get('dni')?.value);
        formData.append('name', this.employeeForm.get('name')?.value);
        formData.append('surname', this.employeeForm.get('surname')?.value);
        formData.append('email', this.employeeForm.get('email')?.value);
        formData.append(
          'occupation',
          this.employeeForm.get('occupation')?.value
        );
        formData.append(
          'gross_salary',
          this.employeeForm.get('gross_salary')?.value
        );
        formData.append('phone', this.employeeForm.get('phone')?.value);
        formData.append('address', this.employeeForm.get('address')?.value);
        formData.append('genre', this.employeeForm.get('genre')?.value);
        formData.append('password', this.employeeForm.get('password')?.value);
        formData.append('role', this.employeeForm.get('role')?.value);

        const rawDate = this.employeeForm.get('birthdate')?.value;
        const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd');
        if (!formattedDate) {
          console.error('La fecha está vacía o mal formada');
          return;
        }
        formData.append('birthdate', formattedDate);

        const file = this.employeeForm.get('photo')?.value;
        if (file) {
          formData.append('photo', file);
        }

        console.log('Formulario enviado:', this.employeeForm.value);
        console.log(
          'el valor de nombre:',
          this.employeeForm.get('name')?.value
        );

        console.log('VALORES enviado:', formData);

        this.employeeService
          .updateEmployee(Number(this.employeeId), formData)
          .subscribe((res) => {
            console.log(res);
            if (res.statusCode == '200') {
              console.log('se ha Actualizado correctamente', res);
              this.toastr.success(
                'success!',
                'se ha Actualizado correctamente!'
              );
              this.router.navigate(['/dashboard']);
              this.employeeForm.reset();
              Object.keys(this.employeeForm.controls).forEach((key) => {
                this.employeeForm.controls[key].setErrors(null);
                this.employeeForm.controls[key].markAsPristine();
                this.employeeForm.controls[key].markAsUntouched();
              });
            }
          });
      } else {
        console.log('Formulario no válido');
      }
    }

    if (this.role == 'paciente') {
      if (this.patientForm.valid) {
        const formData = new FormData();

        formData.append('dni', this.patientForm.get('dni')?.value);
        formData.append('name', this.patientForm.get('name')?.value);
        formData.append('surname', this.patientForm.get('surname')?.value);
        formData.append('email', this.patientForm.get('email')?.value);
        formData.append(
          'gross_salary',
          this.patientForm.get('gross_salary')?.value
        );
        formData.append('phone', this.patientForm.get('phone')?.value);
        formData.append('address', this.patientForm.get('address')?.value);
        formData.append('genre', this.patientForm.get('genre')?.value);
        formData.append('password', this.patientForm.get('password')?.value);
        formData.append('role', this.patientForm.get('role')?.value);
        formData.append(
          'occupation',
          this.patientForm.get('occupation')?.value
        );

        const rawDate = this.patientForm.get('birthdate')?.value;
        const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd');
        if (!formattedDate) {
          console.error('La fecha está vacía o mal formada');
          return;
        }
        formData.append('birthdate', formattedDate);

        const file = this.patientForm.get('photo')?.value;
        if (file) {
          formData.append('photo', file);
        }

        console.log('Formulario enviado:', this.patientForm.value);
        console.log('el valor de nombre:', this.patientForm.get('name')?.value);

        this.patientService
          .updatePatient(Number(this.patientId), formData)
          .subscribe((res) => {
            console.log(res);
            if (res.statusCode == '200') {
              console.log('se ha Actualizado correctamente', res);
              this.toastr.success(
                'success!',
                'se ha Actualizado correctamente!'
              );
              this.router.navigate(['/dashboard']);
              this.patientForm.reset();
              Object.keys(this.patientForm.controls).forEach((key) => {
                this.patientForm.controls[key].setErrors(null);
                this.patientForm.controls[key].markAsPristine();
                this.patientForm.controls[key].markAsUntouched();
              });
            }
          });
      } else {
        console.log('Formulario no válido');
        this.toastr.error('error!', 'Formulario no válido!');
      }
    }

    if (this.role == 'medico') {
      if (this.doctorForm.valid) {
        const formData = new FormData();

        formData.append('dni', this.doctorForm.get('dni')?.value);
        formData.append('name', this.doctorForm.get('name')?.value);
        formData.append('surname', this.doctorForm.get('surname')?.value);
        formData.append('email', this.doctorForm.get('email')?.value);
        formData.append('phone', this.doctorForm.get('phone')?.value);
        formData.append('address', this.doctorForm.get('address')?.value);
        formData.append('genre', this.doctorForm.get('genre')?.value);
        formData.append('password', this.doctorForm.get('password')?.value);
        formData.append('role', this.doctorForm.get('role')?.value);
        formData.append('specialty', this.doctorForm.get('specialty')?.value);

        const rawDate = this.doctorForm.get('birthdate')?.value;
        const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd');
        if (!formattedDate) {
          console.error('La fecha está vacía o mal formada');
          return;
        }
        formData.append('birthdate', formattedDate);

        const file = this.doctorForm.get('photo')?.value;
        if (file) {
          formData.append('photo', file);
        }

        this.doctorService
          .updateDoctor(Number(this.doctorId), formData)
          .subscribe((res) => {
            console.log(res);
            if (res.statusCode == '200') {
              console.log('se ha Actualizado correctamente', res);
              this.toastr.success(
                'success!',
                'se ha Actualizado correctamente!'
              );
              this.router.navigate(['/dashboard']);
              this.doctorForm.reset();
              Object.keys(this.doctorForm.controls).forEach((key) => {
                this.doctorForm.controls[key].setErrors(null);
                this.doctorForm.controls[key].markAsPristine();
                this.doctorForm.controls[key].markAsUntouched();
              });
            }
          });
      } else {
        console.log('Formulario no válido');
      }
    }
  }
}
