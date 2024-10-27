import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AddIventoryComponent } from '../add-iventory/add-iventory.component';
import { MatDialog } from '@angular/material/dialog';
import { EditIventoryComponent } from '../edit-iventory/edit-iventory.component';
import { DeleteIventoryComponent } from '../delete-iventory/delete-iventory.component';
import { ProductService } from '../../../services/product.service';
import { StoreService } from '../../../services/store.service';
import { Inventory } from '../../../interface/inventory';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { InventoryService } from '../../../services/inventory.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../interface/products';


@Component({
  selector: 'app-admin-sales',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-sales.component.html',
  styleUrl: './admin-sales.component.css'
})
export class AdminSalesComponent implements OnInit {
  inventario: Inventory[] = [];
  productos: { [id: number]: Product } = {}; 
  filteredInventorys: Inventory[] = [];
  searchTerm$ = new Subject<string>();
  stores: { [id: number]: string } = {};
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  displayedInventory: Inventory[] = [];

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private storeService: StoreService,
    private cdr: ChangeDetectorRef,
  ) {
    // Initialize search functionality
    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(term => this.search(term));
  }

  ngOnInit() {
    // Subscribe to inventory changes
    this.inventoryService.inventory$.subscribe(inventories => {
      console.log('Inventarios recibidos en el componente:', inventories);
      this.inventario = inventories.map(inv => ({
        ...inv,
        quantity: inv.quantity ?? 0 // Use nullish coalescing to handle null/undefined
      }));
      this.filteredInventorys = [...this.inventario];
      this.updatePagination();
      this.updateDisplayedInventory();
      this.cdr.detectChanges();
    });
    
    this.loadInitialData();
  }

  loadInitialData() {
    // Load all required data
    this.loadProductos();
    this.loadAlmacen();
    this.loadInventory();
  }

  loadInventory() {
    this.inventoryService.getInventories().subscribe({
      next: (data) => {
        console.log("Datos completos del inventario:", data);
        // Ensure quantity is properly mapped from the API response
        this.inventario = data.map(item => ({
          ...item,
          quantity: typeof item.quantity === 'number' ? item.quantity : 0
        }));
        this.filteredInventorys = [...this.inventario];
        this.updatePagination();
        this.updateDisplayedInventory();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading inventory:', error);
      }
    });
  }

  loadProductos(): void {
    this.productService.getProducts().subscribe(data => {
      // Modificar esta parte para guardar el objeto completo
      this.productos = data.reduce((acc, product) => {
        acc[product.id] = product; // Guardamos el producto completo, no solo el nombre
        return acc;
      }, {} as { [key: number]: Product });
      this.cdr.detectChanges();
    });
  }

  loadAlmacen(): void {
    this.storeService.getStores().subscribe(data => {
      this.stores = data.reduce((acc, store) => {
        acc[store.id] = store.name;
        return acc;
      }, {} as { [key: number]: string });
      this.cdr.detectChanges();
    });
  }

  search(term: string) {
    if (!term) {
      this.filteredInventorys = this.inventario;
    } else {
      this.filteredInventorys = this.inventario.filter(item =>
        this.productos[item.productId]?.name.toLowerCase().includes(term.toLowerCase()) ||
        this.stores[item.storeId]?.toLowerCase().includes(term.toLowerCase()) ||
        item.code.toLowerCase().includes(term.toLowerCase())
      );
    }
    this.updatePagination();
    this.updateDisplayedInventory();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredInventorys.length / this.itemsPerPage);
    // Ensure current page is valid
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }


  updateDisplayedInventory() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedInventory = this.filteredInventorys.slice(start, end);
    console.log("Datos a mostrar:", this.displayedInventory);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedInventory();
    }
  }
  getInventoryStatus(item: any): string {
    if (!item.available) {
        return 'No disponible';
    }
    
    const minStock = this.getProductMinStock(item.productId);
    
    if (item.quantity === 0) {
        return 'Sin stock';
    } else if (item.quantity > 0 && item.quantity < minStock) {
        return `Bajo stock (Min: ${minStock})`;
    } else if (item.quantity >= minStock) {
        return 'Stock suficiente';
    }
    
    return 'Estado desconocido';
}
  updateItemQuantity(item: Inventory, value: string) {
    const newQuantity = parseInt(value, 10);
    if (isNaN(newQuantity) || newQuantity < 0) {
      return;
    }

    if (item.id) {
      this.inventoryService.updateQuantity(item.id, newQuantity).subscribe({
        next: (response) => {
          const updatedItem = this.displayedInventory.find(i => i.id === item.id);
          if (updatedItem) {
            updatedItem.quantity = newQuantity;
            const mainItem = this.inventario.find(i => i.id === item.id);
            if (mainItem) {
              mainItem.quantity = newQuantity;
            }
          }
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error updating quantity:', error);
        }
      });
    }
  }

  isValidQuantity(quantity: any): boolean {
    return typeof quantity === 'number' && !isNaN(quantity);
  }
  getDisplayQuantity(item: Inventory): number {
    return this.isValidQuantity(item.quantity) ? item.quantity : 0;
  }
  openAddIventory() {
    const dialogRef = this.dialog.open(AddIventoryComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInventory(); // Reload inventory after adding
      }
    });
  }
  openEditIventory() {
    const dialogRef = this.dialog.open(EditIventoryComponent, {
      width: '400px',
    });
  }
  openDeleteIventory() {
    const dialogRef = this.dialog.open(DeleteIventoryComponent, {
      width: '400px',
    
    });
  }
  getProductName(productId: number): string {
    return this.productos[productId]?.name || 'Unknown Product';
  }


  getStoreName(storeId: number): string {
    return this.stores[storeId] || 'Unknown Store';
  }
  getProductMinStock(productId: number): number {
    return this.productos[productId]?.minStock || 0;
  }

  // Nuevo método para obtener el precio si lo necesitas
  getProductPrice(productId: number): number {
    return this.productos[productId]?.price || 0;
  }
  
}
