import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { DoctorService } from '../../../services/doctor.service';
import { SpecialtyService } from '../../../services/specialty.service';
import { AppointmentService } from '../../../services/appointment.service';
import { AvailabilityDoctorService } from '../../../services/availability-doctor.service';
import { PatientService } from '../../../services/patient.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ChangeDetectionStrategy, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-appointmentByDoctorform',
  standalone: true,
  imports: [
    ReactiveFormsModule,
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
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-appointmentbydoctorform.component.html',
  styleUrl: './modal-appointmentbydoctorform.component.css',
  providers: [DatePipe, provideNativeDateAdapter()],
})
export class ModalAppointmentbydoctorformComponent implements OnInit {
  disponilidades: any[] = [];
  selectedDisponibilidad: any = null;

  appoinmentForm: FormGroup;
  doctores: any[] = [];
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
    private fb: FormBuilder
  ) {
    this.appoinmentForm = this.fb.group({
      date_appointments: ['', Validators.required],
      start_hour: ['', Validators.required],
      doctor_id: ['', Validators.required],
      medical_office_id: ['', Validators.required],
      patient_id: ['', Validators.required],
      especialidad: [''],
      selectedDisponibilidad: [''],
      availabily_id: [''],
    });
  }

  ngOnInit(): void {
    this.cargarDoctores();
    this.cargarEspecialidades();
  }

  cargarDoctores(): void {
    this.doctorService.getdoctor().subscribe((response) => {
      this.doctores = response.data;
    });
  }
  cargarEspecialidades(): void {
    this.specialtyService.getspecialty().subscribe((response) => {
      this.especialidades = response.data;
    });
  }

  cargarDisponibilidadMedico(): void {
    const rawDate = this.appoinmentForm.value.date_appointments;
    const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd'); // Formato deseado

    this.availabilityDoctorService
      .getavailabilityID(
        Number(this.appoinmentForm.value.doctor_id),
        formattedDate
      )
      .subscribe((response) => {
        this.disponilidades = response.data;
        this.cdr.detectChanges();
      });

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

  onEnterPatient(): void {
    this.patientService
      .getPatientID(this.appoinmentForm.value.patient_id)
      .subscribe((response) => {
        console.log(response.data);
      });
  }

  onSeleccionarCita(event: any): void {
    this.appoinmentForm.get(`start_hour`)?.patchValue(event.value.start_hour);
    this.appoinmentForm.get(`availabily_id`)?.patchValue(event.value.id);
  }

  onSubmit() {
    const rawDate = this.appoinmentForm.value.date_appointments;
    const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd'); // Formato deseado
    this.appoinmentForm.value.date_appointments = formattedDate;

    if (this.appoinmentForm.valid) {
      console.log('Formulario enviado:', this.appoinmentForm.value);

      this.appoinmentService
        .createappointment(this.appoinmentForm.value)
        .subscribe((res) => {
          console.log('se ha creado correctamente', res);
          this.appoinmentForm.reset();
        });
    } else {
      console.log('Formulario no válido');
    }
  }
}
