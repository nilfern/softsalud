import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PatientService } from '../../../services/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ModalPatientformComponent } from '../modal-patientform/modal-patientform.component';

ModalPatientformComponent;
@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    HttpClientModule,
    MatSort,
    MatSortModule,
  ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css',
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = ['dni','nombre', 'apellido','Telefono','accion'];
  dataSource = new MatTableDataSource<any>();
  totalClientes: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private patientsService: PatientService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getPatients();
  }

  actualizarRegistro(patientId: Number, accion: string): void {
    console.log('Registro seleccionado:', patientId);
    const dialogRef = this.dialog.open(ModalPatientformComponent, {
      width: '1020px',
      data: {
        id: patientId,
        accion: accion,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'paciente-agregado') {
        this.getPatients();
      }
    });
  }

  eliminarRegistro(idPatient: Number): void {
    console.log('Registro seleccionado:', idPatient);
    this.patientsService
      .deletePatients(Number(idPatient))
      .subscribe((response) => {
        this.getPatients();
      });
  }

  getPatients(pageIndex: number = 0, pageSize: number = 10): void {
    this.patientsService.getPatients(pageIndex + 1).subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
      this.totalClientes = response.total;
      this.dataSource.sort = this.sort;
    });
  }

  pageChange(event: any) {
    this.getPatients(event.pageIndex, event.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }
}
