import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-mycalendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mycalendar.component.html',
  styleUrl: './mycalendar.component.css',
})
export class MycalendarComponent {
  clientesconcitas: any[] = [];
  @Input() doctor!: string | null;

  currentDate = new Date();
  weeks: Date[][] = [];

  datesInWeek = [];
  daysWeek = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Setiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  hours = [];

  constructor(
    private appoinmentService: AppointmentService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.generateCalendar(this.currentDate);
    console.log(this.currentDate);
  }

  generateCalendar(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const calendar: Date[][] = [];
    let week: Date[] = [];

    let day = new Date(firstDay);
    day.setDate(day.getDate() - day.getDay());

    while (day <= lastDay) {
      for (let i = 0; i < 7; i++) {
        week.push(new Date(day));
        day.setDate(day.getDate() + 1);
      }
      calendar.push(week);
      week = [];
    }

    this.weeks = calendar;
  }

  isSameMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth();
  }

  getDateFormat(date: Date): string {
    const dayInWeek = this.daysWeek[date.getDay()];
    const numberDate = date.getDate();
    const monthName = this.months[date.getMonth()];
    return `${dayInWeek} ${numberDate} ${monthName}`;
  }

  onDayClick(day: Date): void {
    console.log('Día seleccionado:', day);
    this.getappointmentByDoctoR(day);
  }

  getappointmentByDoctoR(day: Date): void {
    const formattedDate = this.datePipe.transform(day, 'yyyy-MM-dd');
    this.appoinmentService
      .getappointmentByDoctor(Number(this.doctor), formattedDate)
      .subscribe((response) => {
        this.clientesconcitas = response.data;
      });
  }
}
