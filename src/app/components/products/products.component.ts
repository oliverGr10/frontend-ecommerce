import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterLink, RouterLinkActive],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  showCategories = false;

  products = [
    {
      id: 1,
      name: 'Zapatillas Deportivas',
      price: 49.99,
      image: 'url_imagen_zapatillas'
    },
    {
      id: 2,
      name: 'Reloj Inteligente',
      price: 79.99,
      image: 'url_imagen_reloj'
    }
    //más productos
  ];

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }
}
