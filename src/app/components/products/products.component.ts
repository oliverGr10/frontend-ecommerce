import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductListComponent, RouterLink, RouterLinkActive],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  isSidebarOpen = false;
  selectedSubCategory: string | null = null; // Variable para guardar la subcategoría seleccionada
  isLoggedIn = false;
  user: any = {};
  isModalOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

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

  filteredProducts = this.products; // Lista de productos filtrados

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleCategory(category: any) {
    category.isOpen = !category.isOpen;
  }

  filterBySubCategory(subCategory: string) {
    // Si la subcategoría ya está seleccionada, mostramos todos los productos
    if (this.selectedSubCategory === subCategory) {
      this.selectedSubCategory = null;
      this.filteredProducts = this.products;
    } else {
      // Si es una nueva subcategoría, filtramos los productos
      this.selectedSubCategory = subCategory;
      this.filteredProducts = this.products.filter(
        product => product.subcategory === subCategory
      );
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.authService.getUserData();
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


