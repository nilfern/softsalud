import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from '../../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ModalEmployeeformComponent } from '../modal-employeeform/modal-employeeform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
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
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'accion'];
  dataSource = new MatTableDataSource<any>();
  totalClientes: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private employeesService: EmployeeService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  actualizarRegistro(employeeId: Number, accion: string): void {
    console.log('Registro seleccionado:', employeeId);
    const dialogRef = this.dialog.open(ModalEmployeeformComponent, {
      width: '1020px', // Ajusta el tamaño de la ventana modal
      data: {
        id: employeeId,
        accion: accion,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'empleado-agregado') {
        this.getEmployees(); // actualiza la tabla
      }
    });
  }

  eliminarRegistro(idEmployee: Number): void {
    console.log('Registro seleccionado:', idEmployee);
  }

  getEmployees(pageIndex: number = 0, pageSize: number = 10): void {
    this.employeesService.getEmployees(pageIndex + 1).subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
      this.totalClientes = response.total;
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  pageChange(event: any) {
    this.getEmployees(event.pageIndex, event.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }
}
