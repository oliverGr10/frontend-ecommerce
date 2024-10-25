import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-iventory',
  standalone: true,
  imports: [],
  templateUrl: './delete-iventory.component.html',
  styleUrl: './delete-iventory.component.css'
})
export class DeleteIventoryComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteIventoryComponent>,
  
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