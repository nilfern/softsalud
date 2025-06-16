import { Component } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DoctorService } from '../../../services/doctor.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort,MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [MatFormFieldModule,MatTableModule, MatPaginatorModule, MatButtonModule, HttpClientModule,MatSort,MatSortModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {

  

  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'seleccionar'];

  dataSource = new MatTableDataSource<any>();
  totalDoctores: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router: Router,private doctorsService: DoctorService,private _liveAnnouncer: LiveAnnouncer) {}
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {   
    this.getDoctors();
  }

  getDoctors(pageIndex: number = 0, pageSize: number = 10): void {
    this.doctorsService.getdoctors(pageIndex + 1).subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data);
      this.totalDoctores = response.total;
    //  this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  pageChange(event: any) {
    this.getDoctors(event.pageIndex, event.pageSize);
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filterValue.trim();
  }

  seleccionarRegistro(doctor: any): void {
    console.log('Registro seleccionado:', doctor);
    this.router.navigate(['/availability_details/', doctor.id]);
   
  }


}
