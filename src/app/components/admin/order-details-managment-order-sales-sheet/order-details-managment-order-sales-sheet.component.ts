import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';

@Component({
  selector: 'app-order-details-managment-order-sales-sheet',
  standalone: true,
  imports: [CommonModule,OrderDetailsManagmentOrderSalesSheetComponent],
  templateUrl: './order-details-managment-order-sales-sheet.component.html',
  styles: ``
})
export class OrderDetailsManagmentOrderSalesSheetComponent {
  @Input() orderId?: number; // Se declara como opcional
  @Output() close = new EventEmitter<void>();

  order: any; // Tipo más específico basado en tu modelo de datos
  orderDetails: any[] = []; // Tipo más específico basado en tu modelo de datos

  ngOnInit() {
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    if (this.orderId) { // Verifica si orderId está definido
      // Aquí deberías cargar los detalles de la orden usando el orderId
      this.order = {
        id: this.orderId,
        usuario_id: 1,
        fecha_orden: new Date().toISOString(),
        estado: 'confirmed',
        total: 1500
      };

      this.orderDetails = [
        { producto_id: 1, cantidad: 2, precio_unitario: 500 },
        { producto_id: 2, cantidad: 1, precio_unitario: 500 }
      ];
    }
  }
}