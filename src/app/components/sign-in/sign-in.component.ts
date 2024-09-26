import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive,Router } from '@angular/router';
import { User } from '../../interface/user';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  user: User = {
    username: '',
    email: '',
    password: '',
    role: 'user'
  };

  constructor(private router: Router) {}

  onRegister(): void {
    // Aquí iría la lógica para enviar los datos de registro al backend
    console.log('Registrando usuario:', this.user);

    // Simulación de registro exitoso
    setTimeout(() => {
      if (true) { // Reemplaza con una condición real
        alert('Registro exitoso');
        this.router.navigate(['/home']);
      } else {
        alert('Error en el registro');
      }
    }, 1000); // Simulación de espera para el registro
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

}
