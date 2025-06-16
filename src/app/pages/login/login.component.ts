import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm: FormGroup;
  
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router,private fb: FormBuilder) {


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });


  }

  onSubmit() {
  
   this.authService.login({ email: this.loginForm.get('email')?.value, password: this.loginForm.get('password')?.value })
      .subscribe({
        next: (response) => {    
          this.router.navigate(['/dashboard']);  // Navega a otra ruta después del login exitoso
          },
         error: (error) => {
          console.error('Error en el login:', error);
        }
      });
  }

}
