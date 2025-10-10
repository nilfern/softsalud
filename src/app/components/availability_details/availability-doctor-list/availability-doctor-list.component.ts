import { Component, NgModule, OnInit, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AvailabilityDoctorService } from '../../../services/availability-doctor.service';

import { ChangeDetectionStrategy, model } from '@angular/core';

@Component({
  selector: 'app-availability-doctor-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './availability-doctor-list.component.html',
  styleUrl: './availability-doctor-list.component.css',
  providers: [DatePipe, provideNativeDateAdapter()],
})
export class AvailabilityDoctorListComponent implements OnInit {
  @Input() doctor!: string | null;
  selected = model<Date | null>(null);

  availabilities: any[] = [];
  formattedDate: string | null = '0000-00-00';

  timeForm!: FormGroup;
  timeSlots = [
    { start: '7:00 a. m.', end: '7:30 a. m.' },
  { start: '7:30 a. m.', end: '8:00 a. m.' },
  { start: '8:00 a. m.', end: '8:30 a. m.' },
  { start: '8:30 a. m.', end: '9:00 a. m.' },
  { start: '9:00 a. m.', end: '9:30 a. m.' },
  { start: '9:30 a. m.', end: '10:00 a. m.' },
  { start: '10:00 a. m.', end: '10:30 a. m.' },
  { start: '10:30 a. m.', end: '11:00 a. m.' },
  { start: '11:00 a. m.', end: '11:30 a. m.' },
  { start: '11:30 a. m.', end: '12:00 p. m.' },
  { start: '12:00 p. m.', end: '12:30 p. m.' },
  { start: '12:30 p. m.', end: '1:00 p. m.' },
  { start: '1:00 p. m.', end: '1:30 p. m.' },
  { start: '1:30 p. m.', end: '2:00 p. m.' },
  { start: '2:00 p. m.', end: '2:30 p. m.' },
  { start: '2:30 p. m.', end: '3:00 p. m.' },
  { start: '3:00 p. m.', end: '3:30 p. m.' },
  { start: '3:30 p. m.', end: '4:00 p. m.' },
  { start: '4:00 p. m.', end: '4:30 p. m.' },
  { start: '4:30 p. m.', end: '5:00 p. m.' },
  { start: '5:00 p. m.', end: '5:30 p. m.' },
  { start: '5:30 p. m.', end: '6:00 p. m.' },
  ];

  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private availabilityDoctorService: AvailabilityDoctorService
  ) {}

  ngOnInit(): void {
    this.timeForm = this.fb.group({
      iddoctor: [this.doctor, Validators.required],
      fecha: ['', Validators.required],
    });
    this.timeSlots.forEach((slot, index) => {
      this.timeForm.addControl(
        `startTime-${index}`,
        this.fb.control(slot.start, Validators.required)
      );
      this.timeForm.addControl(
        `endTime-${index}`,
        this.fb.control(slot.end, Validators.required)
      );
      this.timeForm.addControl(
        `estado-${index}`,
        this.fb.control(0, Validators.required)
      );
      this.timeForm.addControl(
        `idavailability-${index}`,
        this.fb.control(0, Validators.required)
      );
    });
  }

  onCheckboxClicked(event: MouseEvent, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;
    const doctor = this.timeForm.get(`iddoctor`)?.value;
    const start = this.timeForm.get(`startTime-${index}`)?.value;
    const end = this.timeForm.get(`endTime-${index}`)?.value;
    const idavailability = this.timeForm.get(`idavailability-${index}`)?.value;

    if (checked) {
      const rawDate = this.timeForm.get('fecha')?.value;
      const formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd');

      if (!formattedDate) {
        console.error('La fecha está vacía o mal formada');
        return;
      }
      const formData = new FormData();
      formData.append('date_availabilities', formattedDate);
      formData.append('doctor_id', doctor);
      formData.append('start_hour', start);
      formData.append('end_hour', end);
      formData.append('status', checked ? '1' : '0');
      this.availabilityDoctorService
        .createavailability(formData)
        .subscribe((res) => {
          console.log('se ha creado correctamente', res);
          this.timeForm.get(`idavailability-${index}`)?.patchValue(res.id);
        });
    } else {
      console.log('my id:', idavailability);
      this.availabilityDoctorService
        .deleteavailability(idavailability)
        .subscribe((res) => {
          console.log('se ha eliminado correctamente', res);
          this.timeForm.get(`idavailability-${index}`)?.patchValue(0);
        });
    }
  }

  getAvailabilities(): void {
    this.timeSlots.forEach((slot, index) => {
      this.timeForm.get(`estado-${index}`)?.patchValue(0);
    });

    this.availabilityDoctorService
      .getavailabilityDoctor(Number(this.doctor), this.formattedDate)
      .subscribe((response) => {
        this.availabilities = response.data;
        console.log(this.availabilities);

        if (response.statusCode === 200) {
          this.timeSlots.forEach((slot, index) => {
            this.availabilities.forEach((availabiLy, pos) => {
              console.log(
                slot.start + '==' + this.availabilities[pos].start_hour
              );
              if (slot.start === this.availabilities[pos].start_hour) {
                console.log('bien');
                this.timeForm
                  .get(`estado-${index}`)
                  ?.patchValue(this.availabilities[pos].status);
                this.timeForm
                  .get(`idavailability-${index}`)
                  ?.patchValue(this.availabilities[pos].id);
              }
            });
          });
        }
      });
  }

  onDateChange(date: Date): void {
    const rawDate = date;
    this.formattedDate = this.datePipe.transform(rawDate, 'yyyy-MM-dd');
    this.timeForm.get(`fecha`)?.patchValue(this.formattedDate);
    this.getAvailabilities();
  }

  onSubmit(): void {}
}
