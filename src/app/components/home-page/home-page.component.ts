import { AuthService } from './../auth/auth.service';
import { LoginComponent } from '../login/login.component';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductHomeComponent } from '../product-home/product-home.component';
import { AboutHomeComponent } from '../about-home/about-home.component';
import { FooterHomeComponent } from '../footer-home/footer-home.component';
import { CarouselHomeComponent } from '../carrousel-home/carrousel-home.component';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ProductHomeComponent,
    AboutHomeComponent,
    FooterHomeComponent,
    CarouselHomeComponent,
    CartDialogComponent,
    OrderDialogComponent,
    CommonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'] // Cambiado a styleUrls
})
export class HomePageComponent implements OnInit {
  isLoggedIn = false; 
  user: any = {}; 
  isModalOpen = false;

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoggedIn = this.authService.isLoggedIn(); // Verifica si el usuario está autenticado
      }
    });
  }

  // Método para abrir el diálogo del carrito
  openCartDialog(): void {
    this.dialog.open(CartDialogComponent, {
      width: '400px', // Puedes ajustar el tamaño como prefieras
      height: '100vh', // Ajustar la altura del diálogo
      position: { right: '0' }, // Hacer que aparezca desde el costado derecho
      panelClass: 'cart-dialog-panel', // Clase CSS personalizada si necesitas estilos adicionales
    });
  }

  openOrderDialog(): void {
    this.dialog.open(OrderDialogComponent, {
      width: '400px', // Puedes ajustar el tamaño como prefieras
      height: '100vh', // Ajustar la altura del diálogo
      position: { right: '0' }, // Hacer que aparezca desde el costado derecho
      panelClass: 'order-dialog-panel', // Clase CSS personalizada si necesitas estilos adicionales
    });
  }

  ngOnInit(): void {
    // Aquí puedes verificar el estado de autenticación al cargar la página
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.authService.getUserData();
    }
  }
  
  goToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openModal() {
    this.user = this.authService.getUserData();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.closeModal();
    this.router.navigate(['/login']);  // Redirige al login después de cerrar sesión
  }
  
  
}
