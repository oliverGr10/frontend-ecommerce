import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-supplier-sheet',
  standalone: true,
  imports: [],
  templateUrl: './delete-supplier-sheet.component.html',
  styles: ``
})
export class DeleteSupplierSheetComponent {

  constructor(public dialogRef: MatDialogRef<DeleteSupplierSheetComponent>) {}

  // Método para cerrar el modal y confirmar la eliminación
  confirmDelete(): void {
    this.dialogRef.close(true);  // Devuelve 'true' para confirmar la eliminación
  }

  // Método para cerrar el modal sin confirmar
  cancel(): void {
    this.dialogRef.close(false); // Devuelve 'false' para cancelar la eliminación
  }
}