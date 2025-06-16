
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';



@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatMenuModule,MatToolbarModule,LoadingComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  user: any;
  myuser: any;
  @Input() sidenav!: MatSidenav;
  isUserLoaded = false;

 constructor(private authService: AuthService, private router: Router){
 }

  ngOnInit(): void {   
    this.authService.user$.subscribe((user) => {    

      if (user) {
        this.user = user;       
       
        if(user.role=="medico"){
       
         this.myuser = user.doctors[0];      
         this.isUserLoaded = true;     
        }else{
        
          if(user.role=="empleado"){          
           this.myuser = user.employees[0];      
           this.isUserLoaded = true;   
          }else{
                if(user.role=="administrador"){
                  this.myuser = user.employees[0];      
                  this.isUserLoaded = true;              
                }
          }

        }
   
      }

    });
  }


  salir() {
    this.authService.logout()
      .subscribe({
        next: (response) => {        
          localStorage.removeItem('token');
          this.router.navigate(['/login']);  
        },
        error: (error) => {
          console.error('Error en el logout:', error);
        }
      });
  }


}
