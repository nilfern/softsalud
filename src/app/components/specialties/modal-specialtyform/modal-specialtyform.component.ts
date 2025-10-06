import { Component, OnInit, Inject } from '@angular/core';
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

import { SpecialtyService } from '../../../services/specialty.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-specialtyform',
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
  ],
  templateUrl: './modal-specialtyform.component.html',
  styleUrl: './modal-specialtyform.component.css',
})
export class ModalSpecialtyformComponent {
  specialtyForm: FormGroup;
  id: number;
  accion: string;

  constructor(
    private dialogRef: MatDialogRef<ModalSpecialtyformComponent>,
    private fb: FormBuilder,
    private specialtyService: SpecialtyService,
    private toastr: ToastrService,
  @Inject(MAT_DIALOG_DATA) public data: { id: number; accion: string }
  ) {

     this.id = data.id;
    this.accion = data.accion;
    this.specialtyForm = this.fb.group({
      name: ['', Validators.required],
    });

    if (this.accion == 'Actualizar') {
     this.specialtyService.getSpecialtyID(this.id).subscribe((res) => {
        console.log(res);
        this.specialtyForm.patchValue({         
          name: res.data.name         
        });
      });
   }






  }

  onSubmit() {
    if (this.specialtyForm.valid) {
      console.log('Formulario enviado:', this.specialtyForm.value);

        if (this.data.accion == 'Agregar') {
      this.specialtyService
        .createSpecialty(this.specialtyForm.value)
        .subscribe((res) => {
          console.log('se ha creado correctamente', res);
           this.toastr.success('success!', 'se ha creado correctamente!');
          this.specialtyForm.reset();
            this.dialogRef.close('especialidad-agregada');
        });
      }
     if (this.data.accion == 'Actualizar') {
       this.specialtyService
          .updateSpecialty(this.data.id, this.specialtyForm.value)
          .subscribe((res) => {
            console.log(res);
            if (res.statusCode == '200') {
              console.log('se ha Actualizado correctamente', res);
              this.toastr.success(
                'success!',
                'se ha Actualizado correctamente!'
              );
              this.specialtyForm.reset();
             
              this.dialogRef.close('especialidad-agregada');
            }
          });
    }
   
   
      } else {
      console.log('Formulario no válido');
    }
  }
}
