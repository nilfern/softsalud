import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog'; // Asegúrate de importar esto

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-doctorform',
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
  ],
  providers: [MatNativeDateModule, DatePipe],
  templateUrl: './modal-doctorform.component.html',
  styleUrl: './modal-doctorform.component.css',
})
export class ModalDoctorformComponent implements OnInit {
  @Output() doctorAdded = new EventEmitter<void>(); // Emisor de evento

  especialidades: any[] = [];
  finddoctor!: String;
  fileName: string = '';
  doctorForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModalDoctorformComponent>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private specialtyService: SpecialtyService,
    private toastr: ToastrService,
    private doctorService: DoctorService
  ) {
    this.doctorForm = this.fb.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      genre: ['', Validators.required],
      password: ['', Validators.required],
      photo: [''],
      role: ['medico', Validators.required],
      specialty: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.finddoctor = '';
    this.cargarEspecialidades();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = event.target.files[0].name;
      this.doctorForm.patchValue({
        photo: file,
      });
      this.doctorForm.get('photo')?.updateValueAndValidity();
    }
  }

  cargarEspecialidades(): void {
    this.specialtyService.getspecialty().subscribe((response) => {
      this.especialidades = response.data;
    });
  }

  onSubmit() {
    console.log('Formulario enviado:', this.doctorForm.value);
    if (this.doctorForm.valid) {
      const formData = new FormData();

      // Añades todos los campos uno por uno
      formData.append('dni', this.doctorForm.get('dni')?.value);
      formData.append('name', this.doctorForm.get('name')?.value);
      formData.append('surname', this.doctorForm.get('surname')?.value);
      formData.append('email', this.doctorForm.get('email')?.value);
      formData.append(
        'gross_salary',
        this.doctorForm.get('gross_salary')?.value
      );
      formData.append('phone', this.doctorForm.get('phone')?.value);
      formData.append('address', this.doctorForm.get('address')?.value);
      formData.append('genre', this.doctorForm.get('genre')?.value);
      formData.append('password', this.doctorForm.get('password')?.value);
      formData.append('role', this.doctorForm.get('role')?.value);
      formData.append('specialty', this.doctorForm.get('specialty')?.value);

      const rawDate = this.doctorForm.get('birthdate')?.value;
      const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd'); // Formato deseado
      if (!formattedDate) {
        console.error('La fecha está vacía o mal formada');
        return;
      }
      formData.append('birthdate', formattedDate);

      const file = this.doctorForm.get('photo')?.value;
      if (file) {
        formData.append('photo', file);
      }

      this.doctorService.createDoctor(formData).subscribe((res) => {
        console.log(res);

        if (res.statusCode == '200') {
          console.log('se ha creado correctamente', res);
          this.toastr.success('success!', 'se ha creado correctamente!');
          this.doctorForm.reset();
          Object.keys(this.doctorForm.controls).forEach((key) => {
            this.doctorForm.controls[key].setErrors(null);
            this.doctorForm.controls[key].markAsPristine();
            this.doctorForm.controls[key].markAsUntouched();
          });

          this.dialogRef.close('medico-agregado');
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
    }
  }
}
