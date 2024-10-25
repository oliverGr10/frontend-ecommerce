import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

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

  products = [
    { name: 'Muebles de Comedor', price: 19.99, image: 'https://images.unsplash.com/photo-1704040686446-428673c1c887?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Hogar', subcategory: 'Muebles' },
    { name: 'Laptop', price: 29.99, image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Electrónica', subcategory: 'Televisores' },
    { name: 'Camiseta ', price: 39.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'Ropa', subcategory: 'Camisetas' },
    
  ];

  filteredProducts = this.products; 

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
      this.user = this.authService.getUserRole();
    }
  }

  openModal() {
    this.user = this.authService.getUserRole();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.closeModal();
    this.router.navigate(['/login']);
  }
}


