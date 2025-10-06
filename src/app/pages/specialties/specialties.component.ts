import { Component, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ModalSpecialtyformComponent } from '../../components/specialties/modal-specialtyform/modal-specialtyform.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SpecialtyListComponent } from '../../components/specialties/specialty-list/specialty-list.component';

@Component({
  selector: 'app-specialties',
  standalone: true,
  imports: [
    SpecialtyListComponent,
    MatSidenavModule,
    SidebarComponent,
    LoadingComponent,
    ToolbarComponent,
    MatCardModule,
  ],
  templateUrl: './specialties.component.html',
  styleUrl: './specialties.component.css',
})
export class SpecialtiesComponent {
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

/*  openDialog() {
    this.dialog.open(ModalSpecialtyformComponent, {
      width: '600px', // Ajusta el tamaño de la ventana modal
    });
  }*/

      openDialog(specialtyId: number, accion: string) {
    const dialogRef = this.dialog.open(ModalSpecialtyformComponent, {
      width: '1020px',
      data: {
        id: specialtyId,
        accion: accion,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'especialidad-agregada') {
        this.specialtyList.getSpecialties();
        console.log('enttro');
      }
    });
  }

  @ViewChild(SpecialtyListComponent) specialtyList!: SpecialtyListComponent;

  actualizarLista() {
    this.specialtyList.getSpecialties();
  }

}
