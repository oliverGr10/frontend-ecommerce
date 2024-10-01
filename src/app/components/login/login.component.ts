import { Component } from '@angular/core';
import { Router,} from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatCheckboxModule,MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hidePassword: boolean = true;

  constructor(private router: Router, private dialogRef: MatDialogRef<LoginComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onLogin(): void {
    // Implementar lógica de inicio de sesión
    console.log('Iniciando sesión con:', this.email, this.password);
      // Aquí puedes agregar la lógica de autenticación
    // Si la autenticación es exitosa, puedes cerrar el diálogo y navegar
     this.dialogRef.close();
    this.router.navigate(['/dashboard-user']);
  }

  showRegister(): void {
    // Implementar lógica para mostrar el formulario de registro
    console.log('Navegando a la página de registro...');
    this.dialogRef.close();
    
    this.router.navigate(['/signIn'])
    .then(() => console.log('Navegación a registro exitosa'))
    .catch(err => console.error('Error al navegar a registro:', err)); // Captura errores en la navegación
  }
}
