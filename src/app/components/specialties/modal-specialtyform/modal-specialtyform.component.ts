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

import { SpecialtyService } from '../../../services/specialty.service';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

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

  constructor(
    private fb: FormBuilder,
    private specialtyService: SpecialtyService
  ) {
    this.specialtyForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.specialtyForm.valid) {
      console.log('Formulario enviado:', this.specialtyForm.value);

      this.specialtyService
        .createSpecialty(this.specialtyForm.value)
        .subscribe((res) => {
          console.log('se ha creado correctamente', res);
          this.specialtyForm.reset();
        });
    } else {
      console.log('Formulario no válido');
    }
  }
}
