import { Component } from '@angular/core';
import { DoctorListavailabilityComponent } from '../../components/doctors/doctor-listavailability/doctor-listavailability.component';

import { ModalDoctorformComponent } from '../../components/doctors/modal-doctorform/modal-doctorform.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [
    DoctorListavailabilityComponent,
    LoadingComponent,
    MatSidenavModule,
    SidebarComponent,
    ToolbarComponent,
    MatCardModule,
  ],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.css',
})
export class AvailabilityComponent {
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

  openDialog() {
    this.dialog.open(ModalDoctorformComponent, {
      width: '600px',
    });
  }
}
