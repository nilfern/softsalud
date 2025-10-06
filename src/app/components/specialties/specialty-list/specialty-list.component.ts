import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ModalSpecialtyformComponent } from '../modal-specialtyform/modal-specialtyform.component';
import { SpecialtyService } from '../../../services/specialty.service';

@Component({
  selector: 'app-specialty-list',
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
  templateUrl: './specialty-list.component.html',
  styleUrl: './specialty-list.component.css',
})
export class SpecialtyListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'accion'];
  dataSource = new MatTableDataSource<any>();
  totalClientes: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private specialtiesService: SpecialtyService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getSpecialties();
  }

  actualizarRegistro(idSpecialty: Number, accion: string): void {
    console.log('Registro seleccionado:', idSpecialty);
    const dialogRef = this.dialog.open(ModalSpecialtyformComponent, {
      width: '1020px', // Ajusta el tamaño de la ventana modal
      data: {
        id: idSpecialty,
        accion: accion,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'especialidad-agregada') {
        this.getSpecialties(); // actualiza la tabla
      }
    });
  }

  eliminarRegistro(idSpecialty: Number): void {
    console.log('Registro seleccionado:', idSpecialty);
    this.specialtiesService
      .deleteSpecialties(Number(idSpecialty))
      .subscribe((response) => {
        this.getSpecialties();
      });
  }

  getSpecialties(pageIndex: number = 0, pageSize: number = 10): void {
    this.specialtiesService
      .getspecialties(pageIndex + 1)
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response.data);
        this.totalClientes = response.total;
        this.dataSource.sort = this.sort;
      });
  }

  pageChange(event: any) {
    this.getSpecialties(event.pageIndex, event.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }
}
