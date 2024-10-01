import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-history-supplier-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-supplier-sheet.component.html',
  styles: ``
})
export class HistorySupplierSheetComponent {
  constructor(public dialogRef: MatDialogRef<HistorySupplierSheetComponent>) {}
  @Input() proveedor: any;
  @Output() close = new EventEmitter<void>();

  historialPedidos = [
    {
      id: 1,
      fecha: new Date('2023-09-15'),
      estado: 'Completado',
      total: 1500,
      productos: [
        { nombre: 'Producto A', cantidad: 10, precio: 50 },
        { nombre: 'Producto B', cantidad: 20, precio: 25 },
      ]
    },
    {
      id: 2,
      fecha: new Date('2023-09-20'),
      estado: 'En proceso',
      total: 2000,
      productos: [
        { nombre: 'Producto C', cantidad: 15, precio: 100 },
        { nombre: 'Producto D', cantidad: 5, precio: 100 },
      ]
    },
    // Agrega más pedidos según sea necesario
  ];
  cancel(): void {
    this.dialogRef.close(false); // Devuelve 'false' para cancelar la eliminación
  }
}