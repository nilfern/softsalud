import { Component } from '@angular/core';
import { ModalPatientformregisterComponent } from '../../components/patients/modal-patientformregister/modal-patientformregister.component';

import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ModalPatientformregisterComponent,MatCardModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
