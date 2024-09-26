import { LoginComponent } from '../login/login.component';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductHomeComponent } from '../product-home/product-home.component';
import { AboutHomeComponent } from '../about-home/about-home.component';
import { FooterHomeComponent } from '../footer-home/footer-home.component';
import { CarouselHomeComponent } from '../carrousel-home/carrousel-home.component';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,ProductHomeComponent,AboutHomeComponent,FooterHomeComponent,CarouselHomeComponent,CartDialogComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {


  constructor(public dialog: MatDialog) {}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '350px',
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
