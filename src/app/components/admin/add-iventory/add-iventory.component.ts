import { Inventory } from './../../../interface/inventory';
import { Product } from './../../../interface/products';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Store } from '../../../interface/Store';
import { map, Observable, startWith } from 'rxjs';
import { InventoryService } from '../../../services/inventory.service';
import { ProductService } from '../../../services/product.service';
import { StoreService } from '../../../services/store.service';
import Swal from 'sweetalert2';
import { z } from 'zod';
import { inventorySchema } from '../../auth/schema/inventorySchema';

@Component({
  selector: 'app-add-iventory',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './add-iventory.component.html',
  styleUrl: './add-iventory.component.css'
})
export class AddIventoryComponent {
  @ViewChild('slideOverPanel') slideOverPanel!: ElementRef;
  
  inventoryForm!: FormGroup;
  products: Product[] = [];
  stores: Store[] = [];
  filteredProducts!: Observable<Product[]>;
  filteredStores!: Observable<Store[]>;
  isAutocompleteOpen = false;
  isFormInteracted = false;

  selectedProduct: Product | null = null;
  selectedStore: Store | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddIventoryComponent>,
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private productService: ProductService,
    private storeService: StoreService
  ) {
    this.initForm();
    this.loadData();
    this.setupFiltering();
  }

  private initForm(): void {
    this.inventoryForm = this.fb.group({
      productId: ['', [Validators.required]],
      productSearch: [''],
      storeId: ['', [Validators.required]],
      storeSearch: [''],
      code: [{ value: '', disabled: true }],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(10000)]]
    });

    this.inventoryForm.valueChanges.subscribe(() => {
      this.isFormInteracted = true;
    });

    this.inventoryForm.get('productSearch')?.valueChanges.subscribe(value => {
      if (typeof value === 'string' && this.selectedProduct && value !== this.selectedProduct.name) {
        
        if (value.trim() !== '') {
          this.selectedProduct = null;
          this.inventoryForm.patchValue({ productId: '' }, { emitEvent: false });
        }
      }
    });

    this.inventoryForm.get('storeSearch')?.valueChanges.subscribe(value => {
      if (typeof value === 'string' && this.selectedStore && value !== this.selectedStore.name) {
        
        if (value.trim() !== '') {
          this.selectedStore = null;
          this.inventoryForm.patchValue({ storeId: '' }, { emitEvent: false });
        }
      }
    });
  }

  private loadData(): void {
    this.loadProducts();
    this.loadStores();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.showErrorAlert('Error al cargar productos', 'Por favor, intente nuevamente');
      }
    });
  }

  private loadStores(): void {
    this.storeService.getStores().subscribe({
      next: (stores) => {
        this.stores = stores;
      },
      error: (error) => {
        console.error('Error loading stores:', error);
        this.showErrorAlert('Error al cargar almacenes', 'Por favor, intente nuevamente');
      }
    });
  }

  private setupFiltering(): void {
    this.filteredProducts = this.inventoryForm.get('productSearch')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const searchValue = typeof value === 'string' ? value : value?.name || '';
        return this._filterProducts(searchValue);
      })
    );

    this.filteredStores = this.inventoryForm.get('storeSearch')!.valueChanges.pipe(
      startWith(''),
      map(value => {
        const searchValue = typeof value === 'string' ? value : value?.name || '';
        return this._filterStores(searchValue);
      })
    );

    
    this.inventoryForm.get('productId')?.valueChanges.subscribe(() => this.generateCode());
    this.inventoryForm.get('storeId')?.valueChanges.subscribe(() => this.generateCode());
  }

  private _filterProducts(value: string): Product[] {
    const searchValue = value.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(searchValue)
    );
  }

  private _filterStores(value: string): Store[] {
    const searchValue = value.toLowerCase();
    return this.stores.filter(store =>
      store.name.toLowerCase().includes(searchValue)
    );
  }

  displayFn(item: any): string {
    return item && item.name ? item.name : '';
  }

  onAutocompleteOpened(): void {
    this.isAutocompleteOpen = true;
  }

  onAutocompleteClosed(): void {
    this.isAutocompleteOpen = false;
    if (this.selectedProduct) {
      this.inventoryForm.patchValue({
        productSearch: this.selectedProduct
      }, { emitEvent: false });
    }
    if (this.selectedStore) {
      this.inventoryForm.patchValue({
        storeSearch: this.selectedStore
      }, { emitEvent: false });
    }
  }

  onProductSelected(event: any): void {
    const product = event.option.value;
    this.selectedProduct = product;
    this.inventoryForm.patchValue({
      productId: product.id,
      productSearch: product
    });
    //this.showNotification('Producto seleccionado', `Has seleccionado: ${product.name}`);
  }

  onStoreSelected(event: any): void {
    const store = event.option.value;
    this.selectedStore = store;
    this.inventoryForm.patchValue({
      storeId: store.id,
      storeSearch: store
    });
    //this.showNotification('Almacén seleccionado', `Has seleccionado: ${store.name}`);
  }

  private generateCode(): void {
    const productId = this.inventoryForm.get('productId')?.value;
    const storeId = this.inventoryForm.get('storeId')?.value;

    if (productId && storeId) {
      const code = this.inventoryService.generateCode(productId, storeId);
      this.inventoryForm.patchValue({ code });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.inventoryForm.invalid) {
      this.showErrorAlert('Formulario Inválido', 'Por favor, complete todos los campos requeridos');
      return;
    }
  
    try {
      const formData = {
        productId: Number(this.inventoryForm.get('productId')?.value),
        storeId: Number(this.inventoryForm.get('storeId')?.value),
        code: this.inventoryForm.get('code')?.value,
        quantity: Number(this.inventoryForm.get('quantity')?.value),
        available: true
      };
  
      const result = await Swal.fire({
        title: '¿Confirmar registro?',
        text: '¿Está seguro de que desea registrar este inventario?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, registrar',
        cancelButtonText: 'Cancelar'
      });
  
      if (result.isConfirmed) {
        this.inventoryService.generateInventory(formData).subscribe({
          next: (response) => {
            console.log('Inventario creado:', response);
            this.showSuccessAlert('¡Éxito!', 'Inventario registrado correctamente');
            // Usar refreshInventory solo si es necesario
            this.inventoryService.refreshInventory();
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Error creating inventory:', error);
            this.showErrorAlert('Error', 'No se pudo registrar el inventario');
          }
        });
      }
    } catch (error) {
      this.showErrorAlert('Error', 'Ha ocurrido un error al procesar el formulario');
    }
  }


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.isAutocompleteOpen && 
        this.slideOverPanel && 
        !this.slideOverPanel.nativeElement.contains(event.target as Node) &&
        (!this.isFormInteracted || this.inventoryForm.valid)) {
      this.cerrarHoja(event);
    }
  }

  cerrarHoja(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.isFormInteracted && !this.inventoryForm.valid) {
      Swal.fire({
        title: '¿Está seguro?',
        text: 'Hay cambios sin guardar. ¿Desea cerrar de todos modos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar',
        cancelButtonText: 'No, continuar editando'
      }).then((result) => {
        if (result.isConfirmed) {
          this.dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

  private showSuccessAlert(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    });
  }

  private showErrorAlert(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  private showNotification(title: string, text: string): void {
    Swal.fire({
      title,
      text,
      icon: 'info',
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timer: 3000
    });
  }
}