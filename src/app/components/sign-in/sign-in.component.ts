import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interface/user';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule, MatDialogModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user: User = {
    username: '',
    email: '',
    password: '',
    role: 'usuario', // Cambié 'user' a 'usuario' según tu tabla
    nombre: '', // Nuevo campo
    apellidos: '', // Nuevo campo
    tipo_documento: 'DNI', // Nuevo campo por defecto (ajusta según tus necesidades)
    numero_documento: '' // Nuevo campo
  };

  constructor(private router: Router) {}

  onRegister(): void {
    console.log('Registrando usuario:', this.user);
    
    // Aquí iría la lógica para enviar los datos de registro al backend

    setTimeout(() => {
      // Simulación de registro exitoso
      alert('Registro exitoso');
      this.router.navigate(['/home']);
    }, 1000); // Simulación de espera para el registro
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
