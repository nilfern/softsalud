import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'softsalud';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loadUser(); // Cargar los datos del usuario al iniciar la aplicación
  }

 

}
