import { Component, ViewChild } from '@angular/core';
import { EmployeeListComponent } from '../../components/employees/employee-list/employee-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ModalEmployeeformComponent } from '../../components/employees/modal-employeeform/modal-employeeform.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    EmployeeListComponent,
    LoadingComponent,
    MatSidenavModule,
    SidebarComponent,
    ToolbarComponent,
    MatCardModule,   
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
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

  openDialog(employeeId: number, accion: string) {
    const dialogRef = this.dialog.open(ModalEmployeeformComponent, {
      width: '1020px', // Ajusta el tamaño de la ventana modal
      data: {
        id: employeeId,
        accion: accion,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'empleado-agregado') {
        this.employeeList.getEmployees(); // actualiza la tabla
      }
    });
  }

  @ViewChild(EmployeeListComponent) employeeList!: EmployeeListComponent;

  actualizarLista() {
    this.employeeList.getEmployees(); // Llamamos el método para actualizar la lista
  }
}
