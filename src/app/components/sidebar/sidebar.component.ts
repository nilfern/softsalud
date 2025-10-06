import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  user: any;
  myuser: any;
  isUserLoaded = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;

        if (user.role == 'medico') {
          this.myuser = user.doctors[0];
          this.isUserLoaded = true;
        } else {
          if (user.role == 'empleado') {
            this.myuser = user.employees[0];
            this.isUserLoaded = true;
          } else {
            if (user.role == 'administrador') {
              this.myuser = user.employees[0];
              this.isUserLoaded = true;
            } else {
              if (user.role == 'paciente') {
                this.myuser = user.patients[0];
                this.isUserLoaded = true;
              }
            }
          }
        }
      }
    });
  }

  salir() {
    this.authService.logout().subscribe({
      next: (response) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el logout:', error);
      },
    });
  }
}
