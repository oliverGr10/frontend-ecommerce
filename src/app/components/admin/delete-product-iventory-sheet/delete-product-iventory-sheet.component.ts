import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../interface/products';

@Component({
  selector: 'app-delete-product-iventory-sheet',
  standalone: true,
  imports: [],
  templateUrl: './delete-product-iventory-sheet.component.html',
  styles: ``
})
export class DeleteProductIventorySheetComponent {

  constructor(public dialogRef: MatDialogRef<DeleteProductIventorySheetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  // Método para cerrar el modal y confirmar la eliminación
  confirmDelete(): void {
    this.dialogRef.close(true);  // Devuelve 'true' para confirmar la eliminación
  }

  // Método para cerrar el modal sin confirmar
  cancel(): void {
    this.dialogRef.close(false); // Devuelve 'false' para cancelar la eliminación
  }
}
