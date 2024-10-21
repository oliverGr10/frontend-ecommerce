import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { Products } from '../../interface/products';
import { ModalComponent } from "../../modal/modal.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ModalComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  selectedProduct: Products | null = null; // Producto seleccionado
  isProductModalOpen = false; // Controla si el modal de productos está abierto o cerrado
  isSidebarOpen = false;
  selectedSubCategory: string | null = null;
  isLoggedIn = false;
  user: any = {};
  isModalOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  categories = [
    { name: 'Hogar', isOpen: false, subCategories: ['Muebles', 'Decoración', 'Cocina'] },
    { name: 'Electrónica', isOpen: false, subCategories: ['Televisores', 'Computadoras', 'Teléfonos'] },
    { name: 'Ropa', isOpen: false, subCategories: ['Camisetas', 'Pantalones', 'Zapatos'] },
  ];

  products: Products[] = [
    { id: 1, name: 'Producto 1', price: 19.99, image: 'https://via.placeholder.com/300x200', category: 'Hogar', subcategory: 'Muebles', description: 'Descripción del producto 1' },
    { id: 2, name: 'Producto 2', price: 29.99, image: 'https://via.placeholder.com/300x200', category: 'Electrónica', subcategory: 'Televisores', description: 'Descripción del producto 2' },
    { id: 3, name: 'Producto 3', price: 39.99, image: 'https://via.placeholder.com/300x200', category: 'Ropa', subcategory: 'Camisetas', description: 'Descripción del producto 3' },
    // otros productos...
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
    if (this.selectedSubCategory === subCategory) {
      this.selectedSubCategory = null;
      this.filteredProducts = this.products;
    } else {
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

  // Método para abrir el modal de productos
  isProductModal(product: Products) {
    this.selectedProduct = product;
    this.isProductModalOpen = true;
    console.log('Abriendo modal para el producto:', product);
  }

  closeProductModal() {
    this.isProductModalOpen = false;
  }

  // Método original que NO debe ser modificado (para autenticación u otras funciones)
  openModal() {
    this.user = this.authService.getUserData();
    this.isModalOpen = true;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.closeProductModal();
    this.router.navigate(['/login']);  // Redirige al login después de cerrar sesión
  }
  //Ciera modal de autenticación
  closeModal() {
    this.isModalOpen = false;
  }
}


