import { MatDialog, MatDialogRef } from '@angular/material/dialog';  // Import MatDialog
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { AddProductIventorySheetComponent } from '../add-product-iventory-sheet/add-product-iventory-sheet.component';
import { EditProductIventorySheetComponent } from '../edit-product-iventory-sheet/edit-product-iventory-sheet.component';
import { DeleteProductIventorySheetComponent } from '../delete-product-iventory-sheet/delete-product-iventory-sheet.component';
import { Product } from '../../../interface/products';
import { SupplierService } from '../../../services/supplier.service';
import { CategoryService } from '../../../services/category.service';
import {debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ImagenUrlComponent } from '../imagen-url/imagen-url.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-inventory',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, AddProductIventorySheetComponent, EditProductIventorySheetComponent, DeleteProductIventorySheetComponent,ImagenUrlComponent],
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.css']
})
export class AdminInventoryComponent implements OnInit {
  productos: Product[] = [];
  categories: { [id: number]: string } = {};
  filteredProducts: Product[] = []; 
  searchTerm$ = new Subject<string>();
  suppliers: { [id: number]: string } = {};
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  displayedProducts: Product[] = [];
  
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
    
  ) { } 

  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
        this.productos = this.sortProducts(products);
        this.filteredProducts = [...this.productos];
        this.calculateTotalPages();
        this.cdr.detectChanges();
    });

    this.loadCategories();
    this.loadSuppliers();
    
    this.searchTerm$.pipe(
        debounceTime(300),
        distinctUntilChanged()
    ).subscribe(term => {
        this.filterProducts(term);
    });
}

loadProducts(): void {
  this.productService.getProducts().subscribe({
      next: (data) => {
          this.ngZone.run(() => {
              this.productos = this.sortProducts(data);
              this.filteredProducts = [...this.productos];
              this.updateDisplayedProducts();
              Promise.resolve().then(() => {
                  this.cdr.detectChanges();
              });
          });
      },
  });
}
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
        this.categories = data.reduce((acc, category) => {
            acc[category.id] = category.name;
            return acc;
        }, {} as { [key: number]: string });
        this.cdr.detectChanges();
    });
}

loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(data => {
        this.suppliers = data.reduce((acc, supplier) => {
            acc[supplier.id] = supplier.name;
            return acc;
        }, {} as { [key: number]: string });
        this.cdr.detectChanges();
    });
}
  onSearch(event:any){
    const term = event.target.value.toLowerCase().trim();
    this.filterProducts(term);
  }
  filterProducts(term:string){
    console.log('Término de búsqueda:', term);
    if(!term){
      this.filteredProducts = [...this.productos];

    }else{
      this.filteredProducts = this.productos.filter(producto =>
        producto.name?.toLowerCase().includes(term) 
      );
    }
    console.log('Productos filtrados:', this.filteredProducts);
    this.calculateTotalPages();
    this.currentPage = 1;
    this.updateDisplayedProducts();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }
  private sortProducts(products: Product[]): Product[] {
    const sortedProducts = products.sort((a,b) => {
        const nameA = (a.name || '').toUpperCase();
        const nameB = (b.name || '').toLowerCase();
        return nameA.localeCompare(nameB);
    });
    return sortedProducts;
}


openAddProductSheet(): void {
  const dialogRef = this.dialog.open(AddProductIventorySheetComponent, {
      width: '400px',
      data: { product: null }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
        this.ngZone.run(() => {
            this.productService.getProducts().subscribe(products => {
                this.productos = this.sortProducts(products);
                this.filteredProducts = [...this.productos];
                Promise.resolve().then(() => {
                    this.cdr.detectChanges();
                });
            });
        });
      }
  });
}
  openEditProductSheet(product: Product): void {
    console.log('Editando producto:', product);
  }
  openDeleteProduct(product: Product) {
    const dialogRef = this.dialog.open(DeleteProductIventorySheetComponent, {
        width: '400px',
        data: product
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
            this.productService.deleteProduct(product.id).subscribe({
                next: () => {
                    // Actualizar productos y filteredProducts
                    this.productos = this.productos.filter(s => s.id !== product.id);
                    this.filteredProducts = this.filteredProducts.filter(s => s.id !== product.id); // Asegúrate de actualizar filteredProducts también

                    Swal.fire({
                        title: 'Proveedor eliminado',
                        html: `El producto <span style="color: #d32f2f; font-weight: bold;">${product.name}</span> ha sido eliminado.`,
                        icon: 'success',
                        timer: 2000, // 
                        showConfirmButton: false,
                    });
                    
                    // Actualiza la paginación
                    this.calculateTotalPages();
                    this.updateDisplayedProducts();
                },
                error: (error) => {
                    console.error('Error al eliminar el producto:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar el proveedor.',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            });
        }
    });
}


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProducts();
      console.log(`Page changed to: ${this.currentPage}`);
    }
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts.slice(start, end);
  }
  trackByProductId(index: number, product: Product): number {
    return product.id || index;
  }
  updatePageData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
}
