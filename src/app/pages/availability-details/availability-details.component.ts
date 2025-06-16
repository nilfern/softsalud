import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { AvailabilityDoctorListComponent } from '../../components/availability_details/availability-doctor-list/availability-doctor-list.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-availability-details',
  standalone: true,
  imports: [MatSidenavModule, SidebarComponent, LoadingComponent, ToolbarComponent, MatCardModule, AvailabilityDoctorListComponent],
  templateUrl: './availability-details.component.html',
  styleUrl: './availability-details.component.css'
})
export class AvailabilityDetailsComponent implements OnInit {
  sidenavMode: 'over' | 'side' = 'side';
  isScreenLarge = true;

  user: any;
  isUserLoaded = false;
  doctorId: string | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService, private breakpointObserver: BreakpointObserver) { }


  ngOnInit(): void {
    // Captura el ID del doctor desde la URL
    this.doctorId = this.route.snapshot.paramMap.get('id');
    console.log('ID del doctor seleccionado:', this.doctorId);

    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
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

}
