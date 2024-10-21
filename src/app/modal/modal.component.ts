import { Component,EventEmitter, Input, Output } from '@angular/core';

import { Products } from '../interface/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  // Recibe el producto seleccionado desde el componente padre
  @Input() selectedProduct: Products | null = null;
  // Recibe el estado para saber si el modal debe estar abierto o cerrado
  @Input() isProductModalOpen: boolean = false;
  // Emite un evento al cerrar el modal
  @Output() close = new EventEmitter<void>();

  // Método para cerrar el modal
  closeProductModal(): void {
    this.close.emit(); // Emite el evento de cerrar el modal
  }
}
