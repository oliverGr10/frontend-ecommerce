import { Component, OnInit } from '@angular/core';
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
  selectedSubCategory: string | null = null; // Variable para guardar la subcategoría seleccionada
  isModalOpen = false;
  selectedProduct: any = null;
  currentImageIndex = 0;

  categories = [
    { name: 'Hogar', isOpen: false, subCategories: ['Muebles', 'Decoración', 'Cocina'] },
    { name: 'Electrónica', isOpen: false, subCategories: ['Televisores', 'Computadoras', 'Teléfonos'] },
    { name: 'Ropa', isOpen: false, subCategories: ['Camisetas', 'Pantalones', 'Zapatos'] },
  ];

  products = [
    { name: 'Producto 1', price: 19.99, image: 'https://via.placeholder.com/300x200', category: 'Hogar', subcategory: 'Muebles' },
    { name: 'Producto 2', price: 29.99, image: 'https://via.placeholder.com/300x200', category: 'Electrónica', subcategory: 'Televisores' },
    { name: 'Producto 3', price: 39.99, image: 'https://via.placeholder.com/300x200', category: 'Ropa', subcategory: 'Camisetas' },
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

  // Abrir modal con producto seleccionado
  openModal(product: any) {
    this.selectedProduct = product;
    this.currentImageIndex = 0;
    this.isModalOpen = true;
  }

  // Cerrar modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Avanzar en el carrusel
  nextImage() {
    if (this.selectedProduct) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedProduct.images.length;
    }
  }

  // Retroceder en el carrusel
  previousImage() {
    if (this.selectedProduct) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.selectedProduct.images.length) % this.selectedProduct.images.length;
    }
  }

}


