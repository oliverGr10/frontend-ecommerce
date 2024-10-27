import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../../interface/products';

interface InventoryStatus {
  status: InventoryStatusType;
  count: number;
}

type InventoryStatusType = 'DISPONIBLE' | 'BAJO_STOCK' | 'AGOTADO';
@Component({
  selector: 'app-inventory-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-status.component.html',
  styleUrls: ['./inventory-status.component.css']
})
export class InventoryStatusComponent implements OnInit, OnChanges {
  @Input() product?: Product;
  private readonly LOW_STOCK_THRESHOLD = 9; 
  private readonly MIN_STOCK_THRESHOLD = 1;
  
  inventoryStatuses: InventoryStatus[] = [];

  ngOnInit() {
    this.updateInventoryStatus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      console.log('Product changed:', this.product);
      this.updateInventoryStatus();
    }
  }

  private updateInventoryStatus(): void {
    this.inventoryStatuses = this.getInventoryStatuses();
  }

  private calculateTotalQuantity(): number {
    console.log('Calculating total quantity');
    console.log('Product inventory:', this.product?.inventory);
    
    if (!this.product?.inventory?.length) {
      console.log('No inventory found');
      return 0;
    }
    
    const availableCount = this.product.inventory.filter(item => item.available).length;
    console.log('Available items:', availableCount);
    return availableCount;
  }

  private getStatus(quantity: number): InventoryStatusType {
    if (quantity < this.MIN_STOCK_THRESHOLD) {
      return 'AGOTADO';
    } else if (quantity <= this.LOW_STOCK_THRESHOLD) {
      return 'BAJO_STOCK';
    } else {
      return 'DISPONIBLE';
    }
  }

  private getInventoryStatuses(): InventoryStatus[] {
    const totalQuantity = this.calculateTotalQuantity();
    const status = this.getStatus(totalQuantity);

    return [{
      status,
      count: totalQuantity
    }];
  }

  getStatusClasses(status: InventoryStatusType): string {
    return this.statusConfig[status]?.classes ?? 'bg-gray-100 text-gray-800';
  }

  getStatusLabel(status: InventoryStatusType): string {
    return this.statusConfig[status]?.label ?? status;
  }

  getStatusIcon(status: InventoryStatusType): string {
    return this.statusConfig[status]?.icon ?? '';
  }

  private statusConfig: Record<InventoryStatusType, { label: string; classes: string; icon: string }> = {
    DISPONIBLE: {
      label: 'Disponible',
      classes: 'bg-green-100 text-green-800',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>`
    },
    BAJO_STOCK: {
      label: 'Bajo Stock',
      classes: 'bg-yellow-100 text-yellow-800',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>`
    },
    AGOTADO: {
      label: 'Agotado',
      classes: 'bg-red-100 text-red-800',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>`
    }
  };
}