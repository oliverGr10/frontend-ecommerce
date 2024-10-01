import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product-iventory-sheet',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-product-iventory-sheet.component.html',
  styles: ``
})
export class EditProductIventorySheetComponent {
  
  // Declarar el producto para vincularlo a los inputs en el template
  product = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria_id: '',
    proveedor_id: '',
    sku: '',
    cantidad: 0,
    ubicacion: '',
    nivel_minimo: 0,
    imagen_url: ''
  };

  constructor(public dialogRef: MatDialogRef<EditProductIventorySheetComponent>) {}

  cerrarHoja(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.dialogRef.close();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
    }
  }

  submitEditProduct(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Formulario enviado:', this.product);
    this.dialogRef.close();
  }
}