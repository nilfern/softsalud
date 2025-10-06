import { Component, Input, OnInit, Inject } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
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
import { EmployeeService } from '../../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { CanActivate, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog'; 
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-employeeform',
  standalone: true,
  imports: [
    CommonModule,
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
    MatIcon,
  ],
  providers: [MatNativeDateModule, DatePipe],
  templateUrl: './modal-employeeform.component.html',
  styleUrl: './modal-employeeform.component.css',
})
export class ModalEmployeeformComponent implements OnInit {
  imageUrl: string | ArrayBuffer | null = null;
  fileName: string = '';
  hide = true;
  findempleado!: String;
  employeeForm: FormGroup;
  id: number;
  accion: string;

  constructor(
    private dialogRef: MatDialogRef<ModalEmployeeformComponent>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; accion: string }
  ) {
    this.id = data.id;
    this.accion = data.accion;

    if (this.accion == 'Agregar') {
      this.employeeForm = this.fb.group({
        dni: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        birthdate: ['', Validators.required],
        occupation: ['', Validators.required],
        gross_salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address: ['', Validators.required],
        genre: ['', Validators.required],
        password: ['', Validators.required],
        photo: [''],
        role: 'empleado',
      });
    } else {
      this.employeeForm = this.fb.group({
        dni: [
          { value: '', disabled: this.data.accion === 'Actualizar' },
          Validators.required,
        ],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: [
          { value: '', disabled: this.data.accion === 'Actualizar' },
          [Validators.required, Validators.email],
        ],
        birthdate: ['', Validators.required],
        occupation: ['', Validators.required],
        gross_salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address: ['', Validators.required],
        genre: ['', Validators.required],
        password: [
          { value: '', disabled: this.data.accion === 'Actualizar' },
          Validators.required,
        ],

        photo: [''],
        role: 'empleado',
      });

      this.employeeService.getEmployeeID(this.id).subscribe((res) => {
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
      });
    }
  }

  ngOnInit(): void {
    this.findempleado = '';
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = event.target.files[0].name;
      this.employeeForm.patchValue({
        photo: file,
      });
      this.employeeForm.get('photo')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = new FormData();
     
      formData.append('dni', this.employeeForm.get('dni')?.value);
      formData.append('name', this.employeeForm.get('name')?.value);
      formData.append('surname', this.employeeForm.get('surname')?.value);
      formData.append('email', this.employeeForm.get('email')?.value);
      formData.append('occupation', this.employeeForm.get('occupation')?.value);
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
      console.log('el valor de nombre:', this.employeeForm.get('name')?.value);

      console.log('VALORES enviado:', formData);
      if (this.data.accion == 'Agregar') {
        this.employeeService.createEmployee(formData).subscribe((res) => {
          console.log(res);
          if (res.statusCode == '200') {
            console.log('se ha creado correctamente', res);
            this.toastr.success('success!', 'se ha creado correctamente!');
            this.employeeForm.reset();
            Object.keys(this.employeeForm.controls).forEach((key) => {
              this.employeeForm.controls[key].setErrors(null);
              this.employeeForm.controls[key].markAsPristine();
              this.employeeForm.controls[key].markAsUntouched();
            });
            this.dialogRef.close('empleado-agregado');
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
      }

      if (this.data.accion == 'Actualizar') {
        this.employeeService
          .updateEmployee(this.data.id, formData)
          .subscribe((res) => {
            console.log(res);
            if (res.statusCode == '200') {
              console.log('se ha Actualizado correctamente', res);
              this.toastr.success(
                'success!',
                'se ha Actualizado correctamente!'
              );
              this.employeeForm.reset();
              Object.keys(this.employeeForm.controls).forEach((key) => {
                this.employeeForm.controls[key].setErrors(null);
                this.employeeForm.controls[key].markAsPristine();
                this.employeeForm.controls[key].markAsUntouched();
              });
              this.dialogRef.close('empleado-agregado');
            }
          });
      }
    } else {
      console.log('Formulario no válido');
      this.toastr.error('error!', 'Formulario no válido!');
    }
  }
}
