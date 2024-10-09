import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products = [
    {
      id: 1,
      name: 'Zapatillas Deportivas',
      price: 49.99,
      image: 'url_imagen_zapatillas', // URL de la imagen del producto
    },
    {
      id: 2,
      name: 'Reloj Inteligente',
      price: 79.99,
      image: 'url_imagen_reloj', // URL de la imagen del producto
    },
    // Agrega más productos aquí
  ];
}
