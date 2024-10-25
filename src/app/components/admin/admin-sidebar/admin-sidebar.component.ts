import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  isExpanded: boolean = true;

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
  constructor(private router: Router,private authService:AuthService) {}

  onLogout(): void {
    Swal.fire({
      title: '¿Seguro que deseas salir?',
      text: "Tu sesión será cerrada",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#052339',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       
        localStorage.removeItem('token');
        this.authService.logout();
        this.router.navigate(['/home']);
        Swal.fire(
          '¡Cerrado!',
          'Has cerrado tu sesión exitosamente.',
          'success'
        );
      }
    });
  }
}
