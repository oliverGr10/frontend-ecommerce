import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../components/admin/admin-header/admin-header.component';
import { InactivityService } from '../../components/auth/InactivityService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    AdminHeaderComponent,
    RouterModule
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'] 
})
export  class AdminLayoutComponent implements OnInit {
  constructor(private inactivityService: InactivityService,private router:Router) {}

  ngOnInit() {
    this.inactivityService.inactivityDetected.subscribe(() => {
      Swal.fire({
        title: '¿Sigues ahí?',
        text: 'Parece que no has interactuado por un tiempo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, sigo aquí',
        cancelButtonText: 'No, cerrar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('El usuario sigue aquí');
          this.inactivityService.resetInactivityTimer();
        } else {
          
          console.log('El usuario no está aquí');
          this.router.navigate(['/home']);
        }
      });
    });
  }
}