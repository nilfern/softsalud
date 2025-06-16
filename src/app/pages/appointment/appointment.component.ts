import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ModalAppointmentformComponent } from '../../components/appointments/modal-appointmentform/modal-appointmentform.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    MatSidenavModule,
    SidebarComponent,
    LoadingComponent,
    ToolbarComponent,
    MatCardModule,
    ModalAppointmentformComponent,
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export class AppointmentComponent {
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
      this.user = user; // Obtiene los datos del usuario
      this.isUserLoaded = !!user;
    });
  }

  openDialog() {
    this.dialog.open(ModalAppointmentformComponent, {
      width: '1040px', // Ajusta el tamaño de la ventana modal
    });
  }
}
