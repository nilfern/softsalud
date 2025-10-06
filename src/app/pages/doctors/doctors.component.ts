import { Component, ViewChild } from '@angular/core';
import { ModalDoctorformComponent } from '../../components/doctors/modal-doctorform/modal-doctorform.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { DoctorListComponent } from '../../components/doctors/doctor-list/doctor-list.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    DoctorListComponent,
    MatSidenavModule,
    SidebarComponent,
    LoadingComponent,
    ToolbarComponent,
    MatCardModule,
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent {
  sidenavMode: 'over' | 'side' = 'side';
  isScreenLarge = true;
  user: any;
  isUserLoaded = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        if (result.matches) {
          this.sidenavMode = 'over';
          this.isScreenLarge = false;
        } else {
          this.sidenavMode = 'side';
          this.isScreenLarge = true;
        }
      });

    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.isUserLoaded = !!user;
    });
  }

  openDialog(doctorId: number, accion: string) {
    const dialogRef = this.dialog.open(ModalDoctorformComponent, {
      width: '1020px',
      data: {
        id: doctorId,
        accion: accion,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'medico-agregado') {
        this.doctorList.getDoctors();
      }
    });
  }

  @ViewChild(DoctorListComponent) doctorList!: DoctorListComponent;

  actualizarLista() {
    this.doctorList.getDoctors();
  }
}
