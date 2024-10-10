import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router,} from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon'; 
import { AuthService } from '../auth/auth.service';
import { loginSchema, LoginSchema } from '../auth/schema/login.schema';
import { z } from 'zod';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatCheckboxModule,MatIconModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true;
  errors: { [key: string]: string } = {};

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService
  ) {}
  onLogin(): void {
    this.errors = {};
    const loginData: LoginSchema = {
      username: this.username,
      password: this.password
    };
  
    try {
      // Validar los datos usando Zod
      loginSchema.parse(loginData);
  
      // Intentar iniciar sesión con los datos validados
      this.authService.login(loginData).subscribe(
        response => {
          console.log('Inicio de sesión exitoso:', response);
          if (response.role) {
            // Mostrar mensaje de éxito 
            Swal.fire({
              title: '¡Inicio de sesión exitoso!',
              text: `Bienvenido, ${this.username}`,
              icon: 'success',
              showConfirmButton: false,  
              timer: 2500,               
              timerProgressBar: true,     
              willClose: () => {
                // Redirigir después de que la alerta se cierre automáticamente
                if (this.authService.isAdmin()) {
                  this.router.navigate(['/admin']);
                } else {
                  this.router.navigate(['/home']);
                }
                this.dialogRef.close(true);
              }
            });
          }  else {
            // Mostrar mensaje de error si el rol no está definido
            Swal.fire({
              title: 'Error',
              text: 'El rol del usuario no está definido en la respuesta.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        },
        error => {
          console.error('Error al iniciar sesión:', error);
  
          // Cerrar el spinner de carga y mostrar mensaje de error
          Swal.close();
  
          Swal.fire({
            title: 'Error',
            text: 'Error en el login. Revisa tus credenciales.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Capturar errores de validación y mostrarlos
        error.errors.forEach((err) => {
          if (typeof err.path[0] === 'string') {
            this.errors[err.path[0]] = err.message;
          }
        });
  
        // Mostrar alerta de error de validación
        Swal.fire({
          title: 'Error de validación',
          text: 'Revisa los campos ingresados.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }

  showRegister(): void {
    this.dialogRef.close();
    this.router.navigate(['/signIn']);
  }
}