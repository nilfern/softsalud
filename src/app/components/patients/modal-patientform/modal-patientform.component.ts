import { CommonModule, DatePipe } from '@angular/common';
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
import { PatientService } from '../../../services/patient.service';
import { MatGridListModule } from '@angular/material/grid-list';

import { ToastrService } from 'ngx-toastr';
import { CanActivate, Router } from '@angular/router';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-patientform',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatGridListModule,
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
  ],
  providers: [MatNativeDateModule, DatePipe],
  templateUrl: './modal-patientform.component.html',
  styleUrl: './modal-patientform.component.css',
})
export class ModalPatientformComponent implements OnInit {
  fileName: string = '';
  findpatient!: String;

  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private patientService: PatientService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      occupation: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      genre: ['', Validators.required],
      password: ['', Validators.required],
      photo: [''],
      role: ['paciente', Validators.required],
    });
  }

  ngOnInit(): void {
    this.findpatient = '';
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = event.target.files[0].name;
      this.patientForm.patchValue({
        photo: file,
      });
      this.patientForm.get('photo')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.patientForm.valid) {
      const formData = new FormData();

      // Añades todos los campos uno por uno
      formData.append('dni', this.patientForm.get('dni')?.value);
      formData.append('name', this.patientForm.get('name')?.value);
      formData.append('surname', this.patientForm.get('surname')?.value);
      formData.append('email', this.patientForm.get('email')?.value);
      formData.append('gross_salary',this.patientForm.get('gross_salary')?.value);
      formData.append('phone', this.patientForm.get('phone')?.value);
      formData.append('address', this.patientForm.get('address')?.value);
      formData.append('genre', this.patientForm.get('genre')?.value);
      formData.append('password', this.patientForm.get('password')?.value);
      formData.append('role', this.patientForm.get('role')?.value);
      formData.append('occupation', this.patientForm.get('occupation')?.value);

      const rawDate = this.patientForm.get('birthdate')?.value;
      const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd'); // Formato deseado
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

      this.patientService.createPatient(formData).subscribe((res) => {
        if (res.statusCode == '200') {
          console.log('se ha creado correctamente', res);
          this.toastr.success('success!', 'se ha creado correctamente!');
          this.patientForm.reset();
          Object.keys(this.patientForm.controls).forEach((key) => {
            this.patientForm.controls[key].setErrors(null);
            this.patientForm.controls[key].markAsPristine();
            this.patientForm.controls[key].markAsUntouched();
          });
        }

        if (res.statusCode == '1062') {
          console.log('El email ya existe!', res);
          this.toastr.error('error!', 'El email ya existe!');
        }

        if (res.statusCode == '1063') {
          console.log('El dni ya existe!', res);
          this.toastr.error('error!', 'El dni ya existe!');
        }
      });
    } else {
      console.log('Formulario no válido');
      this.toastr.error('error!', 'Formulario no válido!');
    }
  }
}
