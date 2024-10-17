import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interface/user';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { userSchema, UserSchemaType } from '../auth/schema/user.schema';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule, MatDialogModule,HttpClientModule,CommonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user: User =  {
    id: '',
    name: '',
    lastName: '',
    documentType: '',
    numDoc: '',
    email: '',
    username: '',
    password: '',
    role: 'USER'
  };
  labelFocused: boolean = false;
  errors: Partial<Record<keyof UserSchemaType, string>> = {};
  constructor(private authService: AuthService,private router: Router) {}

  validateField(field: keyof UserSchemaType) {
    const result = userSchema.shape[field].safeParse(this.user[field]);
    if (!result.success) {
      this.errors[field] = result.error.errors[0].message;
    } else {
      delete this.errors[field];
    }
  }

  /*const result = userSchema.safeParse(this.user);
    if (!result.success) {
      result.error.errors.forEach((error: { path: (string | number | symbol)[]; message: string | undefined; }) => {
        this.errors[error.path[0] as keyof UserSchemaType] = error.message;
      });
     // Alerta para errores de validación
     Swal.fire({
      title: 'Error en el registro',
      text: 'Revisa los campos ingresados.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  } else {
      this.authService.signup(result.data).subscribe(
        response => {
          console.log('Registro exitoso', response);
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Usuario registrado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/login']); // Redirigir después del éxito
          });
        },
        error => {
          console.error('Error en el registro', error);
          
          // Alerta para error de registro
          Swal.fire({
            title: 'Error en el registro',
            text: 'Ocurrió un error al registrar el usuario.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }*/
    onRegister() {
      const result = userSchema.safeParse(this.user);
      if (!result.success) {
        result.error.errors.forEach((error: { path: (string | number | symbol)[]; message: string | undefined; }) => {
          this.errors[error.path[0] as keyof UserSchemaType] = error.message;
        });
        Swal.fire({
          title: 'Error en el registro',
          text: 'Revisa los campos ingresados.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      } else {
        this.authService.signup(result.data).subscribe(
          response => {
            console.log('Registro exitoso', response);
            
            const loginData = {
              username: this.user.username,
              password: this.user.password
            };
    
            this.authService.login(loginData).subscribe(
              loginResponse => {
                console.log('Sesión iniciada automáticamente', loginResponse);
                Swal.fire({
                  title: '¡Registro exitoso!',
                  text: 'Sesión iniciada correctamente.',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                }).then(() => {
                  this.router.navigate(['/home']);
                });
              },
              loginError => {
                console.error('Error al iniciar sesión automáticamente', loginError);
                Swal.fire({
                  title: 'Error al iniciar sesión',
                  text: 'Ocurrió un problema al iniciar sesión automáticamente. Por favor, inicia sesión manualmente.',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            );
          },
          error => {
            console.error('Error en el registro', error);
            Swal.fire({
              title: 'Error en el registro',
              text: 'Ocurrió un error al registrar el usuario.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    }    
    goToLogin() {
      this.router.navigate(['/login']);
    }
}