import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { OrderDetailsManagmentOrderSalesSheetComponent } from "../order-details-managment-order-sales-sheet/order-details-managment-order-sales-sheet.component";

interface Order {
  id: number;
  usuario_id: number;
  fecha_orden: string;
  estado: 'draft' | 'confirmed' | 'packed' | 'shipped' | 'invoiced';
  total: number;
}

@Component({
  selector: 'app-admin-sales',
  standalone: true,
  imports: [CommonModule, OrderDetailsManagmentOrderSalesSheetComponent],
  templateUrl: './admin-sales.component.html',
  styleUrl: './admin-sales.component.css'
})
export class AdminSalesComponent {
  orders: Order[] = [];
  selectedOrderId: number | null = null;

  statusColors = {
    'draft': 'bg-gray-200 text-gray-800',
    'confirmed': 'bg-blue-200 text-blue-800',
    'packed': 'bg-yellow-200 text-yellow-800',
    'shipped': 'bg-green-200 text-green-800',
    'invoiced': 'bg-purple-200 text-purple-800'
  };

  constructor(
    // Inyecta los servicios necesarios aquí
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    // Implementar la carga de órdenes desde el servicio
    this.orders = [
      { id: 1, usuario_id: 1, fecha_orden: '2024-10-01', estado: 'draft', total: 100 },
      { id: 2, usuario_id: 2, fecha_orden: '2024-10-02', estado: 'confirmed', total: 150 },
      // ... otras órdenes
  ];
  }

  searchOrders(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    // Implementar lógica de búsqueda
  }

  viewOrderDetails(orderId: number): void {
    this.selectedOrderId = orderId;
  }

  closeOrderDetails(): void {
    this.selectedOrderId = null;
  }

  // Método para obtener el nombre del usuario (suponiendo que tienes acceso a esta información)
  getUserName(userId: number): string {
    // Implementar lógica para obtener el nombre del usuario
    return `Usuario ${userId}`;
  }
}
