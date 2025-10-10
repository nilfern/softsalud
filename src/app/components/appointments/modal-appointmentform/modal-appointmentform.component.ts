import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, viewChild } from '@angular/core';
import { Component, OnInit, Input  } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder, Validators,} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { DoctorService } from '../../../services/doctor.service';
import { SpecialtyService } from '../../../services/specialty.service';
import { AppointmentService } from '../../../services/appointment.service';
import { AvailabilityDoctorService } from '../../../services/availability-doctor.service';
import { PatientService } from '../../../services/patient.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ChangeDetectionStrategy, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-appointmentform',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    CommonModule,
    MatButtonToggleModule,
    RouterModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-appointmentform.component.html',
  styleUrl: './modal-appointmentform.component.css',
  providers: [DatePipe, provideNativeDateAdapter()],
})
export class ModalAppointmentformComponent implements OnInit {
  //@Input() role!: string | null;
  @Input() user!: any;
  accordion = viewChild.required(MatAccordion);

  disponilidades: any[] = [];
  selectedDisponibilidad: any = null;

  appoinmentForm: FormGroup;
  doctores: any[] = [];
  listadoctores: any[] = [];
  especialidades: any[] = [];
  consultorios: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private appoinmentService: AppointmentService,
    private patientService: PatientService,
    private availabilityDoctorService: AvailabilityDoctorService,
    private doctorService: DoctorService,
    private specialtyService: SpecialtyService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.appoinmentForm = this.fb.group({
      date_appointments: ['', Validators.required],
      start_hour: ['', Validators.required],
      doctor_id: ['', Validators.required],
      patient_id: ['', Validators.required],
      especialidad: [''],
      selectedDisponibilidad: [''],
      availabily_id: [''],
      dni: [''],
      name: [''],
      surname: [''],
    });
  }

  ngOnInit(): void {
    this.cargarDoctores();
    this.cargarEspecialidades();
   
    if(this.user.role=="paciente"){ 
        this.appoinmentForm.get(`patient_id`)?.patchValue(this.user.patients[0].id);     
      }
  }

  cargarDoctores(): void {
    this.doctorService.getdoctor().subscribe((response) => {
      this.listadoctores = response.data;
    });
  }
  cargarEspecialidades(): void {
    this.specialtyService.getspecialty().subscribe((response) => {
      this.especialidades = response.data;
    });
  }

  cargarDisponibilidadMedico(): void {
    const rawDate = this.appoinmentForm.value.date_appointments;
    const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd'); 

    this.availabilityDoctorService
      .getavailabilityDoctorShow(
        Number(this.appoinmentForm.value.especialidad),
        formattedDate
      )
      .subscribe((response) => {
        this.doctores = response.data;
        console.log(this.doctores);
        this.cdr.detectChanges();
      });
  }

  onEnterPatient(event: Event): void {
    event.preventDefault();
    this.patientService
      .getPatientDNI(this.appoinmentForm.value.dni)
      .subscribe((response) => {
        console.log(response.data);
        this.appoinmentForm.get(`patient_id`)?.patchValue(response.data.id);
        this.appoinmentForm.get(`name`)?.patchValue(response.data.name);
        this.appoinmentForm.get(`surname`)?.patchValue(response.data.surname);
      });
  }

  onEspecialidadSeleccionada(event: any): void {
    console.log('seleccionado:', event.value);
  }
  onMedicoSeleccionado(event: any): void {
    console.log('seleccionado:', event.value);
    this.disponilidades=event.value;
  }

  onSeleccionarCita(event: any): void {
    this.appoinmentForm.get(`start_hour`)?.patchValue(event.value.start_hour);
    this.appoinmentForm.get(`availabily_id`)?.patchValue(event.value.id);
    this.appoinmentForm.get(`doctor_id`)?.patchValue(event.value.doctor_id);
  }

  onSubmit() {
    const rawDate = this.appoinmentForm.value.date_appointments;
    const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd'); 
    this.appoinmentForm.value.date_appointments = formattedDate;

    if (this.appoinmentForm.valid) {
      console.log('Formulario enviado:', this.appoinmentForm.value);

      this.appoinmentService
        .createappointment(this.appoinmentForm.value)
        .subscribe((res) => {
          console.log('se ha creado correctamente', res);
          this.toastr.success('success!', 'se ha creado correctamente!');
          this.appoinmentForm.reset();
          Object.keys(this.appoinmentForm.controls).forEach((key) => {
            this.appoinmentForm.controls[key].setErrors(null);
            this.appoinmentForm.controls[key].markAsPristine();
            this.appoinmentForm.controls[key].markAsUntouched();
          });

          this.doctores = [];
          this.cdr.detectChanges(); // Fuerza la actualización de la vista         
        });
    } else {
      console.log('Formulario no válido');
    }
  }


 onFechaSeleccionada(event: any) {
  const fecha = event.value; 
  
  //const rawDate = this.appoinmentForm.value.date_appointments;
    const formattedDate = this.datePipe.transform(fecha, 'yyyy-MM-dd'); // Formato deseado
  console.log("Fecha seleccionada:", formattedDate);
  console.log(this.user.doctors[0].id);

this.availabilityDoctorService
      .getavailabilityID(
        Number(this.user.doctors[0].id),
        formattedDate
      )
      .subscribe((response) => {
        this.disponilidades = response.data;
        console.log( this.disponilidades);
        this.cdr.detectChanges();
      });

 
 }
}

