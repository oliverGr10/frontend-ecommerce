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
  isSidebarOpen = false;
  categories = [
    { name: 'Hogar', isOpen: false, subCategories: ['Muebles', 'Decoración', 'Cocina'] },
    { name: 'Electrónica', isOpen: false, subCategories: ['Televisores', 'Computadoras', 'Teléfonos'] },
    { name: 'Ropa', isOpen: false, subCategories: ['Camisetas', 'Pantalones', 'Zapatos'] },
  ];
  products = [
    { name: 'Producto 1', price: 19.99, image: 'https://via.placeholder.com/300x200' },
    { name: 'Producto 2', price: 29.99, image: 'https://via.placeholder.com/300x200' },
    { name: 'Producto 3', price: 39.99, image: 'https://via.placeholder.com/300x200' },
    { name: 'Producto 4', price: 49.99, image: 'https://via.placeholder.com/300x200' },
    { name: 'Producto 5', price: 59.99, image: 'https://via.placeholder.com/300x200' },
    { name: 'Producto 6', price: 69.99, image: 'https://via.placeholder.com/300x200' },
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleCategory(category: any) {
    category.isOpen = !category.isOpen;
  }
}
