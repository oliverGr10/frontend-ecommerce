import { LoginComponent } from '../login/login.component';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductHomeComponent } from '../product-home/product-home.component';
import { AboutHomeComponent } from '../about-home/about-home.component';
import { FooterHomeComponent } from '../footer-home/footer-home.component';
import { CarouselHomeComponent } from '../carrousel-home/carrousel-home.component';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,ProductHomeComponent,AboutHomeComponent,FooterHomeComponent,CarouselHomeComponent,CartDialogComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  isLoggedIn = false; // Simulación de estado de inicio de sesión

  constructor(public dialog: MatDialog) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoggedIn = true; // Cambia a true si el usuario inicia sesión
        console.log('Usuario autenticado:', this.isLoggedIn);
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

  ngOnInit(): void {
  }

}
