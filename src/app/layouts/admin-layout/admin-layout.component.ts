import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { AdminSidebarComponent } from '../../components/admin/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from '../../components/admin/admin-header/admin-header.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    AdminHeaderComponent,
    RouterModule // Agrega RouterModule aquí
  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export  class AdminLayoutComponent {}
