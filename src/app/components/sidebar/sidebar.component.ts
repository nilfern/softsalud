import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule,MatIconModule,MatCardModule,MatListModule,MatExpansionModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  constructor(private authService: AuthService, private router: Router){

  }

  salir() {
    this.authService.logout()
      .subscribe({
        next: (response) => {      
          localStorage.removeItem('token');
          this.router.navigate(['/login']);  // Navegar a otra ruta después del login exitoso
        },
        error: (error) => {
          console.error('Error en el logout:', error);
        }
      });
  }


}
