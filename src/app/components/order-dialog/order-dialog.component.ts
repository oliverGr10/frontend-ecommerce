import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
}

@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent {
  // Lista de órdenes simulada
  userOrders: Order[] = [
    { id: 12345, date: '2024-10-15', total: 150.00, status: 'Completada' },
    { id: 67890, date: '2024-10-10', total: 80.00, status: 'En proceso' }
  ];

  constructor(private dialogRef: MatDialogRef<OrderDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  viewOrderDetails(order: Order): void {
    console.log('Ver detalles de la orden:', order);
  }
}
